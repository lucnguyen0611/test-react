import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
import Order from '../pages/Order'


const router = createBrowserRouter([
    {
        path: "/products",
        element: <Product/>,
    },
    {
        path: "/orders",
        element: <Order/>,
    }
]);

export default router