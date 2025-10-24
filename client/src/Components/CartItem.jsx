import React from "react";
import { FaTrash } from "react-icons/fa";

export default function CartItem({
  product,
  onIncrement,
  onDecrement,
  onRemove,
}) {
  const productdetails = product.productDetails?.product || product.productDetails || product;

  // --- Helper: get image URL
  const getImageUrl = (image) => {
    if (!image) return "";
    const imageToUse = Array.isArray(image) ? image[0] : image;
    if (!imageToUse) return "";
    if (typeof imageToUse === "string" && imageToUse.startsWith("http"))
      return imageToUse;
    return `${import.meta.env.VITE_API_URL}/${imageToUse.replace(/\\/g, "/")}`;
  };

  const imageUrl = getImageUrl(productdetails.images);

  // --- Discount logic
  const promotion = productdetails.promotion || {};
  const isDiscountActive = promotion.active === true;
  const discountType = promotion.discountType;
  const discountValue = promotion.discountValue || 0;

  let discountedPrice = product.price;

  if (isDiscountActive && discountValue > 0) {
    if (discountType === "percentage") {
      discountedPrice = product.price - (product.price * discountValue) / 100;
    } else if (discountType === "flat") {
      discountedPrice = Math.max(product.price - discountValue, 0);
    }
  }

  const total = discountedPrice * product.quantity;

  return (
    <div className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-none">
      {/* Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={productdetails.name}
          className="w-20 h-20 object-cover rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/80";
          }}
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}

      {/* Product Info */}
      <div className="flex-1">
        <h2 className="font-bold text-lg">{productdetails.name}</h2>

        {/* Price Section */}
        <div className="text-sm space-y-1">
          {isDiscountActive ? (
            <>
              <p>
                <b>Original:</b>{" "}
                <span className="line-through text-gray-400">
                  ${product.price.toFixed(2)}
                </span>
              </p>
              <p className="text-red-500 font-semibold">
                <b>Discounted:</b> ${discountedPrice.toFixed(2)}{" "}
                {discountType === "percentage" && (
                  <span className="text-xs text-red ml-1">
                    (-{discountValue}%)
                  </span>
                )}
                {discountType === "flat" && (
                  <span className="text-xs text-red ml-1">
                    (-${discountValue})
                  </span>
                )}
              </p>
            </>
          ) : (
            <p>
              <b>Price:</b> ${product.price.toFixed(2)}
            </p>
          )}

          <p>
            <b>Total:</b> ${total.toFixed(2)}
          </p>
        </div>
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

      {/* Remove Button */}
      <button
        className="text-red-500 text-xl ml-2"
        onClick={() => onRemove(product.productId)}
      >
        <FaTrash />
      </button>
    </div>
  );
}
