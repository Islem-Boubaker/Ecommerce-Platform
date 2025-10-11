import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeOrder,
  
} from "../redux/order/orderSlice";
import { deleteProductFromOrder,updateProductQuantity} from "../services/OrdersServices"



export default function Cart() {
  const orderId = useSelector((state) => state.orders.orderId); // current order ID
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  // total calculations
  const subtotal = orders.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2; // 20% discount example
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const increment = (productId) => {
    const newQuantity = orders.find((item) => item.productId === productId).quantity + 1;
    dispatch(incrementQuantity(productId));
    updateProductQuantity(orderId,productId,newQuantity); // call backend
  };

  const decrement = (productId) => {
    const newQuantity = Math.max(1, orders.find((item) => item.productId === productId).quantity - 1);
    dispatch(decrementQuantity(productId));
    updateProductQuantity(orderId,productId,newQuantity); // call backend
  };

  const handleRemoveProduct = (productId) => {
    if (!orderId) return alert("No order ID found!");
    deleteProductFromOrder(orderId,productId); // call backend
    dispatch(removeOrder(productId)); // update Redux locally
  };
  

  return (
    <div className="p-6">
      <h1 className="uppercase text-4xl font-bold mb-6 ">Your Cart</h1>

      {orders.length === 0 && (
        <div className="text-gray-500">Your cart is empty</div>
      )}

      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT – Product list */}
        <div className="flex-2 space-y-6 bg-gray-100 p-6 rounded-xl h-full w-full lg:w-2/3">
          {orders.map((product) => (
            <div
              key={product.productId}
              className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-none"
            >
              <img 
                src={`${import.meta.env.VITE_API_URL}/${product.image.replace(/\\/g, "/")}`}
                alt={product.name}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1">
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-sm">
                  <b>Price:</b> ${product.price}
                </p>
                <p className="text-sm">
                  <b>Total:</b> ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity buttons */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                <button
                  className="text-xl"
                  onClick={() => decrement(product.productId)}
                >
                  −
                </button>
                <span>{product.quantity}</span>
                <button
                  className="text-xl"
                  onClick={() => increment(product.productId)}
                >
                  +
                </button>
              </div>

              {/* Trash icon */}
              <button
                className="text-red-500 text-xl ml-2"
                onClick={() => handleRemoveProduct(product.productId)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT – Order summary */}
        {orders.length > 0 && (
          <div className="flex-1 lg:w-80 rounded-xl p-6 h-full bg-gray-200">
            <h3 className="font-bold text-xl mb-4">Order Summary</h3>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Discount (-20%)</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 border-b pb-2 mb-2">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Add promo code"
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none"
              />
              <button className="bg-black text-white rounded-full px-4 py-2">
                Apply
              </button>
            </div>
            <button
             
              className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900"
            >
              Go to Checkout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
