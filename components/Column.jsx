'use client';

import React from 'react';
import SortableItem from './SortableItem';
import { useDroppable } from '@dnd-kit/core';
import { useStore } from '@/lib/store';

export default function Column({ category, products }) {
  const { setCategory } = useStore();
  const { setNodeRef } = useDroppable({ id: category });

  return (
    <div
      ref={setNodeRef}
      className="bg-white w-72 flex-shrink-0 rounded-lg shadow-md p-4 border border-gray-200"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
        {category}
      </h2>

      <div className="space-y-3">
        {products.map((product) => (
          <SortableItem key={product._id} id={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
