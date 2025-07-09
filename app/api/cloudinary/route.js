import cloudinary from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file'); // 'file' should be the input name

    if (!file) {
      return Response.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'inventory-kanban' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    return Response.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('[CLOUDINARY_UPLOAD_ERROR]', error);
    return Response.json({ success: false, error: 'Failed to upload image' }, { status: 500 });
  }
}
