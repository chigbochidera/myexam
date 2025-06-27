const jwt = require('jsonwebtoken');
const { User } = require('../models');

// In-memory storage for access tokens (in production, use Redis or database)
let accessTokens = new Set();

class AuthController {
  // LOGIN - POST /api/auth/login
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email and password are required' 
        });
      }

      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await User.verifyPassword(user, password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          name: user.name 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Store token in memory (copies)
      accessTokens.add(token);

      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // LOGOUT - POST /api/auth/logout
  static async logout(req, res) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (token) {
        // Remove token from memory (copies)
        accessTokens.delete(token);
      }

      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // REGISTER - POST /api/auth/register
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ 
          message: 'Name, email, and password are required' 
        });
      }

      const user = await User.create({ name, email, password });
      
      // Generate JWT token for auto-login after registration
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email,
          name: user.name 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Store token in memory (copies)
      accessTokens.add(token);

      res.status(201).json({
        message: 'User registered and logged in successfully',
        token,
        user
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Check if token is valid (helper method)
  static isTokenValid(token) {
    return accessTokens.has(token);
  }
}

module.exports = AuthController; 