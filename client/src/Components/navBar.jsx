import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ShopDropdown from "./UI/ShopDropdown";

export default function NavBar({ items = [], isMobile = false }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  useEffect(() => {
    if (!menuIsOpen) {
      setShopDropdown(false);
    }
  }, [menuIsOpen]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (menuIsOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuIsOpen, isMobile]);

  const scrollToSection = (item) => {
    const sectionId = item.toLowerCase().replace(/\s+/g, "_");
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const closeMenu = () => setMenuIsOpen(false);

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

  // Mobile layout with hamburger menu
  if (isMobile) {
    return (
      <>
        {/* Hamburger Menu Button */}
        <button
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Overlay */}
        {menuIsOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Side Menu */}
        <nav
          className={`
            fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 
            transform transition-transform duration-300 ease-in-out
            ${menuIsOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-md transition-colors"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {/* Menu Items */}
          <div className="pt-16 px-4 space-y-2">
            {items.map((item) => (
              <div key={item} className="relative">
                {item === "Shop" ? (
                  <button
                    onClick={toggleShopDropdown}
                    className="flex items-center gap-1 w-full text-left px-4 py-3 rounded-md hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium"
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
                  <button
                    className="w-full text-left px-4 py-3 rounded-md hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium"
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </button>
                )}

                {/* Dropdown */}
                {item === "Shop" && shopDropdown && (
                  <ShopDropdown
                    isMobile={true}
                    shopDropdown={shopDropdown}
                    setShopDropdown={setShopDropdown}
                  />
                )}
              </div>
            ))}
          </div>
        </nav>
      </>
    );
  }

  return (
    <nav className="flex items-center gap-1">
      {items.map((item) => (
        <div key={item} className="relative">
          {item === "Shop" ? (
            <button
              onClick={toggleShopDropdown}
              className="flex items-center gap-1 px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium text-sm lg:text-base"
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
            <button
              className="px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100 transition-colors font-medium text-sm lg:text-base"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </button>
          )}

          {/* Dropdown */}
          {item === "Shop" && shopDropdown && (
            <ShopDropdown
              isMobile={false}
              shopDropdown={shopDropdown}
              setShopDropdown={setShopDropdown}
            />
          )}
        </div>
      ))}
    </nav>
  );
}
