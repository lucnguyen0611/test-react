import DialogContainer from '../../Dialog/Container/index.tsx';
import { Stack, TextField, Autocomplete } from "@mui/material"
import type { CustomerDialogProp, Product } from "../../utils/types"

export default function OrderDialog({ isOpen, onClose, order, setCurOrder, onSave, products }: CustomerDialogProp) {
    // Tìm product object từ product_id để hiển thị trong Autocomplete
    const selectedProduct = products.find((p) => p.id === order.product_id) || null

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        if (name === "quantity") {
            // Tính toán amount dựa trên quantity và giá sản phẩm đã chọn
            const product = products.find((p) => p.id === order.product_id)
            const amount = product ? (Number(value) * Number(product.price)).toString() : ""
            setCurOrder({
                ...order,
                quantity: value,
                amount,
            })
        } else {
            setCurOrder({ ...order, [name]: value })
        }
    }

    const onProductChange = (_event: any, newValue: Product | null) => {
        if (newValue) {
            // Khi chọn sản phẩm, lưu product_id và tính lại amount
            const amount = order.quantity ? (Number(order.quantity) * Number(newValue.price)).toString() : ""

            setCurOrder({
                ...order,
                product_id: newValue.id, // Lưu ID thay vì object
                amount,
            })
        } else {
            // Khi bỏ chọn sản phẩm
            setCurOrder({
                ...order,
                product_id: "",
                amount: "",
            })
        }
    }

    return (
        <DialogContainer isOpen={isOpen} onClose={onClose} onSave={onSave}>
            <Stack sx={{ width: 450 }} spacing={2}>
                <Autocomplete
                    fullWidth
                    disablePortal
                    options={products}
                    getOptionLabel={(option: Product) => option.name}
                    value={selectedProduct} // Hiển thị product được chọn dựa trên product_id
                    onChange={onProductChange}
                    renderInput={(params) => <TextField {...params} label="Product Name" />}
                />
                <TextField
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    variant="standard"
                    value={order.quantity}
                    onChange={onChange}
                />
                <TextField
                    fullWidth
                    name="amount"
                    label="Amount"
                    variant="standard"
                    value={order.amount}
                    disabled
                />
            </Stack>
        </DialogContainer>
    )
}

