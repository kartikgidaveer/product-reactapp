// Import the ProductRow component
import ProductRow from './ProductRow';

// ProductTable shows all products in a table
function ProductTable({ products, onUpdate, onDelete }) {
  // If there are no products, show a message
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-lg">
        No products found. Try searching or add a new product.
      </div>
    );
  }

  // Show the table of products
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Image</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Render each product row */}
          {products.map(product => (
            <ProductRow
              key={product.id}
              product={product}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
