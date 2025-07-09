// ✅ PHASE 10: Analytics Dashboard ------------------
// We'll create a dashboard that shows:
// - Total products
// - Total categories
// - Category-wise product counts (bar chart)

// 1. Create a new page at /app/dashboard/page.js

'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const grouped = res.products.reduce((acc, curr) => {
            acc[curr.category] = acc[curr.category] + 1 || 1;
            return acc;
          }, {});

          const chartData = Object.keys(grouped).map((cat) => ({
            category: cat,
            count: grouped[cat],
          }));

          setData(chartData);
          setTotal(res.products.length);
          setCategories(Object.keys(grouped).length);
        }
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">📊 Inventory Analytics</h1>

      <div className="grid grid-cols-2 gap-4 mb-10 text-center">
        <div className="bg-blue-100 rounded-lg py-6 shadow">
          <p className="text-lg font-semibold">Total Products</p>
          <h2 className="text-3xl font-bold text-blue-800">{total}</h2>
        </div>
        <div className="bg-green-100 rounded-lg py-6 shadow">
          <p className="text-lg font-semibold">Categories</p>
          <h2 className="text-3xl font-bold text-green-800">{categories}</h2>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
