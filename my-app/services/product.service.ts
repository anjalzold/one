export const getProduct = async () =>{
    const response = await fetch(("http://localhost:4000/api/products"))
    return response.json()
}

export const getProductById = async (id:string) =>{
    const response = await fetch(("http://localhost:4000/api/products/"+id))
    return response.json()

    
}