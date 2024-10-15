"use client"
import React from 'react';
import { useCartQuery, useDeleteCartItemMutation, useUpdateCartItemMutation } from '@/hooks/useCartQuery';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
    const { accessTkn } = useAuthStore();
    const { data: cartData, isLoading, isError } = useCartQuery(accessTkn);
    const { deleteItemFromCart } = useCartStore();
    const deleteCartItemMutation = useDeleteCartItemMutation(accessTkn);
    const updateCartItemMutation = useUpdateCartItemMutation(accessTkn);

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (isError) return <div className="flex justify-center items-center h-screen">Error loading cart</div>;

    const cartItems = cartData?.cart?.items ?? [];

    const handleCartDelete = (productId: string) => {
        deleteCartItemMutation.mutate({productId}, {
            onSuccess: () => {     
                deleteItemFromCart(productId);
                console.log("Item deleted successfully");
            },
            onError: (error) => {
                console.log("Error deleting item:", error);
            }
        });
    };

    const handleQuantityItem = (itemId: string, quantity: number) => {
        updateCartItemMutation.mutate({itemId, quantity}, {
            onSuccess: () => {
                console.log("Item quantity updated successfully");
            },
            onError: (error) => {
                console.log("Error updating item quantity:", error);
            }
        });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            {cartItems.length > 0 ? (
                <div className="space-y-8">
                    {cartItems.map((item, index) => {
                        const product = item.product;
                        return (
                            <div key={index} className="flex items-center border-b border-gray-200 py-4">
                                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900">{product.name}</h2>
                                        <p className="mt-1 text-sm text-gray-500">${product.price.toFixed(2)}</p>
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                        <div className="flex items-center">
                                            <button onClick={() => handleQuantityItem(product._id, Math.max(1, item.quantity - 1))} className="text-gray-500 focus:outline-none focus:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 12H4"></path></svg>
                                            </button>
                                            <span className="mx-2 text-gray-700">{item.quantity}</span>
                                            <button onClick={() => handleQuantityItem(product._id, item.quantity + 1)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                                                <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4"></path></svg>
                                            </button>
                                        </div>
                                        <button onClick={() => handleCartDelete(product._id)} className="mt-4 text-sm font-medium text-red-600 hover:text-red-500">Remove</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">Total:</span>
                            <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
                        </div>
                        <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Your cart is empty</p>
            )}
        </div>
    );
}