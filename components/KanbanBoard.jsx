'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { useDroppable } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';

export default function KanbanBoard() {
  const {
    categories,
    products,
    setProducts,
    moveProductToCategory,
    addCategory,
    fetchProducts,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  useEffect(() => {
    fetchProducts().finally(() => setLoading(false));
  }, [fetchProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const findCategoryByProductId = (id) => {
    return products.find((p) => p._id === id)?.category || null;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setActiveCategory(findCategoryByProductId(event.active.id));
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveCategory(null);

    if (!over) return;

    const overCategory = over.id;

    if (active.id !== null && overCategory !== activeCategory) {
      moveProductToCategory(active.id, overCategory);
      await fetch(`/api/products/${active.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: overCategory }),
      });
    }
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (!categories.includes(trimmed)) {
      addCategory(trimmed);
    }
    setNewCategoryName('');
  };

  return (
    <div className="pb-10">
      {/* Top Controls */}
      <div className="flex flex-wrap justify-center items-center gap-4 px-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="border px-3 py-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Add Category */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="New Category"
            className="border px-3 py-2 rounded"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto px-4">
            {categories.map((category) => (
              <DroppableColumn
                key={category}
                id={category}
                products={filteredProducts.filter(
                  (p) => p.category === category
                )}
              />
            ))}
          </div>
        </DndContext>
      )}
    </div>
  );
}

function DroppableColumn({ id, products }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext
      id={id}
      items={products.map((p) => p._id)}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="bg-white rounded-xl border border-gray-200 shadow-md w-72 flex-shrink-0 p-4 min-h-[700px] min-w-[400px]"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-3 capitalize tracking-wide">
          {id}
        </h2>

        {products.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No matching products</p>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <SortableItem
                key={product._id}
                id={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </SortableContext>
  );
}
