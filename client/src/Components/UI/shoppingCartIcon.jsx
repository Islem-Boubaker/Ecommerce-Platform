import { ShoppingCart } from "lucide-react";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useMemo } from "react";

function ShoppingCartIcon({productcount=0}) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/cart");
  };

  return (
    <div className="relative cursor-pointer">
      <ShoppingCart
        onClick={handleNavigate}
        className="w-6 h-6 text-gray-700 hover:text-gray-900 transition-colors"
      />
      { productcount>0 && (
        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
          {productcount}
        </span>
      )}
    </div>
  );
}

export default ShoppingCartIcon;
