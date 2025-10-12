// Plain API helper for orders
export const createOrder = async (orderData) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/order/createorder/${orderData.userId}/${orderData.productId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: orderData,
    }
  );

  if (!response.ok) {
    
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};


// // cart API call
// export async function saveOrderToServer(userId, items) {
//   const res = await fetch( `${import.meta.env.VITE_API_URL}/order/createorder`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       userId,
//       items,
//       deliveryFee: 15,
//       shippingAddress: "Tunis",
//       location: "Tunisia",
//     }),
//   });
//   return res.json();
// }

export async function deleteProductFromOrder(orderId, productId) {
  await fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}/product/${productId}`, {
    method: "DELETE",
  });
}
export async function updateProductQuantity(orderId, productId, value ) {
  await fetch(`${import.meta.env.VITE_API_URL}/order/${orderId}/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
}