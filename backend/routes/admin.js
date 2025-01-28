const express = require('express');
const Review = require('../models/review');
const User = require('../models/user');
const { verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Middleware для проверки роли администратора
router.use(verifyAdmin);

// Получение всех пользователей
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Получение всех отзывов
router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Получение пользователя по ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Создание нового пользователя
router.post('/users', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const newUser = new User({ username, password, role });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Обновление пользователя
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Удаление пользователя
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Получение отзыва по ID
router.get('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('user', 'username');
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Создание нового отзыва
router.post('/reviews', async (req, res) => {
    const { cityOrCountry, rating, description } = req.body;
    try {
        const newReview = await Review.create({
            user: req.user.id, // администратор создаёт отзыв
            cityOrCountry,
            rating,
            description,
        });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Обновление отзыва
router.put('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Удаление отзыва
router.delete('/reviews/:id', async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ error: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
