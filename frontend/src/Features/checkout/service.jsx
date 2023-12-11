import axios from "axios";

const API_BASE_URL = "http://localhost:5000/orders";
const customerToken = localStorage.getItem("customerToken");
const CustomerToken = JSON.parse(customerToken);
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": CustomerToken ? `Bearer ${CustomerToken}` : "",
  },
});

export const createOrder = async (order) => apiService.post("/", order);
