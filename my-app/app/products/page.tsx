import { getProduct } from '@/services/product.service'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default async function ProductListingPage() {
    const products = await getProduct()

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="relative h-48">
                            <Image 
                                src={product.imageUrl} 
                                alt={product.name} 
                                layout="fill"
                                objectFit="cover"
                                className="transition-opacity duration-300 hover:opacity-75"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</p>
                                <Link 
                                    href={`/products/${product._id}`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}