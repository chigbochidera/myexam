const { v4: uuidv4 } = require('uuid');

// In-memory storage for carts
let carts = [];

class Cart {
  static create(cartData, userId) {
    const { productId, quantity } = cartData;
    
    const cartItem = {
      id: uuidv4(),
      userId,
      productId,
      quantity: parseInt(quantity),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    carts.push(cartItem);
    return cartItem;
  }

  static findByUserId(userId) {
    return carts.filter(cart => cart.userId === userId);
  }

  static findById(id) {
    return carts.find(cart => cart.id === id);
  }
}

module.exports = Cart; 