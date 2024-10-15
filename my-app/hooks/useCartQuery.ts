import { getCart, removeItemFromCart, updateItemQuantity } from "@/services/cart.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useCartQuery = (accessToken: string) => {

    return useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart(accessToken),
    });
}

export const useUpdateCartItemMutation = (accessToken: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:({itemId, quantity}: {itemId: string, quantity: number})=> updateItemQuantity({itemId, quantity, accessToken}),
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });
}

export const useDeleteCartItemMutation = (accessToken: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({productId}: {productId: string})=>removeItemFromCart({productId, accessToken}),
        onSuccess: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    })
}

