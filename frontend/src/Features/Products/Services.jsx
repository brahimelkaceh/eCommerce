// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/products/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
  },
});

const getToken = () => {
  const token = localStorage.getItem("userT");
  console.log(token);
  if (!token) {
    throw new Error("Token not available");
  }
  return token;
};

const handleRequest = async (method, endpoint, data = null) => {
  console.log(getToken());
  try {
    const headers = {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
    };

    const response = await apiService({
      method,
      url: endpoint,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductData = async (endpoint) =>
  handleRequest("get", endpoint);

export const fetchProductById = async (id) => fetchProductData(`${id}`);

export const updateProduct = async (id, updatedProductData) =>
  handleRequest("put", `${id}`, updatedProductData);

export const createProduct = async (newProductData) =>
  handleRequest("post", "/", newProductData);
