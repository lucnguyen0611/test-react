export interface Header {
    name: string
    text: string
    displayProperty?: string
}

interface Master {
    id?: string
    name: string
}

export interface Product extends Master {
    price: number | null
    remaining: number | null
}

export interface Order {
    // product: Product | null;
    id?: string
    product_id: string
    quantity: number | string
    amount: number | string,
}
