import { connectDB } from '@/lib/db';
import Product from '@/lib/models/Product';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const product = await Product.create(body);

    return Response.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error('[POST /products]', error);
    return Response.json({ success: false, error: 'Failed to create product' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });

    return Response.json({ success: true, products });
  } catch (error) {
    console.error('[GET /products]', error);
    return Response.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}
