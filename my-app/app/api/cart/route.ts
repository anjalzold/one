import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { Cart } from '@/models';
import mongoose from 'mongoose';


interface CartItem{
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
}
export async function GET(request: Request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  return NextResponse.json(cart || { userId, items: [] });
}

export async function POST(request: Request) {
  await dbConnect();
  const { userId, productId, quantity } = await request.json();
  
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  
  const existingItem = cart.items.find((item: CartItem) => item.productId.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  
  await cart.save();
  return NextResponse.json(cart);
}