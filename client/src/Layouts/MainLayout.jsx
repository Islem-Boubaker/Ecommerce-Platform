import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";


function MainLayouts() {
    return (
        <>
            <Header
                items={["Shop", "On Sale", "New Arrivals", "Contact"]}
              
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default MainLayouts;
