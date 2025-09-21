import React from "react";
import { Star } from "lucide-react";
import Filters from "../Components/filters";
const products = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    price: 120,
    oldPrice: 150,
    image: "/images/tshirt1.jpg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Plaid Flannel Shirt",
    price: 180,
    oldPrice: 200,
    image: "/images/shirt1.jpg",
    rating: 4,
  },
  // add more products...
];

export default function ProductListingPage() {
 
  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-12 gap-6">
        {/* Sidebar Filters */}
        <Filters/>
        
        {/* Product Grid */}
        <main className="col-span-9">
          <h2 className="text-2xl font-bold mb-6">Casual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 hover:shadow-md cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded"
                />
                <h3 className="mt-4 text-sm font-semibold">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-sm line-through text-gray-500">
                      ${product.oldPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? "gold" : "none"}
                      stroke="gold"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
