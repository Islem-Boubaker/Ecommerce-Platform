# 🛍️ E-Commerce Platform

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This modern web application features a customer-facing storefront and a comprehensive admin dashboard for managing products, orders, and customers.

![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38B2AC?logo=tailwind-css)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)
-

## ✨ Features

### Customer Features

- 🏠 **Home Page**: Browse featured products and new arrivals
- 🔍 **Product Catalog**: Filter products by category, size, color, price, and style
- 📦 **Product Details**: View detailed product information, images, ratings, and reviews
- 🛒 **Shopping Cart**: Add, update, and remove items from cart
- 💬 **Reviews & Comments**: Leave comments and ratings on products
- 👤 **User Authentication**: Secure registration and login system
- 📱 **Responsive Design**: Mobile-first design that works on all devices

### Admin Features

- 📊 **Dashboard**: Overview of orders, revenue, products, and customers with charts
- 📦 **Product Management**: Create, update, delete, and manage product inventory
- 📋 **Order Management**: View and update order status (pending, processing, shipped, delivered, cancelled)
- 👥 **Customer Management**: View and manage customer accounts
- 📈 **Analytics**: Track sales and revenue with visual charts (Recharts)
- 🖼️ **Image Upload**: Multi-image upload for products using Multer

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **React Router DOM 7.9.1** - Client-side routing
- **Redux Toolkit 2.9.0** - State management
- **Redux Persist 6.0.0** - Persist Redux store
- **Axios 1.12.2** - HTTP client
- **TailwindCSS 4.1.13** - Utility-first CSS framework
- **Vite 7.1.4** - Build tool and dev server
- **Recharts 3.3.0** - Charts and data visualization
- **Lucide React 0.542.0** - Icon library
- **Flowbite React 0.12.9** - UI components
- **Material-UI Icons 7.3.2** - Icon components
- **Motion 12.23.12** - Animation library
- **Moment.js 2.30.1** - Date manipulation

### Backend

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.18.1** - MongoDB ODM
- **JWT (jsonwebtoken 9.0.2)** - Authentication
- **bcryptjs 3.0.2** - Password hashing
- **Multer 2.0.2** - File upload middleware
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.2** - Environment variables
- **Nodemon 3.1.10** - Development auto-restart

## 📁 Project Structure

```
Ecommerce-Platform/
├── client/                    # Frontend React application
│   ├── public/               # Static files
│   ├── src/
│   │   ├── Components/       # React components
│   │   │   ├── Admin/       # Admin dashboard components
│   │   │   ├── Home/        # Home page components
│   │   │   ├── Product/     # Product-related components
│   │   │   └── UI/          # Reusable UI components
│   │   ├── Hooks/           # Custom React hooks
│   │   ├── Layouts/         # Layout components
│   │   ├── Pages/           # Page components
│   │   │   └── Admin/       # Admin pages
│   │   ├── redux/           # Redux store and slices
│   │   ├── routes/          # Route configurations
│   │   └── services/        # API services
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Backend Node.js application
│   ├── config/              # Configuration files
│   │   └── db.js           # MongoDB connection
│   ├── controllers/         # Route controllers
│   │   ├── Comment.controllers.js
│   │   ├── Orders.controller.js
│   │   ├── product.controller.js
│   │   └── user.controller.js
│   ├── middleware/          # Custom middleware
│   │   ├── adminMiddleware.js
│   │   └── authMiddleware.js
│   ├── models/              # Mongoose models
│   │   ├── Comment.model.js
│   │   ├── Orders.model.js
│   │   ├── Product.model.js
│   │   └── User.model.js
│   ├── routes/              # API routes
│   │   ├── admin.route.js
│   │   ├── auth.routes.js
│   │   ├── order.route.js
│   │   └── user.route.js
│   ├── uploads/             # Uploaded product images
│   ├── package.json
│   └── server.js            # Entry point
│
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Islem-Boubaker/Ecommerce-Platform.git
cd Ecommerce-Platform
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## 🔐 Environment Variables

### Backend (.env file in `server/` directory)

Create a `.env` file in the `server` directory with the following variables:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/ecommerce
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key_here

# Server Port
PORT=5000
```

### Frontend (.env file in `client/` directory)

Create a `.env` file in the `client` directory with the following variables:

