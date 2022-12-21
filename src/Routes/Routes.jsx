import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Orders from "../Pages/Orders/Orders";
import Payment from "../Pages/Payment/Payment";
import Registation from "../Pages/Registation/Registation";
import Users from "../Pages/Users/Users";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: '/order',
                element: <Orders></Orders>
            },
            {
                path: '/payment',
                element: <Payment></Payment>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/registation',
                element: <Registation></Registation>
            },
            {
                path:'/users',
                element:<Users></Users>
            }
        ]
    }
]);

export default router;