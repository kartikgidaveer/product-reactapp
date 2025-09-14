

# Product Management System (Beginner Friendly)

## About This Project

This is a newly created React project for managing products. It is designed to be beginner-friendly and demonstrates basic CRUD operations, search functionality, and modern React development practices using Vite and Tailwind CSS.



A simple React app to manage products. You can view, add, edit, delete, and search products. All styling is done with Tailwind CSS.

## Features

- View products in a table
- Add new products
- Edit products inline
- Delete products
- Search products by title, category, or description
- Pagination for product list
- Loading spinner and error messages

## Tech Stack

- React (with hooks)
- Vite (for fast development)
- Tailwind CSS (for styling)

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

1. Install dependencies:
    ```bash
    npm install
    ```
2. Start the app:
    ```bash
    npm run dev
    ```
3. Open your browser at `http://localhost:5173`

## How to Use

- Products load automatically from the Fake Store API
- Click "Add Product" to add a new product
- Click "Edit" to change a product, then "Save" or "Cancel"
- Click "Delete" to remove a product (with confirmation)
- Use the search box to filter products
- Use pagination controls at the bottom of the product table to navigate between pages of products

## API Info

Products are fetched from [Fake Store API](https://fakestoreapi.com/products/). Adding, editing, and deleting are simulated in your browser (not sent to the API).
