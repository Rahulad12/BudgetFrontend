import api from "./api";
import { AUTH_URL } from "./constant";
import { authResponseType, globalResponse } from "../types";

const loginUser = async (username: string, password: string): Promise<authResponseType> => {
    try {
        const res = await api.post<authResponseType>(`${AUTH_URL}/login`, {
            username,
            password
        });
        localStorage.setItem("token", res.data.token);
        return res.data;
    } catch (error: any) {
        console.error("Login Error:", error);
        throw error.response?.data || error;
    }
};

const registerUser = async (
    username: string,
    email: string,
    password: string
): Promise<globalResponse> => {
    try {
        const res = await api.post<globalResponse>(`${AUTH_URL}/register`, {
            username,
            email,
            password
        });
        return res.data;
    } catch (error: any) {
        console.error("Register Error:", error);
        throw error.response?.data || error;
    }
};

export { loginUser, registerUser };
