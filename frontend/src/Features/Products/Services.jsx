// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/products/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProductData = async (endpoint) => {
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductById = async (id) => {
  const endpoint = `${id}`;
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, updatedProductData) => {
  const endpoint = `${id}`;
  try {
    const response = await apiService.put(endpoint, updatedProductData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (newProductData) => {
  try {
    const response = await apiService.post("/", newProductData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
