
// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/subcategories/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
    "Content-Type": "application/json",
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

export const fetchSubcategoriesData = async () => handleRequest("get", "/");

export const fetchSubcategoryById = async (id) => handleRequest("get", `${id}`);

export const updateSubcategory = async (id, data) => {
  apiService.put(`${id}`, data);
};

export const createSubcategory = async (newSubcategoryData) =>
  handleRequest("post", "/", newSubcategoryData);

export const deleteSubcategory = async (id) => apiService.delete(`/${id}`);
