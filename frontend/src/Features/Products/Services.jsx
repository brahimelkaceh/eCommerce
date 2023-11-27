/* eslint-disable no-useless-catch */
// apiService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/products/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    // Authorization: `Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
  },
});

const setAuthHeader = () => {
  const token = localStorage.getItem("userT");
  if (token) {
    apiService.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  } else {
    delete apiService.defaults.headers.common["Authorization"];
  }
};

export const getProducts = async () => {
  setAuthHeader();
  return apiService.get("/");
};
export const getP = async (id) => {
  setAuthHeader();
  return apiService.get(`/${id}`);
};
export const createP = async (newProductData) => {
  setAuthHeader();
  return apiService.post(`/`, newProductData);
};
export const deleteP = async (id) => {
  setAuthHeader();
  return apiService.delete(`/${id}`);
};
export const editP = async (id, updatedProductData) => {
  setAuthHeader();
  return apiService.put(`/${id}`, updatedProductData);
};
