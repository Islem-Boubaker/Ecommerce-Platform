
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/order/orderSlice";
import { createOrder } from "../../services/OrdersServices"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProductQuantity({ quantity, setQuantity}) {
  const id = useParams().id;
  const dispatch = useDispatch();
  const userid = useSelector(state => state.user.currentuser._id);
  const handleChange = (delta) => setQuantity(Math.max(1, quantity + delta));
  const handleAddToCart = () => {
    console.log(id)
    try {
      if(!id){
        throw new Error("Product not found")
      }
      const order = createOrder(id, userid, quantity)
      dispatch(addOrder(order))
    } catch (error) {
      console.log(error)
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
