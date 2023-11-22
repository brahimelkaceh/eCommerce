import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    Authorization:` Bearer ${JSON.parse(localStorage.getItem("userT"))}`
  },
});
const config = {
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: ` Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
  },
};
export function getUsers() {
  return api.get("/users");
}
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
