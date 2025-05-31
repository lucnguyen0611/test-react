import { FTable, SearchBar, ProductDialog } from '../../component';
import type { Product } from '../../utils';
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getMethod, postMethod, putMethod, deleteMethod } from "../../utils/api.ts";

const headers = [
    { name: 'id', text: 'ID' },
    { name: 'name', text: 'Tên' },
    { name: 'price', text: 'Giá' },
    { name: 'remaining', text: 'Tồn' },
    { name: 'action', text: 'Delete' }
];

export default () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [curProduct, setCurProduct] = useState<Product>({
        id: '',
        name: '',
        price: 0,
        remaining: 0,
    });
    const [products, setProducts] = useState<Product[]>([]);

    const onAdd = () => {
        setCurProduct({
            id: '',
            name: '',
            price: 0,
            remaining: 0,
        });
        setIsOpenDialog(true);
    };

    const onSave = async () => {
        setIsOpenDialog(false);

        if (curProduct.id) {
            // Update
            const newProduct = await putMethod(`/products/${curProduct.id}`, toBody());
            const updateIndex = products.findIndex(p => p.id === curProduct.id);
            if (updateIndex !== -1) {
                const updated = [...products];
                updated[updateIndex] = newProduct;
                setProducts(updated);
            }
        } else {
            const maxId = products.reduce((max, p) => {
                const num = parseInt(p.id, 10);
                return isNaN(num) ? max : Math.max(max, num);
            }, 0);
            const newId = (maxId + 1).toString();
            const newProduct = {
                ...toBody(),
                id: newId
            };
            const savedProduct = await postMethod('/products', newProduct);
            setProducts([...products, savedProduct]);
        }
    };

    const toBody = () => ({
        name: curProduct.name,
        price: curProduct.price,
        remaining: curProduct.remaining,
    });

    const onMounted = async () => {
        const productsData = await getMethod('/products');
        setProducts(productsData);
    };

    const onDelete = async (id: string) => {
        const result = await deleteMethod(`/products/${id}`);
        if (result) {
            setProducts(prd => prd.filter(pd => pd.id !== id));
        }
    };

    useEffect(() => {
        onMounted();
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Products</h1>
            <Box className={'container'}>
                <SearchBar onAdd={onAdd} />
                <FTable
                    headers={headers}
                    rows={products}
                    onDelete={onDelete}
                />
                <ProductDialog
                    product={curProduct}
                    setProduct={setCurProduct}
                    onSave={onSave}
                    isOpen={isOpenDialog}
                    onClose={() => setIsOpenDialog(false)}
                />
            </Box>
        </>
    );
};

