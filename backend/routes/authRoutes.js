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