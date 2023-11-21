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

const handleRequest = async (method, endpoint, data = null) => {
  try {
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

export function getproducts() {
  return apiService.get("/");
}

export const fetchProductData = async (endpoint) =>
  handleRequest("get", endpoint);

export const fetchProductById = async (id) => fetchProductData(`${id}`);

export const updateProduct = async (id, updatedProductData) =>
  handleRequest("put", `${id}`, updatedProductData);

export const createProduct = async (newProductData) =>
  handleRequest("post", "/", newProductData);

export const deleteProd = async (id) => apiService.delete(`/${id}`);

export default apiService;
