import axiosClient from "./axiosClient";

const productApi = {
  getCategories: () => {
    // Giả sử đường dẫn API là /categories
    return axiosClient.get("/categories");
  },

  // Bạn có thể thêm các API khác ở đây, ví dụ:
  getProducts: () => {
    return axiosClient.get("/products");
  }
};

export default productApi;