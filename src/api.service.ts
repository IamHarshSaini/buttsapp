import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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

export const getSocialurl = async (social: any) => {
  return await api.get(`auth/social/${social}`);
};

export const verifySocialAuth = async (social: any, code: any) => {
  return await api.post(`auth/social/${social}`, { code });
};
