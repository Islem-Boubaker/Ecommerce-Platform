import { useState } from "react"
import { ShoppingCart } from "lucide-react"

function ShoppingCartIcon() {
    const [countproduct, setCountProduct] = useState(0)
    
    const handleAddProduct = () => {
        setCountProduct(countproduct + 1)
    }
    
    return (
        <div className="relative cursor-pointer">
            <ShoppingCart 
                onClick={handleAddProduct}
                className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors"
            />
            {countproduct > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                    {countproduct}
                </span>
            )}
        </div>
    )
}

export default ShoppingCartIcon