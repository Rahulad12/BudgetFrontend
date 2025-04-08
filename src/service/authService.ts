import api from "./api";
import { AUTH_URL } from "./constant";
import { authResponseType, getUserResponse, globalResponse } from "../types";

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

const getUser = async (): Promise<getUserResponse> => {
    try {
        const reponse = await api.get<getUserResponse>(`${AUTH_URL}/user`);
        return reponse.data
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
}
const updateUser = async (username: string, email: string): Promise<globalResponse> => {
    try {
        const response = await api.put<globalResponse>(`${AUTH_URL}/user/update`, {
            username,
            email
        });
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
}

const passwordChange = async (currentpassword: string, password: string): Promise<globalResponse> => {
    try {
        const response = await api.put<globalResponse>(`${AUTH_URL}/user/password`, {
            currentpassword,
            password
        });
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error.response?.data || error;
    }
}

export { loginUser, registerUser, getUser, updateUser, passwordChange };
