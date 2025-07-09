'use client';

import { useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

export default function Scanner({ onDetect }) {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      //reader.readAsDataURL(file);

      reader.onload = async () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = async () => {
          const codeReader = new BrowserMultiFormatReader();
          const result = await codeReader.decodeFromImageElement(img);
          onDetect(result.getText());
        };

        img.onerror = () => {
          setError('Invalid image.');
        };
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error('[SCANNER ERROR]', err);
      setError('Failed to read barcode.');
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
