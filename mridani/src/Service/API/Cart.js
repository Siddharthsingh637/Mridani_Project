// src/Service/API/Cart.js

import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getCart = async () => {
  const token = sessionStorage.getItem("authToken");  // ✅ Fix here
  console.log("🔥 getCart called with token:", token);

  try {
    const response = await axios.get(`${BASE_URL}/cart/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching cart:", error.response?.data || error.message);
    throw error;
  }
};




// Add to Cart
export const addCart = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/cart/`, data, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Delete from Cart
export const deleteCart = async (cartId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cart/delete/${cartId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting from cart:", error);
    throw error;
  }
};

// ✅ Update Cart Quantity

export const updateCartQuantity = async (cartId, quantity) => {
  const token = sessionStorage.getItem("authToken"); // ✅ Fetch token internally

  try {
    const response = await axios.patch(
      `http://localhost:8000/cart/update/${cartId}/`,
      { quantity },
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error updating quantity:", error.response?.data || error.message);
    throw error;
  }
};



