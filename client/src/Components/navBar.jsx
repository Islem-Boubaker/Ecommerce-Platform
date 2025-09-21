import { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";

function NavBar({ items }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  // Listen for a global event to open the drawer from other components (mobile/tablet only)
  useEffect(() => {
    const handler = () => setMenuIsOpen(true);
    window.addEventListener("open-nav-drawer", handler);
    return () => window.removeEventListener("open-nav-drawer", handler);
  }, []);

  const shopSelect = (item) => {
    if (item === "Shop") {
      return (
        <div className="relative hover:bg-gray-200 ">
          <button
            onClick={() => setShopDropdown(!shopDropdown)}
            className="flex items-center gap-1 hover:text-gray-900 px-4 py-2"
          >
            {item} <ChevronDown size={16} />
          </button>
          {shopDropdown && (
            <ul className={`absolute ${menuIsOpen ? "left-0 top-10" : "left-0 top-10"} mt-2 bg-white shadow-lg text-black rounded w-32 z-50`}>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">All</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Men</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Women</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Kids</li>
            </ul>
          )}
        </div>
      );
    } else {
      return <span className="hover:text-gray-900 cursor-pointer hover:bg-gray-200 px-4 py-2">{item}</span>;
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 order-4">


      {/* Menu button (mobile) */}
      <button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="lg:hidden text-2xl"
      >
        {menuIsOpen ? <X /> : <Menu />}
      </button>

      {/* Menu items */}
      <ul
        className={`text-xl text-black  ${menuIsOpen
          ? "block bg-white shadow-lg absolute top-16 right-0 w-64 z-40 lg:relative lg:top-0 lg:shadow-none lg:bg-transparent"
          : "hidden lg:flex lg:items-center"
          }`}
      >
        {items.map((item, index) => (
          <li key={index} className="hover:bg-gray-200 md:hover:bg-transparent">
            {shopSelect(item)}
          </li>
        ))}
      </ul>

      {/* Close mobile menu when clicking outside */}
      {menuIsOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          onClick={() => setMenuIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}

export default NavBar;