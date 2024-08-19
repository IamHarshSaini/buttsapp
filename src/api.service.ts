import axios from "axios";
let serverToken: any = null;

// cookies
import Cookies from "universal-cookie";
const cookies = new Cookies();

const api = axios.create({
  baseURL: process.env.API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config: any) {
    let token: any = cookies.get("butsapp");
    if (token) {
      config.headers.Authorization = token;
    } else if (serverToken) {
      config.headers.Authorization = serverToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const setToken = (req: any) => {
  const cookies = new Cookies(req.headers.cookie);
  serverToken = cookies.get("butsapp");
};

export const getSocialurl = async (social: any) => {
  return await api.get(`auth/social/${social}`);
};

export const verifySocialAuth = async (social: any, code: any) => {
  return await api.post(`auth/social/${social}`, { code });
};

export const getAllUsers = async () => {
  return await api.get("auth/users");
};

export const getChatMessage = async (sender: any, receiver: any) => {
  return await api.get("message", { params: { sender, receiver } });
};
