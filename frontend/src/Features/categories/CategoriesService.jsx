// apiService.js
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/categories";

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
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ! GET CATEGORY
export const fetchCategories = async () => handleRequest("get", "/");
// ! POST CATEGORY
export const createCategory = async (newCategory) =>
  handleRequest("post", "/", newCategory);
// ! UPDATE CATEGORY
export const updateCategory = async (id, data) => {
  apiService.put(`${id}`, data);
};
// ! DELETE CATEGORY
export const deleteCategory = async (id) => apiService.delete(`/${id}`);

export default apiService;
