const express = require('express');
const connectDB = require('./database/mongo_connection');
const userRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const reviewRoutes = require('./routes/reviews');
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
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);
app.use(
    cors({
      origin: 'http://127.0.0.1:5500',
    })
  );


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
