const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

console.log(JWT_SECRET);

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    console.log(token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
        console.log(decoded);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ error: 'Invalid session' });
        }

        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        console.error('Error during token verification:', error);
        res.status(400).json({ error: 'Invalid token', errorMessage: error.message, errorObj: error });
    }
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access only' });
        }
        next();
    });
};

module.exports = { verifyToken, verifyAdmin };
