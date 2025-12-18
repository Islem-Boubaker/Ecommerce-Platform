import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SubscribeForm from "./SubscribeForm";

function MainLayout() {
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

export default MainLayout;
