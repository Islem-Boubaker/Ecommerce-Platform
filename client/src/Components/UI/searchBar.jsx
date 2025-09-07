import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative m-5 w-full max-w-md">
     
      <span className="absolute inset-y-0 left-0 flex items-center pl-6">
        <Search size={20} className="h-5 w-5 text-gray-400" />
      </span>
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        className="w-100 h-12 pl-14 pr-6 py-3 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all duration-200"
      />
    </div>
  );
}

export default SearchBar;