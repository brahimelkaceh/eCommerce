import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: ` Bearer ${JSON.parse(localStorage.getItem("userT"))}`,
  },
});

const setAuthHeader = () => {
  const token = localStorage.getItem("userT");
  if (token) {
    apiService.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  } else {
    delete apiService.defaults.headers.common["Authorization"];
  }
};

export function getUsers() {
  setAuthHeader();
  return apiService.get("/users");
}
export function createUser(body) {
  setAuthHeader();

  return apiService.post("/users", body);
}
export function DeleteUser(id) {
  setAuthHeader();
  return apiService.delete(`/users/${id}`);
}

export function editUser(id, body) {
  console.log(id, body);
  // return;
  setAuthHeader();
  return apiService.put(`/users/${id}`, body);
}

export default apiService;
