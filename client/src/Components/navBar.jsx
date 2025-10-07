import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import ShopDropdown from "./UI/ShopDropdown";
import { Menu,X } from "lucide-react";
export default function NavBar({ items = [], isMobile = false }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  // Close dropdown when menu closes
  useEffect(() => {
    if (!menuIsOpen) {
      setShopDropdown(false);
    }
  }, [menuIsOpen]);

  const scrollToSection = (item) => {
    const sectionId = item.toLowerCase().replace(/\s+/g, "_");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeMenu = () => setMenuIsOpen(false);

  // ✅ Toggle dropdown for "Shop"
  const toggleShopDropdown = () => {
    setShopDropdown((prev) => !prev);
  };

  const handleItemClick = (item) => {
    if (item === "Shop") {
      toggleShopDropdown();
      return;
    }

    if (isMobile) {
      closeMenu();
    }

    scrollToSection(item);
  };

  return (
    <div className="flex items-center justify-between">
      <button className=" flex lg:hidden" onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {menuIsOpen ? null: <Menu size={24} />}
      </button>
      <div className={` fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out  ${
        menuIsOpen ? "translate-x-0" : "translate-x-full"}  lg:flex lg:top-10 lg:right-10 lg:w-auto lg:`}>
        <button className=" flex lg:hidden" onClick={() => setMenuIsOpen(!menuIsOpen)}>
        {menuIsOpen ? <X size={24} /> : null}
      </button>
      {items.map((item) => (
        <div key={item} className="relative">
          {item === "Shop" ? (
            <button
              onClick={toggleShopDropdown}
              className={`flex items-center gap-1 px-4 py-2 hover:text-gray-900 ${
                isMobile ? "hover:bg-gray-200 rounded" : "hover:bg-gray-200 md:hover:bg-transparent"
              }`}
              aria-expanded={shopDropdown}
              aria-haspopup="true"
            >
              {item}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  shopDropdown ? "rotate-180" : ""
                }`}
              />
            </button>
          ) : (
            <span
              className={`cursor-pointer px-4 py-2 hover:text-gray-900 ${
                isMobile ? "hover:bg-gray-200 rounded" : "hover:bg-gray-200 md:hover:bg-transparent"
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </span>
          )}

          {/* Render dropdown if 'Shop' is toggled open */}
          {item === "Shop" && shopDropdown && (
            <ShopDropdown
              isMobile={isMobile}
              shopDropdown={shopDropdown}
              setShopDropdown={setShopDropdown}
            />
          )}
        </div>
      ))}
    </div>
    <div/>
    </div>
  );
}
