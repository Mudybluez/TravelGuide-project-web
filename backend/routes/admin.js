const express = require('express');
const Review = require('../models/review');
const { verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Middleware для проверки роли администратора
router.use(verifyAdmin);

// Создание нового отзыва
router.post('/', async (req, res) => {
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

// Обновление любого отзыва
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { cityOrCountry, rating, description } = req.body;
    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ error: 'Review not found' });

        review.cityOrCountry = cityOrCountry;
        review.rating = rating;
        review.description = description;
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Удаление любого отзыва
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) return res.status(404).json({ error: 'Review not found' });

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
