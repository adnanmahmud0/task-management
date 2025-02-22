import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log(loading)
    console.log(user)
    const location = useLocation();

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-[#3085B2] border-r-[#10EFC8] border-b-[#2F87B3] border-l-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );

    if (user && user?.email) {
        return children;
    }
    // console.log(location.pathname);
    return <Navigate to="/Login" state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;