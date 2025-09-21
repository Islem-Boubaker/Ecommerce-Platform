import SearchBar from "./UI/searchBar";
import LoginIcon from "./UI/loginIcon";
import ShoppingCartIcon from "./UI/shoppingCartIcon";
import NavBar from "./NavBar";
import EcommerceLogo from "./UI/ecommerceLogo";

function Header({ items }) {
    return (
        <header className="w-full bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 h-18 flex items-center gap-3">
                {/* Left - Logo */}
                <div className="shrink-0">
                    <EcommerceLogo />
                </div>

                {/* Center - NavBar (desktop/laptop only) */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <NavBar items={items} />
                </div>

                {/* Right cluster - Search, Icons, and NavBar button on mobile/tablet */}
                <div className="flex items-center gap-3 ml-auto">
                    <SearchBar />
                    <div className="flex items-center gap-2">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                if (window.matchMedia('(min-width: 1024px)').matches) return; // lg and up do nothing
                                window.dispatchEvent(new Event('open-nav-drawer'));
                            }}
                        >
                            <ShoppingCartIcon />
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                if (window.matchMedia('(min-width: 1024px)').matches) return; // lg and up do nothing
                                window.dispatchEvent(new Event('open-nav-drawer'));
                            }}
                        >
                            <LoginIcon />
                        </div>
                    </div>
                    {/* Mobile/Tablet Nav trigger at far right */}
                    <div className="lg:hidden">
                        <NavBar items={items} />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;