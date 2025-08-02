import axios from "axios";

const API = axios.create({
  baseURL: "https://talksy-backend-9kxy.onrender.com/auth", 
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
