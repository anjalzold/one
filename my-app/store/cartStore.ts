import { create } from "zustand"
// import { persist } from "zustand/middleware"

interface cartItem{
    product:{
        _id: string
        price: number
        inventory: number
        name: string
        mainImage: {url: string }

    },
    quantity: number
}

interface cartStore{
    items: cartItem[]
    subtotal: number
    setCartData: (data: { items: cartItem[]; cartTotal: number }) => void
    calculateSubtotal: () => void
    updateLocalItemQuantity: (productId: string, newQuantity: number) => void
    deleteItemFromCart: (productId: string) => void
}

export const useCartStore = create<cartStore>((set, get) => ({
    items: [],
    subtotal:0,
    setCartData:(data)=>{
        set({
            items: data.items,
            subtotal: data.cartTotal
        })
    },
    calculateSubtotal:()=>{
        const subtotal = get().items.reduce((total, item) => total + item.product.price * item.quantity, 0)
        set({subtotal})

    },
    updateLocalItemQuantity: (productId,newQuantity)=>{
        set((state) => ({
            items: state.items.map((item)=>(
                item.product._id === productId?{...item,quantity:newQuantity}:item

            ))
        }))
        get().calculateSubtotal()
    },
    deleteItemFromCart: (productId)=>{
        set((state) => ({
            items: state.items.filter((item)=> item.product._id !== productId)
        }))
        get().calculateSubtotal()
    }
    }
))