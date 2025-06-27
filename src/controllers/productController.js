const { Product } = require('../models');

class ProductController {
  // CREATE - POST /api/products
  static async createProduct(req, res) {
    try {
      const { name, description, price, category } = req.body;
      
      if (!name || !description || !price || !category) {
        return res.status(400).json({ 
          message: 'Name, description, price, and category are required' 
        });
      }

      const product = Product.create({ name, description, price, category });
      res.status(201).json({
        message: 'Product created successfully',
        product
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // READ - GET /api/products (bonus functionality)
  static async getAllProducts(req, res) {
    try {
      const products = Product.findAll();
      res.status(200).json({
        message: 'Products retrieved successfully',
        count: products.length,
        products
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // READ - GET /api/products/:id (bonus functionality)
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = Product.findById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({
        message: 'Product retrieved successfully',
        product
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProductController; 