const request = require('supertest');
const app = require('../app'); // Импортируем Express-приложение
const User = require('../models/user');
const jwt = require('jsonwebtoken');
jest.setTimeout(15000);
jest.mock('../models/user'); // Мокаем модель User

describe('Auth Controller Tests', () => {
    let server;

    beforeAll(() => {
        server = app.listen(5001); // Запускаем сервер для тестов
    });

    afterAll(async () => {
        await server.close(); // Останавливаем сервер после тестов
    });

    afterEach(() => {
        jest.clearAllMocks(); // Очищаем моки после каждого теста
    });

    test('Should register a new user', async () => {
        User.findOne.mockResolvedValue(null); // Пользователь не найден
        User.create.mockResolvedValue({ username: 'testuser', email: 'test@mail.com', role: 'guest' });

        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'test@mail.com',
            password: 'password123',
            role: 'guest'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered. Verification code sent to email.');
    });

    test('Should not register an existing user', async () => {
        User.findOne.mockResolvedValue({ username: 'testuser', email: 'test@mail.com' });

        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            email: 'test@mail.com',
            password: 'password123',
            role: 'guest'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Username or email already exists');
    });

    test('Should login a user with correct credentials', async () => {
        const mockUser = {
            _id: '12345',
            email: 'test@mail.com',
            password: '$2a$10$hashedpassword',
            role: 'guest',
            save: jest.fn().mockResolvedValue(undefined) // Добавляем мок save()
        };
    
        User.findOne.mockResolvedValue(mockUser);
        jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(true);
        jest.spyOn(jwt, 'sign').mockReturnValue('mockedAccessToken');
    
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: 'password123'
        });
    
        expect(res.statusCode).toBe(200);
        expect(res.body.accessToken).toBe('mockedAccessToken');
    });
    

    test('Should not login with incorrect password', async () => {
        const mockUser = { _id: '12345', email: 'test@mail.com', password: '$2a$10$hashedpassword', role: 'guest' };

        User.findOne.mockResolvedValue(mockUser);
        jest.spyOn(require('bcryptjs'), 'compare').mockResolvedValue(false);

        const res = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: 'wrongpassword'
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('Invalid credentials');
    });
});
