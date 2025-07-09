'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import KanbanBoard from './KanbanBoard';
import SortableItem from './SortableItem';
//import AddProductModal from './AddProductModal';

export default function KanbanPageClient() {
const { fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <>
      <KanbanBoard />

    </>
  );
}
