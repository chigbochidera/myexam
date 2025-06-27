const express = require('express');
const { CartController } = require('../controllers');
const { authenticateToken } = require('../middleware');

const router = express.Router();

// CREATE - POST /api/cart (protected)
router.post('/', authenticateToken, CartController.addToCart);

// READ - GET /api/cart (bonus functionality, protected)
router.get('/', authenticateToken, CartController.getCart);

module.exports = router; 