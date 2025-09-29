import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // make sure it's react-router-dom not just react-router

function ShoppingCartIcon() {
  const navigate = useNavigate();

  // Safely get orders from Redux
  const orders = useSelector((state) => state.orders?.orders);

  const handleNavigate = () => {

      if(orders)navigate("/cart");
   
  };


  return (
    <div className="relative cursor-pointer">
      <ShoppingCart
        onClick={handleNavigate} // ✅ pass function reference
        className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors"
      />
      {orders.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
          {orders.length}
        </span>
      )}
    </div>
  );
}

export default ShoppingCartIcon;
