import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getproduct`);
  return response.data; // always return the data
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getproduct/${id}`
    );
    return response.data;
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
