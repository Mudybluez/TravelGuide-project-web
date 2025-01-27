const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Загружаем переменные окружения из .env

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
      console.error('Stack trace:', err.stack);
      process.exit(1); // Exit the process with failure
    });
};

// Экспортируем функцию
module.exports = connectDB;
