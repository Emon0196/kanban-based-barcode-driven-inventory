// app/api/scan/route.js

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const barcode = searchParams.get('barcode');

  if (!barcode) {
    return new Response(JSON.stringify({ error: 'Barcode is required' }), {
      status: 400,
    });
  }

  try {
    const res = await fetch(`https://products-test-aci.onrender.com/product/${barcode}`);
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product info' }), {
      status: 500,
    });
  }
}
