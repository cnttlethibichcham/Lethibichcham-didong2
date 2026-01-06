import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://YOUR_IP_ADDRESS:3000/api', // Nhớ thay IP
  headers: {
    'content-type': 'application/json',
  },
});

// Interceptor Request (Gửi đi)
axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('userToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // LOG ĐỂ KIỂM TRA REQUEST
  console.log(`>>> Gửi Request [${config.method.toUpperCase()}]:`, config.url);

  return config;
});

// Interceptor Response (Nhận về)
axiosClient.interceptors.response.use(
  (response) => {
    // LOG ĐỂ KIỂM TRA KẾT QUẢ TRẢ VỀ
    console.log(`<<< Kết quả [${response.config.url}]:`, response.data);

    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    // LOG ĐỂ KIỂM TRA LỖI
    console.log("!!! Lỗi API:", error.response ? error.response.data : error.message);
    throw error;
  }
);

export default axiosClient;