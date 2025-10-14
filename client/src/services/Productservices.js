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




export const getproductbygat = async (category) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/user/getproductbycategory/${encodeURIComponent(category)}`
    );
    // Normalize to always return an array of products
    return Array.isArray(response.data)
      ? response.data
      : Array.isArray(response.data?.products)
      ? response.data.products
      : [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};