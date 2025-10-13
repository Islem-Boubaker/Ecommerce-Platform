import React from "react";
import { Check } from "lucide-react";

export default function ProductColors({ colors, selectedColor, setSelectedColor }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Select Colors</h3>
      <div className="flex gap-3">
        {colors.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedColor(i)}
            className={`w-10 h-10 rounded-full border-2 border-gray-300 ${
              selectedColor === i ? " scale-110" : ""
            } relative`}
            style={{ backgroundColor: c }}
          >
            {selectedColor === i && <Check className="w-6 h-6 text-white absolute inset-0 m-auto" />}
          </button>
        ))}
      </div>
    </div>
  );
}
