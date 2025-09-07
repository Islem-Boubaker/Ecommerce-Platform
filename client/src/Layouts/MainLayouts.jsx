import Header from "../Components/Header";
import Footer from "../Components/Footer";

function MainLayouts({ children }) {
    return (
        <>
            <Header />
            <main className="main">
                {children}
            </main>
            <Footer />
        </>
    );
}

export default MainLayouts;
