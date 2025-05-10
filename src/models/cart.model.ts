export interface CartProduct {
    productId: string;
    quantity: number;
}

export interface Cart {
    id?: number;
    user: string;
    products: CartProduct[];
}
