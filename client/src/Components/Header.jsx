import SearchBar from "./UI/searchBar";
import LoginIcon from "./UI/loginIcon";
import ShoppingCartIcon from "./UI/shoppingCartIcon";
import NavBar from "./NavBar";
import EcommerceLogo from "./UI/ecommerceLogo";

function Header({items}) {
    return (

        <div className="flex justify-between items-center   h-18 bg-white shadow-lg pl-2 pr-2 w-auto relative">
            {/* Left section - Logo */}
            <div className="header-left">
                <EcommerceLogo />
            </div>

            {/* Center section - Navigation */}
            <div className="header-center">
                <NavBar items={items} />
            </div>

            {/* Right section - Search and Icons */}
            <div className="header-right flex gap-2">
                <SearchBar />
                <div className="flex gap-2  items-center">
                    <ShoppingCartIcon />
                    <LoginIcon />
                </div>
            </div>
        </div>
    );
}

export default Header;