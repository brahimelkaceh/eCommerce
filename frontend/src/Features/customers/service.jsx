import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
const config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
export function createCustomer(body) {
  return api.post("/users", body, config);
}
export function DeleteCustomer(body) {
  return api.delete(`/customers/${body}`);
}

export function editCustomer(id, body) {
  return api.put(`/customers/${id}`, body);
}

export default api;
