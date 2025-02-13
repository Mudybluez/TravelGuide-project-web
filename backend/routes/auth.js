const express = require('express');
const { register, login, getCurrentUser, sendCode, verifyCode } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Регистрация
router.post('/register', register);

// Логин
router.post('/login', login);

// Получение текущего пользователя
router.get('/me', verifyToken, getCurrentUser);

// Отправка кода на почту
router.post('/send-code', sendCode);

// Верификация кода
router.post('/verify-code', verifyCode);

module.exports = router;