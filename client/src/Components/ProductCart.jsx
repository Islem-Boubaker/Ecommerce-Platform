import { Link } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

function ProductCart({ product }) {
  const [rating, setRating] = useState(3);

  const handleClick = (value) => {
    setRating(value);
  };
  const img = (imgurl) => {
    if (!imgurl) return "";
    if (imgurl.startsWith("http")) return imgurl;
    return `${import.meta.env.VITE_API_URL}/${imgurl.replace(/\\/g, "/")}`;
  };

  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden cursor-pointer">
      {product ? (
        <Link to={`/products/${product._id}`}>
          <div className="relative">
            <img
              src={img(product.images[0])}
              alt={product.name}
              className="w-full h-80 object-cover rounded-2xl"
            />
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h2>

            <div className="flex items-center mb-3">
              <div className="flex space-x-1 text-2xl">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    className={`   ${
                      value <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              {product.discount > 0 && (
                <div className="text-lg font-semibold text-gray-500 line-through">
                  ${product.price + product.price * (product.discount / 100)}
                  <span className="ml-2 text-red-500">
                    -{product.discount}%
                  </span>
                </div>
              )}

              <div className="text-3xl font-semibold text-gray-900 mb-4">
                ${product.price}
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ProductCart;
