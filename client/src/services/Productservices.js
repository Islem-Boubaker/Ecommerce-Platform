import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
  return response.data; // always return the data
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/getproduct/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.product || data; // Handle both response formats
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/products`,
    productData
  );
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/products/${id}`
  );
  return response.data;
};
