'use client';

import React from 'react';
import {
  useSortable,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '@/lib/store'; // import Zustand store

const animateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export default function SortableItem({ id, product }) {
  const { removeProduct } = useStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, animateLayoutChanges });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
    zIndex: isDragging ? 50 : 1, // ✅ help fix ghosting
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '0.5rem',
    padding: '0.75rem',
    boxShadow: isDragging
      ? '0 8px 16px rgba(0,0,0,0.15)'
      : '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative', // for positioning delete button
  };

  const handleDelete = async () => {
    const confirmed = confirm(`Delete ${product.name}?`);
    if (!confirmed) return;

    const res = await fetch(`/api/products/${product._id}`, {
      method: 'DELETE',
    });

    const result = await res.json();
    if (result.success) {
      removeProduct(product._id);
    } else {
      alert('Failed to delete product');
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        title="Delete product"
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg leading-none"
        style={{ lineHeight: 1, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        &times;
      </button>

      <p className="font-medium text-gray-900">{product.name}</p>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-24 w-full object-contain mt-2 rounded"
        />
      )}
    </div>
  );
}
