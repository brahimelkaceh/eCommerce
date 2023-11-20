import axios from "axios";

const API_BASE_URL = "http://localhost:5000/customers/";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  const token = localStorage.getItem("userT");
  if (!token) {
    throw new Error("Token not available");
  }
  return token;
};

export const fetchData = async (endpoint) => {
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    const response = await apiService.get(endpoint, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCustomerById = async (id) => {
  const endpoint = `${id}`;
  try {
    const headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    const response = await apiService.get(endpoint, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
