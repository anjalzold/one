import { getProductById } from '@/services/product.service'
import { useCartStore } from '@/store/cartStore'
import React from 'react'

export default async function CartForm({productId}:{productId:string}) {
    const cart = useCartStore((state) => state.items)
    const cartItem = cart.find((item) => item.product._id === productId)
    const cartQuantity = cartItem ? cartItem.quantity : 0
    const updateQuantity = useCartStore(state=>state.updateLocalItemQuantity)
    const deleteItem = useCartStore(state=>state.deleteItemFromCart)
    const addItem = useCartStore(state=>state.setCartData)

    const handleIncrement = () => {
        updateQuantity(productId, cartQuantity + 1)
    }

    const product = await getProductById(productId)

    const handleDecrement = () => {
        if (cartQuantity > 0) {
            updateQuantity(productId, cartQuantity - 1)
        }
    }



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10)
        if (!isNaN(newQuantity) && newQuantity >= 0) {
            updateQuantity(productId, newQuantity)
        }
    }

  return (
    <div>
                <button onClick={()=>addItem(product)}>Add to cart</button>

        <button onClick={handleDecrement}>-1</button>
            <input 
                type="number" 
                name="quantity" 
                value={cartQuantity} 
                onChange={handleInputChange}
                min="0"
            />
            <button onClick={handleIncrement}>+1</button>

      


    </div>
  )
}
