import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
});

export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const login = async (email, password) => {
    const response = await api.post("api/vi/auth/login", { email, password });

    const { token } = response.data?.token;
    if (token) {
        setToken(token);
    }
    return response.data;
};

export const register = async(userData) => {
    const response = await api.post("api/v1/auth/register", userData);
    return response.data;
};



export const getMe = async () => {
    const token = getToken();
    const response = await api.get("api/v1/auth/me", {
        headers: token
            ? {
                Authorization: `Bearer ${token}`,
            }
            : {},
    });
    return response.data;
};  

export default {
   login,
  register,
  getMe,
  getToken,
  setToken,
  removeToken,
}