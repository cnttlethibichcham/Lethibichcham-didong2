import AsyncStorage from '@react-native-async-storage/async-storage'; // Import này
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import authApi from "../api/authApi";

export default function Login({ navigation }) { // Thêm navigation nếu cần chuyển trang
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await authApi.login({ email, password });

      // Giả sử server trả về: { token: 'abc...', user: { name: 'Teo' } }
      console.log("Kết quả API:", res);

      // 1. Lưu token vào bộ nhớ máy
      if (res.token) {
        await AsyncStorage.setItem('userToken', res.token);
        await AsyncStorage.setItem('userData', JSON.stringify(res.user));
      }

      Alert.alert("Thành công", "Đăng nhập thành công!", [
        { text: "OK", onPress: () => console.log("Chuyển màn hình Home tại đây") }
      ]);

      // navigation.replace('Home'); // Chuyển sang màn hình chính

    } catch (err) {
      console.log("Lỗi:", err);
      Alert.alert("Lỗi", "Sai thông tin đăng nhập hoặc lỗi server!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Đăng nhập</Text>

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: 'blue', padding: 15, borderRadius: 5, alignItems: 'center' }}
      >
        <Text style={{ color: 'white' }}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}