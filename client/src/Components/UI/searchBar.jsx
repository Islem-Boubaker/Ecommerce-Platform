import { AiOutlineSearch } from "react-icons/ai";
import { TextInput } from "flowbite-react";

function SearchBar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching…");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full md:w-auto"
    >
      <div className="relative">
        <TextInput
          placeholder="Search..."
          type="text"
          className="hidden md:block max-w-100 pl-40 pr-10 rounded-2xl" 
          color="white"
          
          
        />

        {/* search icon as button */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <AiOutlineSearch size={20} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
