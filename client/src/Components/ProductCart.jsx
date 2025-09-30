import { Link } from 'react-router-dom';
import { createOrder } from '../services/OrdersServices';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder, setOrderId, setLoading, setError } from "../redux/order/orderSlice";

function ProductCart({ product }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const imgUrl = `${import.meta.env.VITE_API_URL}/${product.images[0].replace(/\\/g, "/")}`;

  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!currentUser) {
      alert('Please login first!');
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Add to Redux store first (for local state management)
      dispatch(addOrder({
        productId: product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        quantity: 1,
      }));

      // Prepare data for backend
      const orderData = {
        userId: currentUser._id,
        products: [{
          productId: product._id,
          name: product.name,
          image: product.images[0],
          quantity: 1,
          price: product.price
        }],
        deliveryFee: 5,
        shippingAddress: currentUser.address || '',
        location: currentUser.location || '',
      };

      // Send to backend
      const response = await createOrder(orderData);
      
      // Store the order ID from backend
      if (response.order && response.order._id) {
        dispatch(setOrderId(response.order._id));
      }

      dispatch(setLoading(false));
      alert('Product added to cart successfully!');
      console.log('Order response:', response);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch(setLoading(false));
      dispatch(setError(error.message));
      alert('Failed to add product to cart');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
      <Link to={`/products/${product._id}`}>
        {/* Product Image */}
        <div className="relative">
          <img
            src={imgUrl}
            alt={product.name}
            className="w-full h-80 object-cover"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>

          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {"★".repeat(4)}
              {"☆".repeat(1)}
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-4">
            ${product.price}
          </div>
        </div>
      </Link>
      
      <button 
        className="w-full cursor-pointer bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors" 
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCart;