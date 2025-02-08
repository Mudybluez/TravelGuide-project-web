const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'guest'], default: 'guest' },
    code: { type: String },
    sessionToken: { type: String } // Добавлено поле для хранения токена сессии
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
