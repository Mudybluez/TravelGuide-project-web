const express = require('express');
const { getAllReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
