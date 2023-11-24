import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: ` Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
  },
});


export function getCustomers() {
  return api.get("/customers");
}
export function createCustomer(body) {
  return api.post("/users", body);
}
export function DeleteCustomer(id) {
  return api.delete(`/customers/${id}`);
}

export function editCustomer(id, body) {
  return api.put(`/customers/${id}`, body);
}

export default api;