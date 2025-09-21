import ProductRow from './ProductRow';
import ProductCard from './ProductCard';

function ProductTable({ products, allProducts, setProducts }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-lg">
        No products found. Try searching or add a new product.
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile: Card list */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            allProducts={allProducts}
            setProducts={setProducts}
          />
        ))}
      </div>

      {/* Desktop: Table */}
      <table className="hidden md:table min-w-full bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase">Image</th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase">Category</th>
            <th className="px-6 py-3 text-center text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase">Description</th>
            <th className="px-6 py-3 text-center text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-200 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              allProducts={allProducts}
              setProducts={setProducts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
