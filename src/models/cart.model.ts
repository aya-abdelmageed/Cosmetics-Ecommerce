export interface CartProduct {
    productId: number;
    quantity: number;
}

export interface Cart {
    id?: number;
    user: string;
    products: CartProduct[];
}
