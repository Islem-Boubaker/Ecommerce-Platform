import React from "react";

export default function ProductSizes({ sizes, selectedSize, setSelectedSize }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Choose Size</h3>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-6 py-3 rounded-full border-2 font-semibold ${
              selectedSize === size
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
