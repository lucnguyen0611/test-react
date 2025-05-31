import type { Order } from '../../utils';
import { FTable, SearchBar, OrderDialog } from '../../component';
import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { getMethod, postMethod, putMethod, deleteMethod } from "../../utils/api.ts";

const headers = [
    { name: 'id', text: 'ID' },
    { name: 'name', text: 'Product name' },
    { name: 'quantity', text: 'Quantity' },
    { name: 'amount', text: 'Amount' },
    { name: 'action', text: '' }
];

export default () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [curOrder, setCurOrder] = useState<Order>({
        id: '',
        name: '',
        quantity: 0,
        amount: 0,
    });
    const [orders, setOrders] = useState<Order[]>([]);

    const onAdd = () => {
        setCurOrder({
            id: '',
            name: '',
            quantity: 0,
            amount: 0,
        });
        setIsOpenDialog(true);
    };

    const onUpdate = useCallback((id: string) => {
        const orderToUpdate = orders.find(e => e.id === id);
        if (orderToUpdate) {
            setCurOrder({ ...orderToUpdate });
            setIsOpenDialog(true);
        }
    }, [orders]);

    const onSave = async () => {
        setIsOpenDialog(false);

        if (curOrder.id) {
            const newOrder = await putMethod(`/orders/${curOrder.id}`, toBody());
            const updateIndex = orders.findIndex(o => o.id === curOrder.id);
            if (updateIndex !== -1) {
                const updated = [...orders];
                updated[updateIndex] = newOrder;
                setOrders(updated);
            }
        } else {
            const maxId = orders.reduce((max, o) => {
                const num = parseInt(o.id, 10);
                return isNaN(num) ? max : Math.max(max, num);
            }, 0);
            const newId = (maxId + 1).toString();
            const newOrder = {
                ...toBody(),
                id: newId
            };
            const savedOrder = await postMethod('/orders', newOrder);
            setOrders([...orders, savedOrder]);
        }
    };

    const toBody = () => ({
        name: curOrder.name,
        quantity: curOrder.quantity,
        amount: curOrder.amount,
    });

    const onMounted = async () => {
        const ordersData = await getMethod('/orders');
        setOrders(ordersData);
    };

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
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
                <OrderDialog
                    order={curOrder}
                    setOrder={setCurOrder}
                    onSave={onSave}
                    isOpen={isOpenDialog}
                    onClose={() => setIsOpenDialog(false)}
                />
            </Box>
        </>
    );
};
