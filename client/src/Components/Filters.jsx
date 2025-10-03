import React from 'react'
import { useState } from 'react'
import PriceFilter from './UI/PriceFilter';
export default function Filters() {
    const [selectedColors, setSelectedColors] = useState([]);
   

  return (
    
      <aside className=" border-r pr-4 space-y-6 w-full min-h-screen">
    <div>
      <h2 className="font-semibold mb-2">Filter by</h2>
      <button className="text-sm text-blue-500 cursor-pointer">Clear All</button>
    </div>

    {/* Price Filter */}
    
    <PriceFilter />
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
