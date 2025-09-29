import React from 'react'
import { useState } from 'react'
export default function Filters() {
    const [selectedColors, setSelectedColors] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 500]);
  
    const handleMinChange = (e) => {
      const newMin = Number(e.target.value);
      setPriceRange((prev) => [Math.min(newMin, prev[1]), prev[1]]);
    };
  
    const handleMaxChange = (e) => {
      const newMax = Number(e.target.value);
      setPriceRange((prev) => [prev[0], Math.max(newMax, prev[0])]);
    };
  
  return (
    
      <aside className=" border-r pr-4 space-y-6 w-full min-h-screen">
    <div>
      <h2 className="font-semibold mb-2">Filter by</h2>
      <button className="text-sm text-blue-500 cursor-pointer">Clear All</button>
    </div>

    {/* Price Filter */}
    <div>
      <h3 className="font-semibold mb-2">Price</h3>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <label className="w-16 text-sm text-gray-600">Min</label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-full"
          />
          <span className="w-14 text-sm text-gray-700">${priceRange[0]}</span>
        </div>
        <div className="flex items-center gap-3">
          <label className="w-16 text-sm text-gray-600">Max</label>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-full"
          />
          <span className="w-14 text-sm text-gray-700">${priceRange[1]}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>500</span>
        </div>
      </div>
    </div>

    {/* Color Filter */}
    <div>
      <h3 className="font-semibold mb-2">Colors</h3>
      <div className="grid grid-cols-6 gap-2">
        {["red", "blue", "green", "yellow", "black", "gray"].map(
          (color) => (
            <button
              key={color}
              onClick={() =>
                setSelectedColors((prev) =>
                  prev.includes(color)
                    ? prev.filter((c) => c !== color)
                    : [...prev, color]
                )
              }
              className={`h-6 w-6 rounded-full border-2 ${
                selectedColors.includes(color)
                  ? "border-black"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          )
        )}
      </div>
    </div>

    {/* Sizes */}
    <div>
      <h3 className="font-semibold mb-2">Size</h3>
      <div className="flex flex-wrap gap-2">
        {["S", "M", "L", "XL"].map((size) => (
          <button
            key={size}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  </aside>


  )
}
