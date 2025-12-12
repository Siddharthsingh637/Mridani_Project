// src/Service/API/payment.js
import axios from "axios";

const BASE_URL = "https://lh.vishall.tech/api/v1";

export const initiatePayment = async (payload, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/payments/initiate/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("❌ Payment Initiation Failed:", error.response?.data || error.message);
    throw error;
  }
};
