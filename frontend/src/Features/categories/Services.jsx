// apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/subcategories/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchSubcategoriesData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const fetchOrderById = async (id) => {
//   const endpoint = `${id}`;
//   try {
//     const response = await apiService.get(endpoint);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateOrderById = async (id, updatedOrderData) => {
//   const endpoint = `${id}`;
//   try {
//     const response = await apiService.put(endpoint, updatedOrderData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
