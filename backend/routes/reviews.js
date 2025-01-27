const express = require('express');
const Review = require('../models/review');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Middleware для проверки токена
router.use(verifyToken);

// Получение всех отзывов (доступно всем пользователям)
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find().populate('user', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Создание нового отзыва
router.post('/', async (req, res) => {
    const { cityOrCountry, rating, description } = req.body;
    try {
        const newReview = await Review.create({
            user: req.user.id,
            cityOrCountry,
            rating,
            description,
        });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: `Error: ${error.message}` });
    }
});

// Обновление своего отзыва
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cityOrCountry, rating, description } = req.body;
    try {
        const review = await Review.findOne({ _id: id, user: req.user.id });
        if (!review) return res.status(403).json({ error: 'Unauthorized to update this review' });

        review.cityOrCountry = cityOrCountry;
        review.rating = rating;
        review.description = description;
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Удаление своего отзыва
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findOneAndDelete({ _id: id, user: req.user.id });
        if (!review) return res.status(403).json({ error: 'Unauthorized to delete this review' });

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
