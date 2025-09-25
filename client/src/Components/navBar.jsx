import { useState, useEffect } from "react";
import { X, Menu, ChevronDown } from "lucide-react";

const SHOP_CATEGORIES = ["All", "Men", "Women", "Kids"];

function NavBar({ items = [] }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  // Listen for global event to open drawer from other components
  useEffect(() => {
    const handleOpenDrawer = () => setMenuIsOpen(true);
    window.addEventListener("open-nav-drawer", handleOpenDrawer);
    return () => window.removeEventListener("open-nav-drawer", handleOpenDrawer);
  }, []);

  // Close dropdown when menu closes
  useEffect(() => {
    if (!menuIsOpen) {
      setShopDropdown(false);
    }
  }, [menuIsOpen]);



  const closeMenu = () => setMenuIsOpen(false);
  const toggleMenu = () => setMenuIsOpen(prev => !prev);
  const toggleShopDropdown = () => setShopDropdown(prev => !prev);

  const ShopDropdown = ({ isMobile = false }) => (
    <div className="relative group">
      <button
        onClick={toggleShopDropdown}
        className={`flex items-center gap-1 px-4 py-2 hover:text-gray-900 ${
          isMobile ? "" : "hover:bg-gray-200"
        }`}
        aria-expanded={shopDropdown}
        aria-haspopup="true"
      >
        Shop <ChevronDown size={16} />
      </button>
      
      {shopDropdown && (
        <ul
          className="absolute right-70 top-5 mt-2 bg-white shadow-lg text-black rounded w-25 z-50"
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

  const NavItem = ({ item, isMobile = false }) => {
    if (item === "Shop") {
      return <ShopDropdown isMobile={isMobile} />;
    }

    return (
      <span
        className={`cursor-pointer px-4 py-2 hover:text-gray-900 ${
          isMobile ? "hover:bg-gray-200 rounded" : "hover:bg-gray-200 md:hover:bg-transparent"
        }`}
        onClick={isMobile ? closeMenu : undefined}
      >
        {item}
      </span>
    );
  };

  return (
    <nav className="flex items-center justify-between p-4 order-4">
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="lg:hidden text-2xl"
        aria-label={menuIsOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuIsOpen}
        aria-controls="mobile-drawer"
      >
        <Menu />
      </button>

      {/* Desktop navigation */}
      <ul className="hidden lg:flex lg:items-center text-xl text-black">
        {items.map((item, index) => (
          <li key={index}>
            <NavItem item={item} />
          </li>
        ))}
      </ul>

      {/* Mobile drawer */}
      <aside
        id="mobile-drawer"
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          menuIsOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span id="drawer-title" className="text-lg font-semibold">
            Menu
          </span>
          <button
            onClick={closeMenu}
            aria-label="Close navigation"
            className="text-2xl hover:bg-gray-100 p-1 rounded"
          >
            <X />
          </button>
        </div>
        
        <ul className="flex flex-col p-2 text-black text-lg">
          {items.map((item, index) => (
            <li key={index}>
              <NavItem item={item} isMobile={true} />
            </li>
          ))}
        </ul>
      </aside>

      {/* Backdrop overlay */}
      {menuIsOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}

export default NavBar;