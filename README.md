# Product Management System (Beginner Friendly)

## About This Project

This is a beginner-friendly React project for managing products. It demonstrates modern React development practices with CRUD operations, search functionality, and pagination using React 19, Vite 7, and Tailwind CSS.

A simple React app to manage products with a clean, responsive interface. You can view, add, edit, delete, and search products with real-time filtering and pagination support.

## Features

- **View Products**: Display products in a responsive table format
- **Add Products**: Create new products with form validation
- **Edit Products**: Inline editing with save/cancel options
- **Delete Products**: Remove products with confirmation dialog
- **Search**: Real-time search by title, category, or description
- **Pagination**: Navigate through products with page controls
- **Loading States**: Loading spinner and error message handling
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19** - Latest React with hooks and modern patterns
- **Vite 7** - Fast development server and build tool
- **Tailwind CSS** - Utility-first CSS framework (via @tailwindcss/vite)
- **ESLint 9** - Code linting and formatting

## Project Structure

```
src/
   components/
      ProductTable.jsx    # Table of products
      ProductRow.jsx      # Each product row
      ProductForm.jsx     # Add product form
      SearchBar.jsx       # Search box
   services/
      api.js              # API functions
   App.jsx               # Main app
   index.css             # Tailwind import
   main.jsx              # App entry point
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Opens at http://localhost:5173

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Development Commands

- **Lint entire project:**
  ```bash
  npm run lint
  ```

- **Lint a specific file:**
  ```bash
  npm run lint -- src/components/ProductTable.jsx
  # Or directly:
  npx eslint src/components/ProductTable.jsx
  ```

- **Auto-fix lint issues:**
  ```bash
  npx eslint . --fix
  ```

## How to Use

- Products load automatically from the Fake Store API
- Click "Add Product" to add a new product
- Click "Edit" to change a product, then "Save" or "Cancel"
- Click "Delete" to remove a product (with confirmation)
- Use the search box to filter products
- Use pagination controls at the bottom of the product table to navigate between pages of products

## Architecture Overview

### Application Entry Point
- `index.html` → `src/main.jsx` → `App.jsx`
- React.StrictMode wrapper for development
- Tailwind CSS loaded via `src/index.css`

### Data Layer (`services/api.js`)
- **fetchProducts()**: Fetches product list from Fake Store API
- **addProduct(product)**: Returns new object with generated ID (local only)
- **updateProduct(id, product)**: Returns merged object (local only)

### State Management (`src/App.jsx`)
- Local state only: products, filteredProducts, searchTerm, showForm, loading, error, pagination
- Search functionality filters by title, category, or description
- Pagination with 10 products per page
- Optimistic updates for add/edit/delete operations

### Component Structure
- **SearchBar**: Controlled input with real-time filtering
- **ProductForm**: Form validation and new product creation
- **ProductTable**: Renders paginated product list
- **ProductRow**: Individual product with inline edit/delete functionality

## API Information

- **Data Source**: [Fake Store API](https://fakestoreapi.com/products/)
- **Behavior**: Initial data fetched from API
- **Mutations**: Add, edit, and delete operations are simulated locally (not persisted to server)
- **Pagination**: Client-side pagination with 10 items per page

## Notes

- No test framework is currently configured (Jest/Vitest not present)
- All styling uses Tailwind CSS utility classes with dark mode variants
- No server-side persistence - all changes are local to the browser session
