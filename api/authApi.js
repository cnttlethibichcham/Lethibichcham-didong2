import axiosClient from "./axiosClient";

const authApi = {
  login: (params) => {
    const url = '/login'; // Đường dẫn API đăng nhập (ví dụ: /api/login)
    return axiosClient.post(url, params);
  },

  register: (params) => {
    const url = '/register';
    return axiosClient.post(url, params);
  },

  // Các API khác liên quan đến Auth...
};

export default authApi;