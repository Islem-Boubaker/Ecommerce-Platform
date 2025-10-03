import React from "react";
import { Star } from "lucide-react";
import Filters from "../Components/filters";
import { useProduct } from "../Hooks/useProduct";


export default function ProductListingPage() {

  const { products = [] } = useProduct() || {};
  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2  gap-6 ">

        <div className="">
          <Filters />
        </div>

        <main className=" w-full">
          <h2 className="text-2xl font-bold mb-6">Casual</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((products) => (
              <div
                key={products.id}
                className="border rounded-lg p-4 hover:shadow-md cursor-pointer"
              >
                <img
                  src={products.image}
                  alt={products.name}
                  className="w-full h-64 object-cover rounded"
                />
                <h3 className="mt-4 text-sm font-semibold">{products.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold">${products.price}</span>
                  {products.oldPrice && (
                    <span className="text-sm line-through text-gray-500">
                      ${products.oldPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(products.rating) ? "gold" : "none"}
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
