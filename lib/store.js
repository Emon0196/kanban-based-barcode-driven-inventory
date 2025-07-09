// lib/store.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      categories: ['Uncategorized'],
      products: [],

      // Set full category list
      setCategories: (cats) => set({ categories: cats }),

      // Add new category
      addCategory: (cat) =>
        set((state) => ({
          categories: [...state.categories, cat],
        })),

      // Set products list
      setProducts: (products) => set({ products }),

      // Move product to a new category
      moveProductToCategory: (productId, newCategory) =>
        set((state) => {
          const products = state.products.map((p) =>
            p._id === productId ? { ...p, category: newCategory } : p
          );

          return { products };
        }),

      // Remove product by ID
      removeProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p._id !== productId),
        })),

      // Fetch products from API and auto-sync categories
      fetchProducts: async () => {
        try {
          const res = await fetch('/api/products');
          const data = await res.json();

          if (data.success) {
            const products = data.products;

            // Set products
            set({ products });

            // Extract categories
            const uniqueCategories = [
              ...new Set(products.map((p) => p.category || 'Uncategorized')),
            ];

            set({ categories: uniqueCategories });
          }
        } catch (err) {
          console.error('[FETCH PRODUCTS ERROR]', err);
        }
      },
    }),
    {
      name: 'kanban-store', // localStorage key
      skipHydration: true,  // optional: prevents hydration issues
    }
  )
);
