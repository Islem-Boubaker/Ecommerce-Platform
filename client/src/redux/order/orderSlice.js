// redux/order/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  products: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const payload = action.payload;
      // find product from order if exist 
      const existingItem = state.products.find(
        (item) => item.productId === payload.productId
      );
      //  if product exist add +1:
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // else push new product
        state.products.push({
          ...payload,
          quantity: 1,
        });
      }
    },

    // when i remove product from order in cart pages 
    removeProductFromOrder: (state, action) => {
      state.products = state.products.filter(
        (item) => item.productId !== action.payload
      );
    },

    incrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.productId === action.payload
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.productId === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // when logout 
    clearOrders: (state) => {
      state.products = [];
      state.userId = null;
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
  removeProductFromOrder,
  incrementQuantity,
  decrementQuantity,
  clearOrders,
  setLoading,
  setError,
} = ordersSlice.actions;

export default ordersSlice.reducer;