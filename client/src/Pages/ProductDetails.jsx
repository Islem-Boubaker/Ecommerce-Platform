import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Check } from "lucide-react";
import { useProduct } from "../Hooks/useProduct";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Product Details");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Product
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${import.meta.env.VITE_API_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  const colors = ["#6B5B3A", "#2D5A3D", "#2B2E5A"];
  const sizes = ["Small", "Medium", "Large", "X-Large"];
  const images = product.images || [];
  const hasImages = images && images.length > 0;

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 opacity-50" />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i + fullStars} className="w-5 h-5 text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden">
              {hasImages ? (
                <img
                  src={getImageUrl(images[selectedImage] || images[0])}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-2">📦</div>
                    <p className="text-lg">No Image Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {hasImages && images.length > 1 && (
              <div className="flex gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-black shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={getImageUrl(image)}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/100x100?text=No+Image";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-black mb-4 uppercase tracking-wide">
                {product.name || "Unnamed Product"}
              </h1>
              <div className="flex items-center gap-3">
                {renderStars(product.rating || 4.5)}
                <span className="text-lg font-semibold">
                  {product.rating || 4.5}/5
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-black">
                ${product.price || "0.00"}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                                <>
                                    <span className="text-2xl text-gray-400 line-through">
                                        ${product.originalPrice}
                                    </span>
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
            </div> 

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description ||
                "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}
            </p>

            {/* Color Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Colors</h3>
              <div className="flex gap-3">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-12 h-12 rounded-full border-4 transition-all relative ${
                      selectedColor === index
                        ? "border-black shadow-lg scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === index && (
                      <Check className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Choose Size</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full border-2 font-semibold transition-all ${
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

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border-2 border-gray-300 rounded-full">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <span className="w-16 text-center font-semibold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              {["Product Details", "Rating & Reviews", "FAQs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-semibold text-lg transition-colors ${
                    activeTab === tab
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "Product Details" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Product Details</h3>
                {product.features && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-black rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.specifications && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3">
                      Specifications:
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between py-2 border-b border-gray-100"
                          >
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "Rating & Reviews" && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
                <p className="text-gray-500">Reviews feature coming soon...</p>
              </div>
            )}

            {activeTab === "FAQs" && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-bold mb-4">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-500">FAQ section coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
