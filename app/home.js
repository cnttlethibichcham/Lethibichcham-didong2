import { FlatList, Image, Text, View } from "react-native";
import productApi from "../api/productApi";
import useFetch from "../hooks/useFetch";

export default function Home() {
  const { data: categories, loading } = useFetch(productApi.getCategories);

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đang tải dữ liệu...</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingTop: 50, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Danh mục sản phẩm</Text>

      <FlatList
        data={categories}
        numColumns={3}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Fallback nếu không có id
        columnWrapperStyle={{ justifyContent: 'space-between' }} // Căn đều các cột
        renderItem={({ item }) => (
          <View style={{ margin: 5, alignItems: "center", width: '30%' }}>
            <Image
              source={{ uri: item.img || 'https://via.placeholder.com/50' }} // Ảnh mặc định nếu thiếu
              style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee' }}
            />
            <Text style={{ textAlign: 'center', marginTop: 5 }}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}