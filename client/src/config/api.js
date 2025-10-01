// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
  // Dashboard
  DASHBOARD_STATS: '/admin/dashboard/stats',
  SALES_ANALYTICS: '/admin/analytics/sales',
  
  // Users
  USERS: '/admin/users',
  USER_BY_ID: (id) => `/admin/users/${id}`,
  USER_STATUS: (id) => `/admin/users/${id}/status`,
  
  // Products
  PRODUCTS: '/admin/products',
  PRODUCT_BY_ID: (id) => `/admin/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/admin/products/category/${category}`,
  PRODUCTS_BULK_DELETE: '/admin/products/bulk',
  
  // Orders
  ORDERS: '/admin/orders',
  ORDER_BY_ID: (id) => `/admin/orders/${id}`,
  ORDER_STATUS: (id) => `/admin/orders/${id}/status`,
  ORDERS_BY_USER: (userId) => `/admin/orders/user/${userId}`,
  ORDERS_BULK_STATUS: '/admin/orders/bulk/status',
  
  // Categories
  CATEGORIES: '/admin/categories',
  CATEGORY_STATS: '/admin/categories/stats',
};

// Axios default config
export const axiosConfig = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};
