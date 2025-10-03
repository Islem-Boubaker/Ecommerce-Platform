import React, { useState } from 'react'

export default function ColorFilter() {
    const [selectedColors, setSelectedColors] = useState([]);
  return (
    <div>
    <h3 className="font-semibold mb-2">Colors</h3>
    <div className="grid grid-cols-6 gap-2">
      {["green","red" , "yellow","Orange","blue","purple","pink","white","black"].map(
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
  )
}
