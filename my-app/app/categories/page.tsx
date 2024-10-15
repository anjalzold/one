import Link from 'next/link'
import React from 'react'


async function getCategories(){
    return ["category 1","category 2","category 3"]
}
export default async function page() {
    const category = await getCategories()

  return (
    <div>
        <h1>Product Category</h1>

<h2></h2>ddds

        {category.map((cat)=>(
            <div key={cat}>
<Link href={`/categories/${cat.toLocaleLowerCase()}`}>{cat}</Link>
            </div>
        ))}

    </div>
  )
}
