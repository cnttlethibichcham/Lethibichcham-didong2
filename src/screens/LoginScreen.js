import { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback // Giữ nguyên import
    ,
    View
} from "react-native";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "admin" && password === "123") {
            navigation.replace("Home");
        } else {
            navigation.replace("Home");
        }
    };

    // --- THÊM ĐOẠN NÀY ---
    // Tạo một Wrapper thông minh: 
    // Nếu là Web -> Dùng View thường (để click được chuột).
    // Nếu là Mobile -> Dùng TouchableWithoutFeedback (để ẩn bàn phím).
    const KeyboardWrapper = ({ children }) => {
        if (Platform.OS === 'web') {
            return <View style={{ flex: 1 }}>{children}</View>;
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        );
    };
    // ---------------------

    return (
        // Thay TouchableWithoutFeedback cũ bằng KeyboardWrapper
        <KeyboardWrapper>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.inner}>
                    <Text style={styles.headerTitle}>Đăng Nhập</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Nhập email..."
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Nhập mật khẩu..."
                        />
                    </View>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                        <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </KeyboardWrapper>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    inner: { flex: 1, justifyContent: "center", padding: 20 },
    headerTitle: { fontSize: 30, fontWeight: "bold", marginBottom: 30, textAlign: 'center' }, // Thêm center cho đẹp
    inputContainer: { marginBottom: 15 },
    label: { fontWeight: "bold", marginBottom: 5 },
    input: { backgroundColor: "#F3F3F3", height: 48, borderRadius: 10, paddingHorizontal: 15 },
    primaryButton: { backgroundColor: "#FF6B6B", height: 50, borderRadius: 14, justifyContent: "center", alignItems: "center", marginTop: 20 },
    btnText: { color: "#fff", fontWeight: "bold" }
});

export default LoginScreen;