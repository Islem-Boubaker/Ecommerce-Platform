import React, { useEffect, useMemo, useState } from "react";

import PriceFilter from "./UI/PriceFilter";
import ColorFilter from "./UI/ColorFilter";
import SizeFilter from "./UI/SizeFilter";
import DressStyleFilter from "./UI/DressStyleFilter";
import CategoryFilter from "./CategoryFilter";

export default function Filters({ onResults, onFiltersChange }) {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([50, 200]);

  const filters = useMemo(
    () => ({
      category: selectedCategory,
      colors: selectedColors,
      sizes: selectedSizes,
      style: selectedStyle,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    }),
    [selectedCategory, selectedColors, selectedSizes, selectedStyle, priceRange]
  );

  useEffect(() => {
    onFiltersChange && onFiltersChange(filters);

    const controller = new AbortController(); //Cancel old fetch requests if new ones start
    const timeout = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        if (filters.category) params.set("category", filters.category);
        if (filters.colors) params.set("colors", filters.colors);
        if (filters.sizes.length) params.set("sizes", filters.sizes.join(","));
        if (filters.style) params.set("style", filters.style);
        if (filters.minPrice != null)
          params.set("minPrice", String(filters.minPrice));
        if (filters.maxPrice != null)
          params.set("maxPrice", String(filters.maxPrice));

        const url = `${
          import.meta.env.VITE_API_URL || ""
        }/products?${params.toString()}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
        const data = await res.json();
        onResults && onResults(data);
        // Fallback: log so devs can see results if no handler is provided
        if (!onResults) console.log("Filtered products", data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Filter fetch error", err);
        }
      }
    }, 400); // debounce

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [filters, onResults, onFiltersChange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b border-gray-200 pb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          onFiltersChange && onFiltersChange(filters);
        }}
      >
        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Price Filter */}
        <PriceFilter value={priceRange} onChange={setPriceRange} />

        {/* Color Filter */}
        <ColorFilter
          selectedColors={selectedColors}
          onChange={setSelectedColors}
        />

        {/* Sizes */}
        <SizeFilter selectedSizes={selectedSizes} onChange={setSelectedSizes} />

        {/* Dress Style Filter */}
        <DressStyleFilter
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors font-medium"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}
