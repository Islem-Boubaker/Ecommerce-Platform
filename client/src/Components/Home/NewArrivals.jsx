import ProductCart from "../ProductCart";
import { useEffect, useState } from "react";


function NewArrivals() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
               
                const response = await fetch(`${import.meta.env.VITE_API_URL}/user/getproduct`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div id="New_Arrivals" className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div id="newarrivals" className="min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="uppercase text-4xl font-bold text-center mb-8">
                New Arrivals
            </h1>
            
            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No products available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCart 
                            key={product._id || product.id} 
                            product={product} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default NewArrivals;