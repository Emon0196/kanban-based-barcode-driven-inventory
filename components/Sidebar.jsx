'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react'; // install lucide-react if not yet

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  // Close sidebar if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="fixed top-4 left-4 z-50 bg-white p-2 rounded shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar menu */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">📊 Inventory Menu</h2>
          <nav className="flex flex-col space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-blue-600">
              Home
            </Link>
            <Link href="/scan" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-blue-600">
              Scan & Add New Product
            </Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
