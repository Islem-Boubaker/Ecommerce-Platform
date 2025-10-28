import React from "react";

export default function SizeFilter({ selectedSize, onChange }) {
  const sizes = [
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large",
  ];

  return (
    <div className="flex flex-col gap-3 pb-6 border-b border-gray-200">
      <h3 className="font-semibold text-base">Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            type="button"
            key={size}
            onClick={() => onChange(size)}
            className={`px-5 py-2 text-sm rounded-full transition-all ${
              selectedSize === size
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
