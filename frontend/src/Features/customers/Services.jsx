import axios from "axios";

const API_BASE_URL = "http://localhost:5000/customers/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchCustomerById = async (id) => {
  const endpoint = `${id}`;
  try {
    const response = await apiService.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};
