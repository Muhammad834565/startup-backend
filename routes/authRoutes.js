const express = require('express');
const router = express.Router();
const { register, login, verifyToken } = require('../controllers/authController');

// Routes for registration and login
router.post('/register', register);
router.post('/login', login);

// Route for verifying token
router.get('/verify', verifyToken);

module.exports = router;
