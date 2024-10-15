import React from 'react'

async function getOrdersDetails(orderId:any){
    return {
        id:orderId,
        name:orderId,
        total:10,
        date:"10/10/2022",
        items:[
            {id:1,name:"product 1",price:10},
            {id:2,name:"product 2",price:10}
        ]
    }
}

export default async function page({params}:any) 
{
    const order = await getOrdersDetails(params.id)


  return (
    <div>
        <h1>Order Details</h1>
        <p>Order Id: {order.id}</p>
        <p>Order Name: {order.name}</p>
        <p>Order Date: {order.date}</p>
        {order.items.map((item)=>(
            <div key={item.id}>
                <p>{item.name}</p>
                <p>{item.price}</p>
            </div>
        ))}
        <p>Order Total: {order.total}</p>

    </div>
  )
}
