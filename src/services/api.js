const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts() {
  const response = await fetch(API_URL);
  const products = await response.json();
  return products;
}

export function addProduct(product) {
  return {
    id: Date.now(),
    ...product,
    rating: { rate: 0, count: 0 }
  };
}

export function updateProduct(id, product) {
  return {
    id,
    ...product
  };
}

export function deleteProduct(id) {
  return id;
}
