# MyExam API

A complete REST API with User, Product, Authentication, and Cart functionalities built with Node.js and Express.

## Features

- ✅ **User API** - Full CRUD operations
- ✅ **Product API** - POST functionality (with bonus GET operations)
- ✅ **Authentication API** - Login, Register, Logout with JWT tokens
- ✅ **Cart API** - POST functionality (protected routes for logged-in users)
- ✅ **Barrel File Strategy** - Organized imports/exports
- ✅ **JWT Token Storage** - Access tokens stored in memory (copies)

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## Installation

1. Clone the repository:
https://github.com/chigbochidera/myexam.git
cd myexam
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Copy config.env.example to config.env and update values
cp config.env.example config.env
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /health` - Check if API is running

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users (CRUD)
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `POST /api/products` - Create a new product
- `GET /api/products` - Get all products (bonus)
- `GET /api/products/:id` - Get product by ID (bonus)

### Cart (Protected Routes)
- `POST /api/cart` - Add item to cart (requires authentication)
- `GET /api/cart` - Get user's cart (requires authentication)

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Request Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "category": "Electronics"
  }'
```

### Add to Cart (Protected)
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "productId": "product-uuid",
    "quantity": 2
  }'
```

## Project Structure

```
src/
├── controllers/          # Business logic
│   ├── index.js         # Barrel file
│   ├── userController.js
│   ├── productController.js
│   ├── authController.js
│   └── cartController.js
├── middleware/           # Custom middleware
│   ├── index.js         # Barrel file
│   └── auth.js          # Authentication middleware
├── models/              # Data models
│   ├── index.js         # Barrel file
│   ├── user.js
│   ├── product.js
│   └── cart.js
├── routes/              # API routes
│   ├── index.js         # Barrel file
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── authRoutes.js
│   └── cartRoutes.js
└── index.js             # Main application file
```

## Barrel File Strategy

The project implements barrel file strategy for clean imports:
- `src/controllers/index.js` - Exports all controllers
- `src/middleware/index.js` - Exports all middleware
- `src/models/index.js` - Exports all models
- `src/routes/index.js` - Exports all routes

This allows for clean imports like:
```javascript
const { UserController } = require('../controllers');
const { authenticateToken } = require('../middleware');
```

## Environment Variables

Create a `config.env` file with:
```
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
```

## Testing the API

1. Start the server: `npm run dev`
2. Test health endpoint: `GET http://localhost:3000/health`
3. Register a user: `POST http://localhost:3000/api/auth/register`
4. Login to get token: `POST http://localhost:3000/api/auth/login`
5. Create a product: `POST http://localhost:3000/api/products`
6. Add to cart (with token): `POST http://localhost:3000/api/cart`

## Deployment

The API is ready for deployment to platforms like:
- Heroku
- Vercel
- Railway
- DigitalOcean
- AWS

Make sure to update environment variables for production.