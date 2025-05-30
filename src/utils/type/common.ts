export interface Header {
    name: string
    text: string
    displayProperty?: string
}

interface Master {
    id?: number
    name: string
}

export interface Color extends Master {}

export interface Employee extends Master{
    age: number | null
    address: string | null
    salary: number | null
    position: string | null
    status: string | null
}

export interface Product extends Master {
    price: number | null
    remaining: number | null
}

export interface Customer extends Master {
    companyName: string | null
    address: string | null
    description: string | null
}

export interface OrderDetail {
    productId: number,
    price: number,
    quantity: number
    amount: number,
    isValid: boolean
}