import React from "react";
import { FaTrash } from "react-icons/fa";

export default function CartItem({
  product,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  
  // Handle cases where image might be undefined or already a full URL
  const getImageUrl = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    return `${import.meta.env.VITE_API_URL}/${image.replace(/\\/g, '/')}`;
  };

  const imageUrl = getImageUrl(product.image);


  return (
    <div className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-none">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/80';
          }}
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}

      <div className="flex-1">
        <h2 className="font-bold text-lg">{product.name}</h2>
        <p className="text-sm">
          <b>Price:</b> ${product.price}
        </p>
        <p className="text-sm">
          <b>Total:</b> ${(product.price * product.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
        <button
          className="text-xl"
          onClick={() => onDecrement(product.productId)}
        >
          −
        </button>
        <span>{product.quantity}</span>
        <button
          className="text-xl"
          onClick={() => onIncrement(product.productId)}
        >
          +
        </button>
      </div>

      {/* Delete Button */}
      <button
        className="text-red-500 text-xl ml-2"
        onClick={() => onRemove(product.productId)}
      >
        <FaTrash />
      </button>
    </div>
  );
}
