import Link from 'next/link'
import React from 'react'


async function getOrders(){
    return[
        {id:1,name:"order 1",total:10},
        {id:2,name:"order 2",total:20},
        {id:3,name:"order 3",total:30},
    ]
}
export default async function page() {
    const orders = await getOrders()
  return (
    <div>
        <h1>Your Orders</h1>
        {orders.map((order)=>(
            <div key={order.id}>
                <p>{order.name}</p>
                <p>{order.total}</p>
                <Link href={`/orders/${order.id}`}>View</Link>
            </div>
        ))}
        
    </div>
  )
}
