import { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import { fetchProducts, addProduct } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const apiProducts = await fetchProducts();
        setProducts(apiProducts);
        setFilteredProducts(apiProducts);
      } catch (err) {
        setError("Failed to load products.");
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, products]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  function handleAddProduct(productData) {
    const newProduct = addProduct(productData);
    setProducts([newProduct, ...products]);
    setShowForm(false);
  }

  function handleSearchChange(value) {
    setSearchTerm(value);
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-800 dark:text-gray-200">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Product Management System
          </h1>
          <div className="flex-1 sm:max-w-sm order-2 sm:order-none">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </div>
          <div className="order-1 sm:order-none">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              Add Product
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 rounded-md p-4">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {showForm && (
          <div className="mb-6">
            <ProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        <div className="mb-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
            (Page {totalPages === 0 ? 0 : currentPage} of {totalPages})
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 sm:p-4">
          <ProductTable
            products={paginatedProducts}
            allProducts={products}
            setProducts={setProducts}
          />
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors${
                currentPage === 1 ? " opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Previous page"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-3 py-1 rounded font-medium transition-colors${
                  currentPage === i
                    ? " bg-blue-600 text-white"
                    : " bg-gray-200 text-gray-700 hover:bg-gray-400"
                }`}
                aria-current={currentPage === i ? "page" : undefined}
              >
                {i}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors${
                currentPage === totalPages ? " opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
