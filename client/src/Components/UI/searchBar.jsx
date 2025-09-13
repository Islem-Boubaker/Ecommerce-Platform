import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="relative m-5 w-auto">
     
   
        <Search size={20} className="h-5 w-5 text-black text-4xl font-bold" />
    
      {/* <input
        type="text"
        name="search"
        placeholder="Search for products..."
        className="w-auto h-12 pl-14 pr-6 py-3 text-sm text-gray-700 placeholder-gray-400 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition-all duration-200"
      /> */}
    </div>
  );
}

export default SearchBar;