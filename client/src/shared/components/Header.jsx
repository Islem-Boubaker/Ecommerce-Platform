import SearchBar from "./SearchBar";
import LoginIcon from "./LoginIcon";
import ShoppingCartIcon from "./ShoppingCartIcon";
import NavBar from "./Navbar";
import EcommerceLogo from "./EcommerceLogo";
import { useNavigate } from "react-router";

function Header({ items }) {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 md:gap-6 lg:gap-8">
          <div className="flex items-center shrink-0">
            <EcommerceLogo />
          </div>

          <div className="hidden md:flex items-center flex-1 justify-center lg:justify-start lg:flex-initial lg:order-2">
            <NavBar items={items} />
          </div>

          <div className="hidden md:flex items-center gap-4 lg:order-3 lg:flex-1 lg:justify-end">
            <SearchBar />
            <div className="flex items-center gap-3">
              <div className="cursor-pointer hover:opacity-70 transition-opacity">
                <ShoppingCartIcon />
              </div>
              <button
                onClick={() => navigate("/auth")}
                className="hover:opacity-70 transition-opacity"
              >
                <LoginIcon />
              </button>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-2 flex-1 justify-end">
            <SearchBar />
            <div className="cursor-pointer hover:opacity-70 transition-opacity">
              <ShoppingCartIcon />
            </div>
            <button
              onClick={() => navigate("/auth")}
              className="hover:opacity-70 transition-opacity"
            >
              <LoginIcon />
            </button>
            <NavBar items={items} isMobile={true} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
