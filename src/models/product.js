const { v4: uuidv4 } = require('uuid');

// In-memory storage for products
let products = [];

class Product {
  static create(productData) {
    const { name, description, price, category } = productData;
    
    const product = {
      id: uuidv4(),
      name,
      description,
      price: parseFloat(price),
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    products.push(product);
    return product;
  }

  static findAll() {
    return products;
  }

  static findById(id) {
    return products.find(product => product.id === id);
  }
}

module.exports = Product; 