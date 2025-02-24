const express = require('express');
const connectDB = require('./database/mongo_connection');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Route for root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/homepage.html'));
});

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;"
  );
  next();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});