const Review = require('../models/review');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Получение всех отзывов с пагинацией
exports.getAllReviews = async (req, res) => {
    const { page = 1, limit = 6 } = req.query;
    try {
        const reviews = await Review.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Review.countDocuments();
        res.json({
            reviews,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Создание нового отзыва
exports.createReview = async (req, res) => {
    const { username, stars, reviewText } = req.body;
    try {
        const newReview = new Review({ username, stars, reviewText });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Обновление отзыва
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { username, stars, reviewText } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(id, { username, stars, reviewText }, { new: true });
        res.status(200).json(updatedReview);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Удаление отзыва
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        await Review.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
