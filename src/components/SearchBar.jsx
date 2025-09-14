// SearchBar lets you search products
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search products..."
      className="w-full px-4 py-2
                 border border-gray-300 dark:border-gray-600 rounded-md 
               bg-white dark:bg-gray-900 
               text-gray-900 dark:text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchBar;
