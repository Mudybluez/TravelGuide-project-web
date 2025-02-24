const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { verifyToken } = require('../middleware/auth');

// Настройка nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Регистрация
exports.register = async (req, res) => {
    const { username, password, email, role } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // Генерация 6-значного кода
        const newUser = await User.create({ username, password: hashedPassword, email, role, code });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your verification code',
            text: `Your verification code is ${code}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(201).json({ message: 'User registered. Verification code sent to email.' });
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(400).json({ error: error.message });
    }
};

// Логин
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        user.sessionToken = refreshToken;
        await user.save();

        res.json({ accessToken, refreshToken, role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(400).json({ error: error.message });
    }
};

// Обновление токена
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.sessionToken !== refreshToken) {
            return res.status(401).json({ error: 'Invalid session' });
        }

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken });
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Получение текущего пользователя
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Отправка кода на почту
exports.sendCode = async (req, res) => {
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
                console.error('Error sending email:', error);
                return res.status(500).json({ error: error.message });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Code sent to email' });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Верификация кода
exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User.findOne({ email, code });
        if (!user) return res.status(400).json({ error: 'Invalid code' });

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        user.sessionToken = refreshToken;
        user.code = null; // Очистка кода после успешной верификации
        await user.save();

        res.json({ accessToken, refreshToken, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};