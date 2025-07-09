'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

export default function AddProductModal({ open, onClose }) {
  const { categories, setProducts } = useStore();
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!open) {
      setName('');
      setBarcode('');
      setCategory('Uncategorized');
      setImageUrl('');
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, barcode, category, imageUrl }),
    });

    const data = await res.json();
    if (data.success) {
      setProducts((prev) => [...prev, data.product]);
      onClose();
    }
  }

  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Barcode (optional)"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded"
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="url"
              placeholder="Image URL (Cloudinary)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
