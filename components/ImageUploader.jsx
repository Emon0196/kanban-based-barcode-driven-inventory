'use client';

import { useState } from 'react';

export default function ImageUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/cloudinary', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.success) {
      onUpload(data.url); // Return URL to parent
    } else {
      alert('Image upload failed.');
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
    </div>
  );
}
