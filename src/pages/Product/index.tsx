import {FTable, FHeader, SearchBar, ProductDialog} from '../../component'
import type { Product} from '../../utils'
import {Box, Button} from "@mui/material";
import {useState, useEffect, useCallback} from "react";
import {getMethod, postMethod, putMethod} from "../../utils/api.ts";

const headers: Header[] = [
    {name: 'id', text: 'ID'},
    {name: 'name', text: 'Ten'},
    {name: 'price', text: 'Gia'},
    {name: 'remaining', text: 'Ton'},

]


export default () => {
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
    const [curProduct, setCurProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        remaining: 0,
    })

    const [products, setProducts] = useState<Product[]>([])
    // const [colors, setColors] = useState<Color[]>([])

    const onAdd = () => {
        setIsOpenDialog(true)
        console.log("hello")
    }

    const onUpdate = useCallback((id: number) => {
        // @ts-ignore
        setCurProduct({...products.find(e => e.id === id)})
        setIsOpenDialog(true)
    }, [products])

    const onSave = async () => {
        console.log(curProduct)
        setIsOpenDialog(false)

        if (curProduct.id) {
            const newProduct: Product = await putMethod(`/products/${curProduct.id}`, toBody())
            const updateIndex = products.findIndex(
                (e: Product) => Number(e.id) === Number(curProduct.id)
            )
            products[updateIndex] = newProduct
            setProducts([...products])
        }
        else {
            const newProduct: Product = await postMethod('/products', toBody())
            setProducts([...products, newProduct])
        }
    }

    const toBody = () => {
        return {
            name: curProduct.name,
            price: curProduct.price,
            remaining: curProduct.remaining,
        }
    }

    const onMounted = async () => {
        const productsData = await getMethod('/products')

        setProducts([...productsData])
    }

    useEffect(() => {
        onMounted()
    }, [])

    return (
        <>
            <FHeader title={'Products'}/>
            <Box className={'container'}>
                <SearchBar onAdd={onAdd}/>

                <FTable
                    headers={headers}
                    rows={products}
                    onUpdate={onUpdate}
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
    )
}