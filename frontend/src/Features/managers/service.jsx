import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
export function createUser(body) {
    return api.post("/users/")
}
export function DeleteUser(body) {
  return api.delete(`/users/${body}`);
}

export function editUser(body) {
  return api.put("/users/:id", body);
}



export default api;
