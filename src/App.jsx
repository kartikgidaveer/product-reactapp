// Import React and components
import { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchBar';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './services/api';


function App() {
  // State for products and UI
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  // Load products from API when app starts
  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const apiProducts = await fetchProducts();
        setProducts(apiProducts);
        setFilteredProducts(apiProducts);
      } catch (err) {
        setError('Failed to load products.');
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  // Filter products when search changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, products]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Add a new product
  async function handleAddProduct(productData) {
    const newProduct = await addProduct(productData);
    setProducts([newProduct, ...products]);
    setShowForm(false);
  }

  // Update a product
  async function handleUpdateProduct(productId, productData) {
    const updatedProduct = await updateProduct(productId, productData);
    setProducts(products.map(product =>
      product.id === productId ? { ...product, ...updatedProduct } : product
    ));
  }

  // Delete a product
  async function handleDeleteProduct(productId) {
    await deleteProduct(productId);
    setProducts(products.filter(product => product.id !== productId));
  }

  // Handle search input
  function handleSearchChange(value) {
    setSearchTerm(value);
  }

  // Show the add product form
  function handleShowForm() {
    setShowForm(true);
    setError(null);
  }

  // Hide the add product form
  function handleCancelForm() {
    setShowForm(false);
  }

  // Pagination controls
  function handlePageChange(page) {
    setCurrentPage(page);
  }

  // Show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Product Management System
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Manage your products with full CRUD operations and search functionality
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-4">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div className="flex-1  max-w-sm">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
          <div>
            <button
              onClick={handleShowForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-blue-500/50"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="mb-8">
            <ProductForm onSubmit={handleAddProduct} onCancel={handleCancelForm} />
          </div>
        )}

        {/* Products Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing {paginatedProducts.length} of {filteredProducts.length} products (Page {currentPage} of {totalPages})
          </p>
        </div>

        {/* Product Table */}
        <ProductTable
          products={paginatedProducts}
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded font-medium transition-colors ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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
