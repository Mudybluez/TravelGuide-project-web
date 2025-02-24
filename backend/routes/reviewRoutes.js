const express = require('express');
const { getAllReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllReviews);
router.post('/', verifyToken, createReview);
router.put('/:id', verifyToken, updateReview);
router.delete('/:id', verifyToken, deleteReview);

module.exports = router;
