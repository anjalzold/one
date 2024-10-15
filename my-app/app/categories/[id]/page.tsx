import Link from 'next/link'
import React from 'react'

async function getProductByCategory(id:any){
    return [
        {
        id,
        name:`product ${id}`,
        price:10,
        description:`product ${id}`},
    {
        id:2,
        name:"Product 2",
        description:"description 2",
    price:20}
]
}

export default async function page({params}:any) {
    const product = await getProductByCategory(params.id)

  return (
    <div>
        <h1>{params.id} Products</h1>
        {product.map((product)=>(
            <div className="">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>{product.price}</p>
                <Link href={`/products/${product.id}`}>View</Link>
            </div>
        ))}

    </div>
  )
}
