import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function ProductCart({ product }) {
  const [rating, setRating] = useState(0); // current selected rating
  const [hover, setHover] = useState(0);   // highlight on hover

  const handleClick = (value) => {
    setRating(value);
  };

  const imgUrl = `${import.meta.env.VITE_API_URL}/${product.images[0].replace(/\\/g, "/")}`;

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden cursor-pointer">
      <Link to={`/products/${product._id}`}>
        {/* Product Image */}
        <div className="relative">
          <img
            src={imgUrl}
            alt={product.name}
            className="w-full h-80 object-cover rounded-2xl"
          />
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h2>

          {/* Rating Stars */}
          <div className="flex items-center mb-3">
            <div className="flex space-x-1 text-yellow-400 text-2xl">
              {[1, 2, 3, 4, 5].map((value) => (
                <FaStar
                  key={value}
                  className={`cursor-pointer transition-colors duration-200 ${
                    (hover || rating) >= value
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleClick(value)}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                />
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            {product.discount > 0 && (
              <div className="text-lg font-semibold text-gray-500 line-through">
                ${product.price + product.price * (product.discount / 100)}
                <span className="ml-2 text-red-500">-{product.discount}%</span>
              </div>
            )}

            <div className="text-3xl font-semibold text-gray-900 mb-4">
              ${product.price}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCart;
