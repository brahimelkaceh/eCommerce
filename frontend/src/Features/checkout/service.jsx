import axios from "axios";

const API_BASE_URL = "http://localhost:5000/orders";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("customerToken"))}`,
  },
});
export const createOrder = async (order) => apiService.post("/",order)