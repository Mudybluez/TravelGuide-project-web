const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

// Настройка nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Регистрация
router.post('/register', async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, email, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Логин
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Получение текущего пользователя
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Отправка кода на почту
router.post('/send-code', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const code = Math.floor(100000 + Math.random() * 900000).toString(); // Генерация 6-значного кода
        user.code = code;
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your verification code',
            text: `Your verification code is ${code}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            } else {
                res.status(200).json({ message: 'Code sent to email' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Проверка кода
router.post('/verify-code', async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email, code });
        if (!user) return res.status(400).json({ error: 'Invalid code' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;