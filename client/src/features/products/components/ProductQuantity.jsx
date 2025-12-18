
import { useParams } from "react-router-dom";
import { createOrder } from "../../../services/OrdersServices";
import { useSelector } from "react-redux";

export default function ProductQuantity({ quantity, setQuantity }) {
  const { id: productId } = useParams();
  const userId = useSelector((state) => state.user.currentUser?.id);
  
  const handleChange = (delta) => setQuantity(Math.max(1, quantity + delta));
  
  const handleAddToCart = async () => {
    try {
      if (!productId) {
        throw new Error("Product not found");
      }
      if (!userId) {
        throw new Error("Please log in to add items to cart");
      }
      
      // Call the API service with all required parameters
      await createOrder(productId, userId, quantity);
      // You might want to show a success message here
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.message); // Show error message to user
    }
  }
  return (
    <div className="flex gap-4">
      <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden">
        <button onClick={() => handleChange(-1)} className="w-12 h-12 hover:bg-gray-100 ">−</button>
        <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
        <button onClick={() => handleChange(1)} className="w-12 h-12 hover:bg-gray-100">+</button>
      </div>

      <button onClick={() => handleAddToCart()} className=" bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-gray-800 w-50" >
        Add to Cart
      </button>
    </div>
  );
}
