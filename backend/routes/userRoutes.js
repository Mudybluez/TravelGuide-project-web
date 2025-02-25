const express = require('express');
const { getAllUsers, createUser, updateUser, deleteUser, getProfile, updateProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

// Profile routes
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);

module.exports = router;