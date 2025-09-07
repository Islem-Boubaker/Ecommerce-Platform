import Header from "../Components/header";
import Footer from "../Components/footer";

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
