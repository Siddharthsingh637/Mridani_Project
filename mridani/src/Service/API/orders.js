import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const getOrders = async () => {
  const token = sessionStorage.getItem('authToken');
  try {
    const response = await axios.get(`${BASE_URL}/orders/my/`, {  // ✅ fixed URL
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.response?.data || error.message);
    throw error;
  }
};

export const placeOrder = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders/place/`, data, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error.response?.data || error.message);
    throw error;
  }
};
