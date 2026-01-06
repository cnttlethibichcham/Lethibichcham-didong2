import { useEffect, useState } from "react";

// Hàm này nhận vào 1 function gọi API (ví dụ: productApi.getCategories)
export default function useFetch(apiCall) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Cờ kiểm tra component còn tồn tại không

    const fetchData = async () => {
      try {
        const response = await apiCall();
        if (isMounted) {
          // Tùy backend trả về, có thể là response hoặc response.data
          // Ở axiosClient mình đã config trả về data rồi, nên gán trực tiếp
          setData(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          console.log("Lỗi fetch data:", err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Cleanup function: chạy khi component bị hủy (unmount)
    return () => {
      isMounted = false;
    };
  }, []); // [] nghĩa là chỉ chạy 1 lần khi màn hình hiện lên

  return { data, loading, error };
}