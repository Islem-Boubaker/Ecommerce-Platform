/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getOrderByUserId } from "../services/OrdersServices";
import CartItem from "../Components/CartItem";
import OrderSummary from "../Components/OrderSummary";
import { useProduct } from "../Hooks/useProduct";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = useSelector((state) => state.user.currentUser?.id);

  // ---- Compute totals
  const { subtotal, deliveryFee, discount, total } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 0 ? 5 : 0;
    const discount = 0;
    const total = subtotal + deliveryFee - discount;
    return { subtotal, deliveryFee, discount, total };
  }, [cartItems]);

  // ---- Fetch orders
  useEffect(() => {
    if (!userId) return;

    const fetchOrders = async () => {
      try {
        console.log('Fetching orders for user:', userId);
        const response = await getOrderByUserId(userId);
        console.log('Orders API response:', response);

        // The response might be the orders array directly or an object with an orders/order property
        let orders = [];
        if (Array.isArray(response)) {
          orders = response;
        } else if (response && typeof response === 'object') {
          orders = response.orders || response.order || [];
        }

        console.log('Extracted orders:', orders);

        if (!orders.length) {
          console.log('No orders found');
          setCartItems([]);
          return;
        }

        // Get the most recent order (first one in the array)
        const latestOrder = orders[0];
        console.log('Latest order:', latestOrder);

        // Extract products from the order
        let orderProducts = [];

        // Check different possible structures
        if (Array.isArray(latestOrder.products)) {
          orderProducts = latestOrder.products;
        } else if (latestOrder.items && Array.isArray(latestOrder.items)) {
          orderProducts = latestOrder.items;
        } else if (latestOrder.products && typeof latestOrder.products === 'object') {
          // If products is an object with product IDs as keys
          orderProducts = Object.values(latestOrder.products);
        }

        console.log('Order products:', orderProducts);

        if (!orderProducts.length) {
          console.log('No products found in the order');
          setCartItems([]);
          return;
        }

        // Transform products to match expected format
        const formattedItems = orderProducts
          .filter(product => product && (product.productId || product._id || product.id))
          .map(product => {
            const productId = product.productId || product._id || product.id;
            const price = product.price || product.prix || 0;
            const quantity = product.quantity || 1;
            const name = product.name || product.nom || 'Unnamed Product';
            const image = product.image || product.imageUrl || '';

            return {
              ...product,
              productId,
              price,
              quantity,
              name,
              image
            };
          });

        console.log('Formatted cart items:', formattedItems);
        setCartItems(formattedItems);
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
        setCartItems([]);
      }
    };

    fetchOrders();
  }, [userId]);

  // ---- Fetch product details
  // Get all product IDs from cart items
  const productIds = useMemo(() => {
    return cartItems.map(item => item.productId).filter(Boolean);
  }, [cartItems]);

  // Pass the array of product IDs to the useProduct hook
  const { products = [], loading, error } = useProduct(productIds.length ? productIds : null);

  console.log('Cart Items:', cartItems);
  console.log('Fetched Products:', products);
  // ---- Merge product + quantity
  const mergedItems = useMemo(() => {
    if (!Array.isArray(products) || !Array.isArray(cartItems)) {
      console.log('Products or cartItems is not an array');
      return [];
    }

    console.log('Merging products and cart items...');
    console.log('Products:', products);
    console.log('Cart Items:', cartItems);

    return cartItems
      .filter(cartItem => cartItem && cartItem.productId) // Filter out invalid items
      .map((cartItem) => {
        try {
          const product = products.find(p =>
            (p?._id === cartItem.productId) ||
            (p?.productId === cartItem.productId)
          ) || {};

          const mergedItem = {
            ...cartItem,
            ...product,
            // Ensure required fields have fallbacks
            name: cartItem.name || product.name || 'Unnamed Product',
            price: cartItem.price || product.price || 0,
            quantity: cartItem.quantity || 1,
            image: cartItem.image || product.image || ''
          };

          return mergedItem;
        } catch (err) {
          console.error('Error merging product:', err);
          return null;
        }
      })
      .filter(Boolean); // Remove any null entries
  }, [cartItems, products]);

  // ---- Increment / Decrement / Remove
  const increment = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleRemoveProduct = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  if (loading) return <div className="p-6 text-gray-500">Loading your cart...</div>;
  if (error) return (
    <div className="p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error loading cart items!</strong>
        <span className="block sm:inline"> Please try again later or contact support if the problem persists.</span>
      </div>
    </div>
  );

  if (!Array.isArray(mergedItems) || mergedItems.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
          <p className="mt-1 text-gray-500">Start shopping to add items to your cart.</p>
          <div className="mt-6">
            <a
              href="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="uppercase text-4xl font-bold mb-6">Your Cart</h1>

      {mergedItems.length === 0 ? (
        <div className="text-gray-500">Your cart is empty</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-2 space-y-6 bg-gray-100 p-6 rounded-xl w-full lg:w-2/3">
            {mergedItems.map((product) => (
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
