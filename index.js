import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// --- 1. MÀN HÌNH ĐĂNG NHẬP (LOGIN) ---
const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Xử lý logic đăng nhập ở đây (API)
        if (!phone || !password) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        Alert.alert('Thành công', `Đăng nhập với SĐT: ${phone}`);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.inner}>
                    <Text style={styles.headerTitle}>Chào mừng trở lại!</Text>
                    <Text style={styles.subTitle}>Đăng nhập để tiếp tục</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số điện thoại"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.forgotPassContainer}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
                        <Text style={styles.primaryButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.linkText}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

// --- 2. MÀN HÌNH ĐĂNG KÝ (REGISTER) ---
const RegisterScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!fullName || !phone || !password) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }
        // Gọi API đăng ký
        Alert.alert('Thành công', 'Đăng ký tài khoản thành công!');
        navigation.goBack(); // Quay lại màn hình đăng nhập
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View style={styles.inner}>
                        <Text style={styles.headerTitle}>Tạo tài khoản</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Họ và tên</Text>
                            <TextInput style={styles.input} placeholder="Nguyễn Văn A" value={fullName} onChangeText={setFullName} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Số điện thoại</Text>
                            <TextInput style={styles.input} placeholder="0987654321" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            <TextInput style={styles.input} placeholder="******" secureTextEntry value={password} onChangeText={setPassword} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Xác nhận mật khẩu</Text>
                            <TextInput style={styles.input} placeholder="******" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
                        </View>

                        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
                            <Text style={styles.primaryButtonText}>Đăng ký</Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Đã có tài khoản? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={styles.linkText}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

// --- 3. MÀN HÌNH QUÊN MẬT KHẨU (FORGOT PASSWORD) ---
const ForgotPasswordScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');

    const handleSendCode = () => {
        if (!phone) {
            Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại');
            return;
        }
        // Giả lập gửi OTP
        Alert.alert('Đã gửi mã OTP', `Mã xác thực đã được gửi đến ${phone}. Vui lòng kiểm tra tin nhắn.`);
        // Ở thực tế, bạn sẽ chuyển sang màn hình nhập OTP tại đây
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.inner}>
                    <Text style={styles.headerTitle}>Quên mật khẩu?</Text>
                    <Text style={styles.subTitle}>Nhập số điện thoại đăng ký để lấy lại mật khẩu.</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập số điện thoại của bạn"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <TouchableOpacity style={styles.primaryButton} onPress={handleSendCode}>
                        <Text style={styles.primaryButtonText}>Gửi mã xác thực</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 20, alignSelf: 'center' }} onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#666' }}>Quay lại đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

// --- MAIN APP ---
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// --- STYLES ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    forgotPassContainer: {
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    forgotPassText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    primaryButton: {
        height: 50,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    footerText: {
        color: '#666',
    },
    linkText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});
import { AppRegistry } from 'react-native';
// Đăng ký component với tên là 'main' (Expo yêu cầu tên này)
AppRegistry.registerComponent('main', () => App);

export default App;