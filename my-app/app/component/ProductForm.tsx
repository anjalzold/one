"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'




const productSchema = z.object({
    name: z.string().min(5, "Name is required"),
    description: z.string().min(4, "Description must be at least 10 characters"),
    price: z.string().min(1, "Price is required").transform(Number),
    image: z.any().refine((files) => files?.length === 1, "Image is required"), 
    inventory: z.string().min(1, "Inventory is required").transform(Number),
  });
  

type Product = z.infer<typeof productSchema>




export default function ProductForm() {
    const {register, handleSubmit, formState: {errors},reset} = useForm<Product>({
        resolver: zodResolver(productSchema)
    })
    const onSubmit = async (data:Product)=>{
        const formData =new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price.toString());
        if (data.image && data.image[0]) {
          formData.append('image', data.image[0]);
        }
        formData.append('inventory', data.inventory.toString());
        const res =await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            console.log("data posted");
            reset(); // Reset the form after successful submission
        } else {
            console.error("Failed to post data");
        }
    }

  return (
    <div>
        <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-md mx-auto mt-12 border border-solid border-black p-8 gap-3'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" {...register('name')} className='ring-1 ring-offset-1 ring-gray-500' />
            {errors.name && <p>{errors.name.message}</p>}
            <label htmlFor="description">Description</label>
            <input type="text" id="description" {...register('description')} className='ring-1 ring-offset-1 ring-gray-500'/>
            {errors.description && <p>{errors.description.message}</p>}
            <label htmlFor="price">Price</label>
            <input type="text" id="price" {...register('price')} className='ring-1 ring-offset-1 ring-gray-500' />    
                    {errors.price && <p>{errors.price.message}</p>}
            <label htmlFor="image">Image Url</label>
            <input type="file" id="image" {...register('image')} />
            {errors.image && <p>{errors.image.message?.toString()}</p>}
                                    <label htmlFor="inventory">Inventory</label>
            <input type="text" id="inventory" {...register('inventory')} className='ring-1 ring-offset-1 ring-gray-500'/>       
                 {errors.inventory && <p>{errors.inventory.message}</p>}
            <button type="submit">Submit</button>
            <button type="button" onClick={()=>reset()}>Reset</button>
        </form>

      
    </div>
  )
}
