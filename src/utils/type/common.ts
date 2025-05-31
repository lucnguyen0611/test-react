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

export interface Order extends Master {
    quantity: number
    amount: number,
}
