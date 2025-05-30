import type {Color, Customer, Employee, Product} from "./common.ts";

export interface DialogProp {
    isOpen: boolean
    onClose: () => void
    onSave: () => void
    width?: number
    children?: any
}

export interface EmployeeDialogProp extends DialogProp {
    employee: Employee
    setEmployee: (employee: Employee) => void
}

export interface ProductDialogProp extends DialogProp {
    product: Product
    setProduct: (product: Product) => void
}

export interface ColorDialogProp extends DialogProp {
    color: Color
    setColor: (color: Color) => void
}

export interface CustomerDialogProp extends DialogProp {
    customer: Customer
    setCustomer: (customer: Customer) => void
}