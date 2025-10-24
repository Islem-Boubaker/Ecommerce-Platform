import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import CartItem from "../Components/CartItem";
import OrderSummary from "../Components/OrderSummary";
import axios from "axios";

export default function Cart() {
  const [orders, setOrders] = useState([]);
  const [productsData, setProductsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.user.currentUser?.id);

  async function getProductById(id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getproduct/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null;
    }
  }

  async function fetchAllProducts(ordersArray) {
    const productMap = {};
    const productIds = new Set();

    // Collect all unique product IDs from all orders
    ordersArray.forEach((order) => {
      order.products?.forEach((product) => {
        productIds.add(product.productId);
      });
    });

    // Fetch all products
    const productPromises = Array.from(productIds).map(async (productId) => {
      const productData = await getProductById(productId);
      if (productData) {
        productMap[productId] = productData;
      }
    });

    await Promise.all(productPromises);
    setProductsData(productMap);
    console.log("Fetched products data:", productMap);
  }

  async function getOrderByUserId(id) {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/order/getorderbyuser/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      console.log("Response data:", data);

      const ordersArray = Array.isArray(data.order)
        ? data.order
        : data.order?.order || [];
      setOrders(ordersArray);
      console.log("Fetched orders:", ordersArray);

      // Fetch products for all orders
      await fetchAllProducts(ordersArray);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${import.meta.env.VITE_API_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  useEffect(() => {
    if (userId) {
      getOrderByUserId(userId);
    }
  }, [userId]);

  // Create cartItems from orders and productsData
  const cartItems = useMemo(() => {
    return orders.flatMap((order) =>
      (order.products || []).map((product) => ({
        ...product,
        productDetails: productsData[product.productId] || {},
      }))
    );
  }, [orders, productsData]);

  const { subtotal, deliveryFee, discount, total } = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const deliveryFee = subtotal > 0 ? 5 : 0;
    const discount = 0;
    const total = subtotal + deliveryFee - discount;
    return { subtotal, deliveryFee, discount, total };
  }, [cartItems]);

  // ---- Handlers
  const increment = (productId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        products: order.products?.map((product) =>
          product.productId === productId
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      }))
    );
  };

  const decrement = (productId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        products: order.products?.map((product) =>
          product.productId === productId
            ? { ...product, quantity: Math.max(1, product.quantity - 1) }
            : product
        ),
      }))
    );
  };

  const handleRemoveProduct = (productId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        products: order.products?.filter(
          (product) => product.productId !== productId
        ),
      }))
    );
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="uppercase text-4xl font-bold mb-6">Your Cart</h1>

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
    </div>
  );
}
