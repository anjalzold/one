export const getCart = async (accessToken: string) => {
    const response = await fetch("http://localhost:4000/api/cart", {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    return response.json()
}


export const removeItemFromCart = async ({productId, accessToken}: {productId: string, accessToken: string}) => {
    const response = await fetch(`http://localhost:4000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })
    return response
}

export const updateItemQuantity = async ({accessToken, itemId, quantity}: {accessToken: string, itemId: string, quantity: number}) => {
    const response = await fetch(`http://localhost:4000/api/cart/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            quantity
        })
    })
    return response
}