'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import Scanner from '@/components/Scanner';

export default function ScanPage() {
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          barcode,
          imageUrl,
          category: 'Uncategorized',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg('✅ Product added!');
        setName('');
        setBarcode('');
        setImageUrl('');
      } else {
        setErrorMsg('❌ Failed to add product');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('❌ Error submitting product');
    }

    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Scan & Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

                {/* Barcode Image Scanner */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Firstly Scan from Uploaded Barcode Image to Retrive Data
          </label>
          <Scanner
            onDetect={async (value) => {
              setBarcode(value);
              alert('✅ Barcode scanned: ' + value);
//console.log('Scanned barcode value:', value);

try {
  const res = await fetch(`/api/scan?barcode=${value}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: Unable to fetch product`);
  }

  const result = await res.json();

  if (result?.status && result?.product?.description) {
    setName(result.product.description);
  } else {
    throw new Error('Product description not found in API response');
  }
} catch (err) {
  console.error('[Barcode API Error]', err);
  alert('⚠️ Could not fetch product info from barcode.');
}

            }}
          />
        </div>

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Barcode Field */}
        <input
          type="text"
          placeholder="Barcode"
          className="w-full border px-3 py-2 rounded"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          required
        />

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">
            Upload Product Image
          </label>
          <ImageUploader onUpload={(url) => setImageUrl(url)} />
        </div>

        {/* Show uploaded image preview */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            className="h-32 mt-2 rounded object-contain border"
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>

        {/* Success / Error Messages */}
        {successMsg && <p className="text-green-600 mt-2">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 mt-2">{errorMsg}</p>}
      </form>
    </div>
  );
}
