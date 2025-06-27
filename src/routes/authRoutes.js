const express = require('express');
const { AuthController } = require('../controllers');

const router = express.Router();

// REGISTER - POST /api/auth/register
router.post('/register', AuthController.register);

// LOGIN - POST /api/auth/login
router.post('/login', AuthController.login);

// LOGOUT - POST /api/auth/logout
router.post('/logout', AuthController.logout);

module.exports = router; 