
import { ChevronRight } from "lucide-react";

export default function CategoryFilter({ selectedCategory, onChange }) {
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

  return (
    <div className=" border-b-1 border-gray-400">
      {categories.map((cat) => (
        <button
          type="button"
          key={cat}
          onClick={() => onChange && onChange(cat)}
          className={`w-full flex justify-between items-center px-4 py-2 cursor-pointer hover:bg-gray-50 ${
            selectedCategory === cat ? "bg-gray-100" : ""
          }`}
          aria-pressed={selectedCategory === cat}
        >
          <span className="text-gray-700">{cat}</span>
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      ))}
    </div>
  );
}
