import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL
const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['authorization'] = `Bearer ${token}`
    }
    return config;
})

api.interceptors.response.use((response) => {
    if (response.status === 401 || response.status === 403 || response.status === 500) {
        localStorage.removeItem("token");
    }
    return response
})

export default api;