import axios from "axios";

const BASE_URL = "http://localhost:8000";

// Helper to clean user input
const sanitizeUserData = (data) => ({
  username: data.username?.trim(),
  email: data.email?.trim(),
  password: data.password?.trim(),
});

// ✅ Register user
export const registerUser = async (userData) => {
  try {
    const cleanData = sanitizeUserData(userData);
    const response = await axios.post(`${BASE_URL}/signup/`, cleanData);
    return response.data;
  } catch (error) {
    // Log and return meaningful error
    console.error("Signup error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Signup failed" };
  }
};

// ✅ Login user
export const loginUser = async (credentials) => {
  try {
    const cleanCreds = sanitizeUserData(credentials);
    const response = await axios.post(`${BASE_URL}/login/`, cleanCreds);

    // Store token in sessionStorage
    sessionStorage.setItem("authToken", response.data.token);
    sessionStorage.setItem("username", response.data.username);

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Login failed" };
  }
};

// Get current logged-in user
export const getUserDetails = async () => {
  try {
    const token = sessionStorage.getItem("authToken");

    const response = await axios.get(`${BASE_URL}/me/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return response.data; // this should contain username, email, etc.
  } catch (error) {
    throw error.response?.data || error;
  }
};
