import SearchBar from "./UI/searchBar";
import LoginIcon from "./UI/loginIcon";
import ShoppingCartIcon from "./UI/shoppingCartIcon";
import NavBar from "./NavBar";
import EcommerceLogo from "./UI/ecommerceLogo";

function Header({ items }) {
    return (
        <header className="w-full bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-screen-xl mx-auto px-4 h-18 flex items-center gap-15 ">
                {/* Left - Logo */}
                <div className="shrink-0 order-1">
                    <EcommerceLogo />
                </div>

            
                <div className="order-3  lg:flex flex-1 justify-center lg:order-2">
                    <NavBar items={items} />
                </div>

                
                <div className="flex order-2 items-center gap-3 ml-auto lg:order-3 m-0 ">
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
                    
                </div>
            </div>
        </header>
    );
}

export default Header;