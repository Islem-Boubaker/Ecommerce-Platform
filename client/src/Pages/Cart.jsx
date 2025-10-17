import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getOrdersByUserId,
  deleteProductFromOrder,
  updateProductQuantity,
} from "../services/OrdersServices";
import {
  addOrder,
  setOrderId,
  incrementQuantity,
  decrementQuantity,
  removeOrder,
} from "../redux/order/orderSlice";
import CartItem from "../Components/CartItem";
import OrderSummary from "../Components/OrderSummary";

export default function Cart() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);
  const { orders, orderId } = useSelector((state) => state.orders);
  
  // === Fetch orders from backend on mount ===
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        const response = await getOrdersByUserId(userId);
        // response is an object with { message, orders: [] }
        const orderData = response.orders || response;
        
        if (Array.isArray(orderData) && orderData.length > 0) {
          // Set orderId and userId from first order
          const firstOrder = orderData[0];
          if (firstOrder._id && firstOrder.userId) {
            dispatch(setOrderId({ orderId: firstOrder._id, userId: firstOrder.userId }));
          }
        }
        
        dispatch(addOrder(orderData));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [userId, dispatch]);

  return (
    <div className="p-6">
      <h1 className="uppercase text-4xl font-bold mb-6">Your Cart</h1>

      {products.length === 0 ? (
        <div className="text-gray-500">Your cart is empty</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-2 space-y-6 bg-gray-100 p-6 rounded-xl w-full lg:w-2/3">
            {cartItems.map((product) => (
              <CartItem
                key={product.productId}
                product={product}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={handleRemoveProduct}
              />
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
            totalDiscount={discount}
            deliveryFee={deliveryFee}
            total={total}
          />
        </div>
      )}
    </div>
  );
}