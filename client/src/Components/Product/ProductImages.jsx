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
    <div className="space-y-4">
      <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
        {hasImages ? (
          <img
            src={getImageUrl(images[selectedImage] || images[0])}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "https://via.placeholder.com/400x400?text=No+Image")}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">📦 No Image</div>
        )}
      </div>

      {hasImages && images.length > 1 && (
        <div className="flex gap-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i)}
              className={`w-24 h-24 rounded-xl overflow-hidden border-2 ${
                selectedImage === i ? "border-black shadow-lg" : "border-gray-200"
              }`}
            >
              <img src={getImageUrl(img)} alt={`${product.name} ${i + 1}`} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