```env
# API Base URL
VITE_API_URL=http://localhost:5000

# Base Path (optional)
VITE_BASE_PATH=/
```

## 🏃 Running the Application

### Option 1: Run Backend and Frontend Separately

#### Start the Backend Server

```bash
cd server
npm start
```

The backend server will run on `http://localhost:5000`

#### Start the Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Option 2: Run Both Concurrently

From the `server` directory:

```bash
cd server
npm run dev:all
```

This will start both the backend and frontend servers simultaneously.

## 🌐 API Endpoints

### Authentication Routes (`/auth`)

- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### User Routes (`/user`)

- `GET /user/getproduct` - Get all products
- `GET /user/getproduct/:id` - Get product by ID
- `GET /user/getproductbycategory/:category` - Get products by category

### Comment Routes

- `POST /comments` - Create a comment (authenticated)
- `GET /comments/:productId` - Get comments for a product
- `PUT /comments/:id` - Update a comment (authenticated)
- `DELETE /comments/:id` - Delete a comment (authenticated)

### Order Routes (`/orders`)

- `POST /orders` - Create a new order (authenticated)
- `GET /orders/user` - Get user's orders (authenticated)
- `GET /orders/:id` - Get order by ID (authenticated)

### Admin Routes (`/admin`)

- `GET /admin/products` - Get all products (admin only)
- `POST /admin/products` - Create a product (admin only)
- `PUT /admin/products/:id` - Update a product (admin only)
- `DELETE /admin/products/:id` - Delete a product (admin only)
- `GET /admin/orders` - Get all orders (admin only)
- `PUT /admin/orders/:id` - Update order status (admin only)
- `GET /admin/users` - Get all users (admin only)

## 🗃️ Database Models

### User Model

- `name` - String
- `email` - String (unique)
- `password` - String (hashed)
- `phone` - String
- `role` - Enum: ['user', 'admin']
- `timestamps` - createdAt, updatedAt

### Product Model

- `name` - String (required)
- `description` - String
- `price` - Number (required)
- `images` - Array of Strings
- `category` - String (required)
- `sizes` - Array of Strings
- `colors` - Array of Strings
- `stock` - Number
- `rating` - Number
- `timestamps` - createdAt, updatedAt

### Order Model

- `userId` - ObjectId (ref: User)
- `products` - Array of { productId, quantity, price }
- `deliveryFee` - Number
- `totalPrice` - Number
- `shippingAddress` - String
- `location` - String
- `paymentStatus` - Enum: ['pending', 'paid', 'refunded']
- `orderStatus` - Enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
- `timestamps` - createdAt, updatedAt

### Comment Model

- `userId` - ObjectId (ref: User)
- `productId` - ObjectId (ref: Product)
- `comment` - String
- `Likes` - Array of Numbers
- `timestamps` - createdAt, updatedAt

## 🔒 Authentication & Authorization

- **JWT Tokens**: Used for authentication, stored in HTTP-only cookies
- **Password Hashing**: bcryptjs with salt rounds
- **Protected Routes**: Middleware validates JWT tokens
- **Role-Based Access**: Admin routes protected by admin middleware
- **Redux Persist**: User session persisted in local storage

## 🎨 UI Components

- Custom filters (Price, Size, Color, Category, Dress Style)
- Product cards with images and ratings
- Shopping cart with quantity controls
- Order summary with delivery fee calculation
- Admin dashboard with statistics and charts
- Responsive navigation with mobile menu
- Search functionality
- Subscribe form for newsletters

## 📱 Pages

### Public Pages

- **Home** - Landing page with featured products
- **Category** - Product listing with filters
- **Product Details** - Detailed product view
- **Cart** - Shopping cart
- **Auth** - Login/Register

### Admin Pages

- **Dashboard** - Overview with statistics
- **Products Management** - CRUD operations for products
- **Orders Management** - View and update orders
- **Customers Management** - View and manage customers
- **Settings** - Admin settings

## 🚢 Deployment

### Backend Deployment

- Ensure environment variables are set
- Build process: Node.js app runs directly
- Recommended platforms: Heroku, Railway, Render, or DigitalOcean

### Frontend Deployment

- Build the app: `npm run build`
- Output directory: `client/dist`
- Recommended platforms: Vercel, Netlify, or Cloudflare Pages
- Vercel configuration included (`vercel.json`)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

