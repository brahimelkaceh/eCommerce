// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/orders/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  const token = localStorage.getItem("userT");
  if (!token) {
    throw new Error("Token not available");
  }
  return token;
};

const fetchData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint, {
      headers: getRequestHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getRequestHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  // Add other headers if needed
});

const fetchOrderById = async (id) => {
  const endpoint = `${id}`;
  try {
    const response = await apiService.get(endpoint, {
      headers: getRequestHeaders(),
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateOrderById = async (id, updatedOrderData) => {
  const endpoint = `${id}`;
  try {
    const response = await apiService.put(endpoint, updatedOrderData, {
      headers: getRequestHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchData, fetchOrderById, updateOrderById };
