import { useState } from 'react';
import { updateProduct } from '../services/api';

function ProductRow({ product, allProducts, setProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category
  });

  function handleSave() {
    const updatedProduct = updateProduct(product.id, editData);
    setProducts(
      allProducts.map((p) =>
        p.id === product.id ? { ...p, ...updatedProduct } : p
      )
    );
    setIsEditing(false);
  }

  function handleCancel() {
    setEditData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category
    });
    setIsEditing(false);
  }

  function handleInputChange(field, value) {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function handleDelete() {
    setProducts(allProducts.filter((p) => p.id !== product.id));
  }

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <td>
        <img
          src={product.image}
          alt={product.title}
          className="h-12 w-12 rounded-lg object-cover mx-auto"
        />
      </td>

      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="text"
            value={editData.title}
            onChange={e => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
          />
        ) : (
          <span className="text-sm text-gray-900 dark:text-white">
            {product.title}
          </span>
        )}
      </td>

      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="number"
            value={editData.price}
            onChange={e => handleInputChange('price', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
          />
        ) : (
          <span className="text-sm text-gray-900 dark:text-white">
            ${product.price}
          </span>
        )}
      </td>

      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="text"
            value={editData.category}
            onChange={e => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
          />
        ) : (
          <span className="text-sm text-gray-900 dark:text-white capitalize">
            {product.category}
          </span>
        )}
      </td>

      <td className="px-6 py-4">
        {isEditing ? (
          <textarea
            value={editData.description}
            onChange={e => handleInputChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
            rows="2"
          />
        ) : (
          <span className="text-sm text-gray-900 dark:text-white">
            {product.description}
          </span>
        )}
      </td>
      
      {/* Actions: Edit, Delete, Save, Cancel */}
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default ProductRow;
