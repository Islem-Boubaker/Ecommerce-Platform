import React from "react";

export default function ProductQuantity({ quantity, setQuantity }) {
  const handleChange = (delta) => setQuantity(Math.max(1, quantity + delta));

  return (
    <div className="flex gap-4">
      <div className="flex items-center border-2 border-gray-300 rounded-full">
        <button onClick={() => handleChange(-1)} className="w-12 h-12 hover:bg-gray-100">−</button>
        <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
        <button onClick={() => handleChange(1)} className="w-12 h-12 hover:bg-gray-100">+</button>
      </div>
      <button className="flex-1 bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800">
        Add to Cart
      </button>
    </div>
  );
}
