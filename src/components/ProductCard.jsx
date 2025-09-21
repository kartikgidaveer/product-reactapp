import { useState } from "react";
import { updateProduct } from "../services/api";

function ProductCard({ product, allProducts, setProducts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
  });

  const formatCurrency = (value) => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }).format(value ?? 0);
    } catch (_) {
      return `₹${value}`;
    }
  };

  function handleSave() {
    const updatedProduct = updateProduct(product.id, editData);
    setProducts(
      allProducts.map((p) => (p.id === product.id ? { ...p, ...updatedProduct } : p))
    );
    setIsEditing(false);
  }

  function handleCancel() {
    setEditData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
    });
    setIsEditing(false);
  }

  function handleInputChange(field, value) {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleDelete() {
    setProducts(allProducts.filter((p) => p.id !== product.id));
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="flex gap-4 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
                placeholder="Title"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={editData.price}
                  onChange={(e) => handleInputChange("price", parseFloat(e.target.value || 0))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
                  placeholder="Price"
                />
                <input
                  type="text"
                  value={editData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
                  placeholder="Category"
                />
              </div>
              <textarea
                value={editData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white text-sm"
                rows={3}
                placeholder="Description"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                {product.title}
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {formatCurrency(product.price)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {product.category}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 px-4 pb-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
