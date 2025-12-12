// src/Service/API/Wishlist.js

import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Get Wishlist
export const getWishlist = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/wishlist/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Add to Wishlist
export const addWishlist = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/wishlist/`, data, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Delete from Wishlist (✅ Fixed the endpoint)
export const deleteWishlist = async (wishlistId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/wishlist/${wishlistId}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting from wishlist:", error);
    throw error;
  }
};
