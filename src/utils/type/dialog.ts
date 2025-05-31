import type {Order, Product} from "./common.ts";

export interface DialogProp {
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    width?: number
    children?: any
}


export interface ProductDialogProp extends DialogProp {
    product: Product
    setProduct: (product: Product) => void
}

export interface CustomerDialogProp extends DialogProp {
    order: Order
    setCustomer: (order: Order) => void
}