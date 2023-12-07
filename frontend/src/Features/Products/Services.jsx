/* eslint-disable no-useless-catch */
// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/products/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
  },
});

export const getProducts = async () => apiService.get("/");
export const getP = async (id) => await apiService.get(`/${id}`);

export const createP = async (newProductData) =>
  apiService.post(`/`, newProductData);
export const deleteP = async (id) => apiService.delete(`/${id}`);
export const editP = async (id, updatedProductData) =>
  apiService.put(`/${id}`, updatedProductData);
