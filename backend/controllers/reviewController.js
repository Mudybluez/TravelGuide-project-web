const Review = require('../models/review');

// Получить список всех отзывов
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать новый отзыв
exports.createReview = async (req, res) => {
  try {
    const { user, cityOrCountry, rating, description } = req.body;
    const newReview = new Review({ user, cityOrCountry, rating, description });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Обновить отзыв
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Удалить отзыв
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
