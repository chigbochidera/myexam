const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

// CREATE - POST /api/users
router.post('/', UserController.createUser);

// READ - GET /api/users
router.get('/', UserController.getAllUsers);

// READ - GET /api/users/:id
router.get('/:id', UserController.getUserById);

// UPDATE - PUT /api/users/:id
router.put('/:id', UserController.updateUser);

// DELETE - DELETE /api/users/:id
router.delete('/:id', UserController.deleteUser);

module.exports = router; 