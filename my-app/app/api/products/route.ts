import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Product } from '@/models';

export async function GET(request: Request) {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  await dbConnect();
  const newProduct = await request.json();
  const product = await Product.create(newProduct);
  return NextResponse.json(product, { status: 201 });
}