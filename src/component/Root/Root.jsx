import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";


const Root = () => {
    return (
        <>
            <Navbar></Navbar>

            <Outlet></Outlet>

            <Footer></Footer>
        </>
    );
};

export default Root;