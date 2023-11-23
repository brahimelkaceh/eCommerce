import axios from "axios";

const API_BASE_URL = "http://localhost:5000/orders/";

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

const fetchData = async (endpoint) => handleRequest("get", endpoint);

const fetchOrderById = async (id) => fetchData(`${id}`);

const updateOrderById = async (id, updatedOrderData) =>
  handleRequest("put", `${id}`, updatedOrderData);

export { fetchData, fetchOrderById, updateOrderById };
