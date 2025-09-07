import { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";

function NavBar({ items }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  const shopSelect = (item) => {
    if (item === "Shop") {
      return (
        <div className="relative">
          <button
            onClick={() => setShopDropdown(!shopDropdown)}
            className="flex items-center gap-1 hover:text-gray-900"
          >
            {item} ▼
          </button>
          {shopDropdown && (
            <ul className="absolute left-0 mt-2 bg-white shadow-lg text-black rounded w-32 z-100">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">All</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Men</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Women</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Kids</li>
            </ul>
          )}
        </div>
      );
    } else {
      return <span className="hover:text-gray-900 cursor-pointer">{item}</span>;
    }
  };

  return (
    <nav className=" flex items-center justify-between p-4">


      {/* Menu button (mobile) */}
      <button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="sm:hidden text-2xl"
      >
        {menuIsOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menu items */}
      <ul
        className={`flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ${menuIsOpen ? "block" : "hidden sm:flex"
          }`}
      >
        {items.map((item, index) => (
          <li key={index}>{shopSelect(item)}</li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
