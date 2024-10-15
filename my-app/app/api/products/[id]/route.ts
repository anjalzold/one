import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const product = await Product.findById(params.id);
  
  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}