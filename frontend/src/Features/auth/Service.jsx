import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "multipart/form-data",
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

export function getProfile() {
  setAuthHeader();
  return apiService.get("/users/profile");
}

export default apiService;
