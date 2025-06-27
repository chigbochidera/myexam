const express = require('express');
const { ProductController } = require('../controllers');

const router = express.Router();

// CREATE - POST /api/products
router.post('/', ProductController.createProduct);

// READ - GET /api/products (bonus functionality)
router.get('/', ProductController.getAllProducts);

// READ - GET /api/products/:id (bonus functionality)
router.get('/:id', ProductController.getProductById);

module.exports = router; 