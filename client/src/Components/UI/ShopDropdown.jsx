import React from 'react';
import { ChevronDown } from "lucide-react";

export default function ShopDropdown({ shopDropdown, setShopDropdown }) {
  const SHOP_CATEGORIES = ["All", "Men", "Women", "Kids"];
  

  const closeMenu = () => setShopDropdown(false);

  return (
    <div className="relative group">
  
      {shopDropdown && (
        <ul
          className="absolute right-0 top-full mt-2 bg-white shadow-lg text-black rounded w-32 z-50"
          role="menu"
        >
          {SHOP_CATEGORIES.map((category) => (
            <li
              key={category}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              role="menuitem"
              onClick={closeMenu}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}