import React from 'react'
import { getProductById } from '@/services/product.service';
import Image from 'next/image';
import AddtoCartButton from '@/app/component/AddtoCartButton';




export default async function page({params}) {

    const product = await getProductById(params.id)
   
 

  return (
    <div className='max-w-4xl mx-auto mt-12 px-4 sm:px-6 lg:px-8'>
    <div className='flex flex-col md:flex-row md:space-x-8'>
      <div className='md:w-1/2'>
        <Image 
          src={product.imageUrl} 
          alt={product.name} 
          width={500} 
          height={500} 
          className='rounded-lg shadow-md object-cover w-full h-auto'
        />
      </div>
      <div className='md:w-1/2 mt-8 md:mt-0'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>{product.name}</h1>
        <p className='text-gray-600 text-lg mb-6'>{product.description}</p>
        <p className='text-2xl font-bold text-green-600 mb-6'>${product.price.toFixed(2)}</p>
        <AddtoCartButton 
          itemId={product._id} 
          quantity={1}
          className='w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
        />
      </div>
    </div>
  </div>
  )
}
