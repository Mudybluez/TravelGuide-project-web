const User = require('../models/user');
const bcrypt = require('bcryptjs');

// Получить список всех пользователей
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Создать нового пользователя
const createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Обновить пользователя
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

// Удалить пользователя
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, password } = req.body;
    const updateData = {};

    if (username) updateData.username = String(username);
    if (password) updateData.password = String(await bcrypt.hash(password, 10));
    console.log("Changing user data to", updateData);
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');
    console.log("Updated user:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message, user: req.user });
  }
};

module.exports = { updateProfile, getAllUsers, createUser, updateUser, deleteUser, getProfile }