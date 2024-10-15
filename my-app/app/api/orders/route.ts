import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Order } from '@/models';

export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  const orders = await Order.find({ userId });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  await dbConnect();
  const orderData = await request.json();
  
  const newOrder = await Order.create(orderData);
  return NextResponse.json(newOrder, { status: 201 });
}