import Header from "../shared/components/Header";
import Footer from "../shared/components/Footer";
import { Outlet } from "react-router-dom";
import SubscribeForm from "../shared/components/SubscribeForm"

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
