"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import CartForm from './CartForm';

export default function ProductActions({productId}:{productId:string}) {

    // const router = useRouter();
    // const addToCart = ()=>{
    //     router.push('/cart')
    // }
  return (
    <div>
        <CartForm  productId={productId} />

      
    </div>
  )
}
