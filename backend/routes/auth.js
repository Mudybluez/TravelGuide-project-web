const express = require('express');
const { register, login, getCurrentUser, sendCode, verifyCode, refreshToken } = require('../controllers/authController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/me', verifyToken, getCurrentUser);
router.post('/send-code', sendCode);
router.post('/verify-code', verifyCode);

module.exports = router;