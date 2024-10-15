"use client"
import { useUpdateCartItemMutation } from '@/hooks/useCartQuery';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function AddtoCartButton({itemId,quantity = 1}: {itemId: string, quantity: number,className?: string}) {
    const {accessTkn} = useAuthStore();
    const addCartMutation = useUpdateCartItemMutation(accessTkn)
    const {setCartData} = useCartStore()
const router = useRouter();
    const handleAddToCart = (itemId: string,quantity: number) => {
        try{
          addCartMutation.mutate({itemId, quantity},{
            onSuccess: async (response) => {
              // Convert the response body to JSON
              const data = await response.json();
              console.log("Added to cart:", data);  // Here you can see the actual response data

              setCartData(data);

              // After success, redirect to cart page
              router.push('/cart');
          },
          onError: (error) => {
              console.log("Failed to add to cart", error);
          }
        });
        

        }catch(err){
            console.log(err)
        }
      
    }
  return (
    <div>
        <button onClick={() => handleAddToCart(itemId,quantity)} >        {addCartMutation.isLoading ? <p>Adding to cart...</p> : <p>Add to cart</p>}      
        </button>
    </div>
  )
}
