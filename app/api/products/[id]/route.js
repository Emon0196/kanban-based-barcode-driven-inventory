import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';

export async function GET(req, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) {
      return Response.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ success: true, product });
  } catch (error) {
    console.error('[GET /products/:id]', error);
    return Response.json({ success: false, error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { category } = body;

    if (!category) {
      return Response.json({ success: false, error: 'Category is required' }, { status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(params.id, { category }, { new: true });

    if (!updated) {
      return Response.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ success: true, product: updated });
  } catch (error) {
    console.error('[PUT /products/:id]', error);
    return Response.json({ success: false, error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deleted = await Product.findByIdAndDelete(params.id);

    if (!deleted) {
      return Response.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return Response.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('[DELETE /products/:id]', error);
    return Response.json({ success: false, error: 'Failed to delete product' }, { status: 500 });
  }
}
