import React from "react";
import ProductRating from "./ProductRating";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import ProductQuantity from "./ProductQuantity";

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}) {
  const colors = ["#6B5B3A", "#2D5A3D", "#2B2E5A"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold uppercase mb-4">{product.name}</h1>
        <div className="flex items-center gap-3">
          <ProductRating rating={product.rating || 4.5} />
          <span className="text-lg font-semibold">{product.rating || 4.5}/5</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-4xl font-bold">${product.price || "0.00"}</span>
        {product.originalPrice && product.originalPrice > product.price && (
          <>
            <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </>
        )}
      </div>

      <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

      <ProductColors
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <ProductSizes
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
    </div>
  );
}
