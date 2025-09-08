import ProductCart from "../Components/ProductCart";
import { useEffect, useState } from "react";
function NewArrivals() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/products").then(res => res.json()).then(data => setProducts(data))
    }, []);
    return (
        <div>
            <h1 className="uppercase text-4xl font-bold text-center">new arrivals</h1>
            <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3  max-sm:grid-cols-1">
                {products.map(product => (
                    <ProductCart key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default NewArrivals