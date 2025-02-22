
import {
    createBrowserRouter,
} from "react-router-dom";

import Root from '../../component/Root/Root';
import Home from '../../component/Home/Home';
import Login from '../../component/Login/Login';
import Register from '../../component/Register/Register';
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <PrivateRoute><Home></Home></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            }
        ]
    },
]);