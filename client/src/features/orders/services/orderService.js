export const createOrder = async (productId, userId, quantity) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/order/createorder/${userId}/${productId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: `${productId},${userId},${quantity}`,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

export async function deleteProductFromOrder(orderId, productId) {
  await fetch(
    `${import.meta.env.VITE_API_URL}/order/${orderId}/product/${productId}`,
    {
      method: "DELETE",
    }
  );
}

export async function updateProductQuantity(orderId, productId, value) {
  await fetch(
    `${import.meta.env.VITE_API_URL}/order/${orderId}/product/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    }
  );
}

export async function getOrderByUserId(userId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/order/getorderbyuser/${userId}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}
