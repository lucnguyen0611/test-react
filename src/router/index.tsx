import {createBrowserRouter} from "react-router";
import Product from '../pages/Product'
import Order from '../pages/Order'


const router = createBrowserRouter([
    {
        path: "/product",
        element: <Product/>,
    },
    // {
    //     path: "/order",
    //     element: <Order/>,
    // }
]);

export default router