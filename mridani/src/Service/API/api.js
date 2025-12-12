import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const getAllProducts = async () => {
  const response = await axios.get(`${BASE_URL}/getAllProducts/`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/getProductsByCategory/${category}/`);
  return response.data;
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product detail for ID: ${productId}`, error);
    throw error;
  }
};

export const getProductsByCollection = async (collectionName) => {
  try {
    const response = await axios.get(`${BASE_URL}/getProductsByCollection/${collectionName}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for collection: ${collectionName}`, error);
    throw error;
  }
};

