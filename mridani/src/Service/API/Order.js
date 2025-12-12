import axios from "axios";
const BASE_URL = "http://localhost:8000";

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
