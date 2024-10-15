import Link from 'next/link'
import React from 'react'
import CartPage from '../component/CartPage';


export default function page() {

  
  



  return (
    <div>
       <CartPage/>
        <Link href='/checkout'>Proceed to checkout</Link>
    </div>
  )
}
