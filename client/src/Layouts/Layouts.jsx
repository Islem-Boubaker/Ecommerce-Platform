import Header from "./header";
import Footer from "./footer";
    

function Layouts({ children }) {
    return (
        <>
        <Header></Header>
        <main>
            {children}
        </main>
        <Footer></Footer>
        </>
    )
}
export default Layouts