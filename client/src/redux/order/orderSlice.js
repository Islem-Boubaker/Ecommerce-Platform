// redux/order/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: null, 
  orders: [], // Array of products in cart
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // payload = {productId, name, image, price, quantity}
      const existingItem = state.orders.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += 1; // increment if exists
      } else {
        state.orders.push({ 
          ...action.payload, 
          quantity: 1 
        });
      }
    },
    removeOrder: (state, action) => {
      // payload = productId
      state.orders = state.orders.filter(
        (item) => item.productId !== action.payload
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.orders.find(
        (item) => item.productId === action.payload
      );
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.orders.find(
        (item) => item.productId === action.payload
      );
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.orderId = null;
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addOrder,
  removeOrder,
  incrementQuantity,
  decrementQuantity,
  clearOrders,
  setOrderId,
  setLoading,
  setError,
} = ordersSlice.actions;

export default ordersSlice.reducer;