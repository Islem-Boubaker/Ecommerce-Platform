
function ProductCart({ product }) {
    const imgUrl = `${import.meta.env.VITE_API_URL}/${product.images[0].replace(/\\/g, "/")}`;
  
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative">
          <img
            src={imgUrl}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
        </div>
  
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
  
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {"★".repeat(4)}
              {"☆".repeat(1)}
            </div>
          </div>
  
          <div className="text-3xl font-bold text-gray-900 mb-4">
            ${product.price}
          </div>
  
          <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
  
export default ProductCart;
