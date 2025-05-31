import type { Order, Product } from '../../utils';
import { FTable, SearchBar, OrderDialog } from '../../component';
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getMethod, postMethod, deleteMethod } from "../../utils/api.ts";

const headers = [
    { name: 'id', text: 'ID' },
    { name: 'name', text: 'Product name' },
    { name: 'quantity', text: 'Quantity' },
    { name: 'amount', text: 'Amount' },
    { name: 'action', text: 'Delete' }
];

export default () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [curOrder, setCurOrder] = useState<Order>({
        id: '',
        product_id: '',
        quantity: '',
        amount: '',
    });
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([])

    const onAdd = () => {
        setCurOrder({
            id: '',
            product_id: '',
            quantity: '',
            amount: '',
        });
        setIsOpenDialog(true);
    };

    const onSave = async () => {
        setIsOpenDialog(false);

        const maxId = orders.reduce((max, o) => {
            const num = parseInt(o.id, 10);
            return isNaN(num) ? max : Math.max(max, num);
        }, 0);
        const newId = (maxId + 1).toString();

        const newOrder = {
            ...toBody(),
            id: newId,
        };

        const savedOrder = await postMethod('/orders', newOrder);
        setOrders([...orders, savedOrder]);
    };


    const toBody = () => ({
        product_id: curOrder.product_id,
        quantity: curOrder.quantity,
        amount: curOrder.amount,
    });

    const onMounted = async () => {
        const [ordersData, productData] = await Promise.all([
            getMethod('/orders/'), getMethod('/products')
        ])
        setOrders(ordersData)
        setProducts(productData)
    }

    const onDelete = async (id: string) => {
        const result = await deleteMethod(`/orders/${id}`);
        if (result) {
            setOrders(ord => ord.filter(o => o.id !== id));
        }
    };

    useEffect(() => {
        onMounted();
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Orders</h1>
            <Box className={'container'}>
                <SearchBar onAdd={onAdd} />
                <FTable
                    headers={headers}
                    rows={orders}
                    onDelete={onDelete}
                />
                <OrderDialog
                    order={curOrder}
                    products={products}
                    setCurOrder={setCurOrder}
                    onSave={onSave}
                    isOpen={isOpenDialog}
                    onClose={() => setIsOpenDialog(false)}

                />
            </Box>
        </>
    );
};
