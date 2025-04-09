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
    return response
},
    (error) => {
        console.error(error);
        if (error.response) {
            const status = error.response.status;
            if (status === 401 || status === 403 || status === 404 || status === 500) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        } else {
            console.error("Network/Request error", error.message);

        }
        return Promise.reject(error);
    })

export default api;