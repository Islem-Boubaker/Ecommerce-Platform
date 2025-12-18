import React, { useState, useEffect } from "react";

import FilterSidebar from "../features/products/components/FilterSidebar";
import ProductCard from "../features/products/components/ProductCard";
import Pagination from "../shared/components/Pagination";

const initialProducts = [
  {
    id: 1,
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    rating: 3.5,
    images:["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"],
      
    size: "Large",
    styles: ["Casual"],
  },
  {
    id: 2,
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    images:[
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=500&fit=crop",
    
      ],  size: "Medium",
    styles: ["Casual", "Formal"],
  },
  {
    id: 3,
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    rating: 4.5,
    images:[
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    ],size: "Small",
    styles: ["Casual"],
  },
  {
    id: 4,
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    rating: 5.0,
    images:[
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=500&h=500&fit=crop",
    ],size: "Large",
    styles: ["Formal"],
  },
  {
    id: 5,
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    images:[
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
    ],size: "X-Large",
    styles: ["Casual", "Gym"],
  },
  {
    id: 6,
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    images:[
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
    ],size: "Medium",
    styles: ["Casual", "Gym"],
  },
];

export default function Category() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const applyFilters = () => {
    let filtered = initialProducts;

    if (selectedSize) {
      filtered = filtered.filter((product) => product.size === selectedSize);
    }

    if (selectedStyles.length > 0) {
      filtered = filtered.filter((product) =>
        product.styles.some((style) => selectedStyles.includes(style))
      );
    }

    setFilteredProducts(filtered);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    applyFilters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-5 px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="w-100 h-fit  bg-white rounded-2xl shadow-md p-4">
            <FilterSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              selectedStyles={selectedStyles}
              onStylesChange={setSelectedStyles}
              onApplyFilters={applyFilters}
            />
          </aside>

          {/* Product Grid */}
          <main className="w-full md:w-3/4">
            <div className="flex  mb-6 h-screen">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedSize("Large");
                      setSelectedStyles([]);
                      applyFilters();
                    }}
                    className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
