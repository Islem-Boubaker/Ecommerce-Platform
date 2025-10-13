import React from "react";

export default function OrderSummary({ subtotal, totalDiscount, deliveryFee, total }) {
  return (
    <div className="flex-1 lg:w-80 rounded-xl p-6 bg-gray-200">
      <h3 className="font-bold text-xl mb-4">Order Summary</h3>

      <div className="flex justify-between text-gray-700">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-red-500">
        <span>Total Discount</span>
        <span>- ${totalDiscount.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700 border-b pb-2 mb-2">
        <span>Delivery Fee</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold text-lg mb-4">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-900">
        Go to Checkout →
      </button>
    </div>
  );
}
