"use client"
import { useCartQuery } from '@/hooks/useCartQuery'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function Navbar() {
  const {items,setCartData} = useCartStore()
  const { accessTkn, clearTokens } = useAuthStore();
  const {data} = useCartQuery(accessTkn)
  const cartItemCount = items?.length || 0; // Ensure items is defined



  useEffect(() => {
    if(data){
      console.log("Fetched Cart Data:", data.cart);
    setCartData({ items: data.cart?.items, cartTotal: data.cart?.cartTotal })
    }
  }, [data])
  console.log("Cart Items:", items);

  return (
    <nav className='bg-white shadow-md'>
  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
    <div className='flex justify-between h-16'>
      <div className='flex space-x-8'>
        <Link href={"/"} className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600'>
          Home
        </Link>
        <Link href={"/products"} className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600'>
          Products
        </Link>
        <Link href={"/categories"} className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600'>
          Categories
        </Link>
        <Link href={"/orders"} className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-600'>
          Orders
        </Link>
      </div>
      <div className='flex items-center'>
        <Link href={"/cart"} className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
          Cart {cartItemCount > 0 ? <span className='ml-2 bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold'>{cartItemCount}</span> : ''}
        </Link>
      </div>
    </div>
  </div>
</nav>
  )
}
