// API base URL for products
const API_URL = 'https://fakestoreapi.com/products';

// Get all products from the API
export async function fetchProducts() {
  const response = await fetch(API_URL);
  const products = await response.json();
  return products;
}

// Add a new product (local only)
export function addProduct(product) {
  return {
    id: Date.now(),
    ...product,
    rating: { rate: 0, count: 0 }
  };
}

// Update a product (local only)
export function updateProduct(id, product) {
  return {
    id,
    ...product
  };
}

// Delete a product (local only)
export function deleteProduct(id) {
  return id;
}
