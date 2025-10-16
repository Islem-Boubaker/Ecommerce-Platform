import React from "react";

export default function ProductImages({ product, selectedImage, setSelectedImage }) {
  const images = product.images || [];

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${import.meta.env.VITE_API_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  const hasImages = images.length > 0;

  return (
    <div className="flex flex-row gap-4 flex-1">
      <div className="order-2 aspect-square bg-gray-200 rounded-2xl overflow-hidden">
        {hasImages ? (
          <img
            src={getImageUrl(images[selectedImage] || images[0])}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">📦 No Image</div>
        )}
      </div>

      {hasImages && images.length > 1 && (
        <div className="flex  flex-col gap-4 ">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`w-24 h-24 rounded-xl overflow-hidden border-2 ${selectedImage === i ? "border-black shadow-lg" : "border-gray-200"
                }`}
            >
              <img src={getImageUrl(images[i])} alt={`${product.name} ${i + 1}`} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
