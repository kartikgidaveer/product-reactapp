import { useState } from 'react';

// ProductForm lets you add a new product
function ProductForm({ onSubmit, onCancel }) {
  // State for form fields and errors
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  // Validate form fields
  function validateForm() {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        category: formData.category.trim(),
        image: formData.image.trim()
      });
      // Reset form
      setFormData({ title: '', price: '', description: '', category: '', image: '' });
    }
  }

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow border border-gray-200 max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-bold text-gray-900 mb-2">Add Product</h3>
      {/* Title */}
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Title"
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>
      {/* Price */}
      <div>
        <input
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Price"
        />
        {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
      </div>
      {/* Category */}
      <div>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Category"
        />
        {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
      </div>
      {/* Image URL */}
      <div>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Image URL"
        />
        {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
      </div>
      {/* Description */}
      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
          rows="2"
          placeholder="Description"
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
      </div>
      {/* Buttons */}
      <div className="flex space-x-2 pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
