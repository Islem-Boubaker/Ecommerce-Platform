import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";
import SubscribeForm from "../Components/subscribeform"

function MainLayouts() {
    return (
        <>
            <Header
                items={["Shop", "On Sale", "New Arrivals", "Contact"]}
              
            />
            <main>
                <Outlet />
            </main>
            <SubscribeForm/>
            <Footer />
        </>
    );
}

export default MainLayouts;
