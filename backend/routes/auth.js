const express = require('express');
const { register, login, getCurrentUser, sendCode, verifyCode, refreshToken } = require('../controllers/authController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Регистрация
router.post('/register', register);

// Логин
router.post('/login', login);

// Обновление токена
router.post('/refresh-token', refreshToken);

// Получение текущего пользователя
router.get('/me', verifyToken, getCurrentUser);

// Отправка кода на почту
router.post('/send-code', sendCode);

// Верификация кода
router.post('/verify-code', verifyCode);

// Пример запроса с токеном
const accessToken = localStorage.getItem('accessToken');
const response = await fetch(`${apiUrl}/api/some-protected-route`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    }
});

module.exports = router;