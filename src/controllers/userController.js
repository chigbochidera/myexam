const { User } = require('../models');

class UserController {
  // CREATE - POST /api/users
  static async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ 
          message: 'Name, email, and password are required' 
        });
      }

      const user = await User.create({ name, email, password });
      res.status(201).json({
        message: 'User created successfully',
        user
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // READ - GET /api/users
  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json({
        message: 'Users retrieved successfully',
        count: users.length,
        users
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // READ - GET /api/users/:id
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
        message: 'User retrieved successfully',
        user
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // UPDATE - PUT /api/users/:id
  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const user = await User.update(id, updateData);
      res.status(200).json({
        message: 'User updated successfully',
        user
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // DELETE - DELETE /api/users/:id
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.delete(id);
      res.status(200).json({
        message: 'User deleted successfully',
        user
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController; 