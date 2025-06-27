const { Cart, Product } = require('../models');

class CartController {
  // CREATE - POST /api/cart
  static async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.userId; // From JWT token
      
      if (!productId || !quantity) {
        return res.status(400).json({ 
          message: 'Product ID and quantity are required' 
        });
      }

      // Verify product exists
      const product = Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Validate quantity
      if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than 0' });
      }

      const cartItem = Cart.create({ productId, quantity }, userId);
      
      res.status(201).json({
        message: 'Item added to cart successfully',
        cartItem: {
          ...cartItem,
          product: product
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // READ - GET /api/cart (bonus functionality)
  static async getCart(req, res) {
    try {
      const userId = req.user.userId; // From JWT token
      const cartItems = Cart.findByUserId(userId);
      
      // Enrich cart items with product details
      const enrichedCart = cartItems.map(item => {
        const product = Product.findById(item.productId);
        return {
          ...item,
          product: product || null
        };
      });

      res.status(200).json({
        message: 'Cart retrieved successfully',
        count: enrichedCart.length,
        cart: enrichedCart
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = CartController; 