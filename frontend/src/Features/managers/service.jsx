import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});
const config = {
  headers: {
    "Content-type": "multipart/form-data",
  },
};
export function createUser(body) {
  return api.post("/users", body, config);
}
export function DeleteUser(body) {
  return api.delete(`/users/${body}`);
}

export function editUser(id, body) {
  return api.put(`/users/${id}`, body);
}

export default api;
