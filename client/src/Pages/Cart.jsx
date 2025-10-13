import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrdersByUserId, deleteProductFromOrder, updateProductQuantity } from "../services/OrdersServices";
import { addOrder, incrementQuantity, decrementQuantity, removeOrder } from "../redux/order/orderSlice";
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
        dispatch(addOrder(response));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, [userId, dispatch]);

  // === Totals ===
  const subtotal = orders.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  // === Handlers ===
  const increment = (productId) => {
    const product = orders.find((item) => item.productId === productId);
    if (!product) return;

    const newQuantity = product.quantity + 1;
    dispatch(incrementQuantity(productId));
    updateProductQuantity(orderId, productId, newQuantity);
  };

  const decrement = (productId) => {
    const product = orders.find((item) => item.productId === productId);
    if (!product) return;

    const newQuantity = Math.max(1, product.quantity - 1);
    dispatch(decrementQuantity(productId));
    updateProductQuantity(orderId, productId, newQuantity);
  };

  const handleRemoveProduct = (productId) => {
    if (!orderId) return alert("No order ID found!");
    deleteProductFromOrder(orderId, productId);
    dispatch(removeOrder(productId));
  };

  return (
    <div className="p-6">
      <h1 className="uppercase text-4xl font-bold mb-6">Your Cart</h1>

      {orders.length === 0 ? (
        <div className="text-gray-500">Your cart is empty</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-2 space-y-6 bg-gray-100 p-6 rounded-xl w-full lg:w-2/3">
            {orders.map((product) => (
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
