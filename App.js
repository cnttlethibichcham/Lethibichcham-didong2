import { registerRootComponent } from "expo";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

/* ==========================================================
   1. DỮ LIỆU (MOCK DATA)
   ========================================================== */

// --- DANH MỤC (Ảnh lưu trong máy) ---
const categories = [
  { id: 1, name: "Cages", img: require("./assets/images/iconcages.png") },
  { id: 2, name: "Species", img: require("./assets/images/iconhamster.png") },
  { id: 3, name: "Foods", img: require("./assets/images/iconfoods.png") },
  { id: 4, name: "Accessories", img: require("./assets/images/iconAccessories.png") },
  { id: 5, name: "Other", img: require("./assets/images/iconother.png") },
];

// --- SẢN PHẨM (Ảnh online + Giá + Mô tả) ---
const productList = [
  {
    id: 1,
    name: "Royal Canin Puppy",
    price: "150.000₫",
    img: "https://i.imgur.com/u2D9GFD.png",
    description: "Thức ăn hạt cao cấp dành cho chó con dưới 10 tháng tuổi. Giúp phát triển khung xương và hệ miễn dịch khỏe mạnh.",
  },
  {
    id: 2,
    name: "Purina One Cat",
    price: "180.000₫",
    img: "https://i.imgur.com/JuXNWZf.png",
    description: "Công thức đặc biệt giúp mèo mượt lông, sáng mắt và tiêu hóa tốt. Hương vị cá hồi và gạo thơm ngon.",
  },
  {
    id: 3,
    name: "Silver Special Dog",
    price: "250.000₫",
    img: "https://i.imgur.com/vH6vK6S.png",
    description: "Sản phẩm đặc trị dành cho các dòng chó kén ăn, bổ sung đầy đủ vitamin và khoáng chất thiết yếu.",
  },
  {
    id: 4,
    name: "Whiskas Tuna",
    price: "120.000₫",
    img: "https://cdn-icons-png.flaticon.com/512/3048/3048383.png",
    description: "Pate Whiskas vị cá ngừ đại dương, món khoái khẩu của mọi chú mèo, giàu Omega 3 & 6.",
  },
];

/* ==========================================================
   2. CÁC MÀN HÌNH (SCREENS)
   ========================================================== */

// --- MÀN HÌNH CHÀO (WELCOME) ---
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.welcomeContainer}>
      <View style={styles.logoPlaceholder}>
        <Text style={{ fontSize: 60 }}>🐾</Text>
      </View>
      <Text style={styles.welcomeTitle}>PETS CHIT CHIT</Text>
      <Text style={styles.welcomeSub}>"Tìm người bạn tri kỷ cho bạn!"</Text>
      <TouchableOpacity style={styles.welcomeBtn} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.welcomeBtnText}>Bắt đầu ngay</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- MÀN HÌNH ĐĂNG NHẬP (LOGIN) ---
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }
    // Tài khoản test: admin@gmail.com / 123
    if (email === "admin@gmail.com" && password === "123") {
      Alert.alert("Thành công", "Đăng nhập thành công!", [{ text: "OK", onPress: () => navigation.replace("Home") }]);
    } else {
      Alert.alert("Đăng nhập thất bại", "Sai email hoặc mật khẩu");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.headerTitle}>Đăng Nhập</Text>
          <Text style={styles.subTitle}>Chào mừng quay lại!</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email / SĐT</Text>
            <TextInput style={styles.input} placeholder="..." value={email} onChangeText={setEmail} autoCapitalize="none" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput style={styles.input} placeholder="..." secureTextEntry value={password} onChangeText={setPassword} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

// --- MÀN HÌNH TRANG CHỦ (HOME) ---
const HomeScreen = ({ navigation }) => {

  const renderCategory = ({ item }) => (
    <View style={styles.catBox}>
      <Image source={item.img} style={styles.catImg} />
      <Text style={styles.catLabel}>{item.name}</Text>
    </View>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      // Chuyển sang màn hình Chi tiết và gửi kèm dữ liệu sản phẩm
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <View style={styles.productImgWrapper}>
        <Image source={{ uri: item.img }} style={styles.productImg} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addToCartBtn}>
            <Text style={styles.addToCartText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.homeMain}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.topBar}>
        <Text style={styles.topIcon}>☰</Text>
        <Text style={styles.logo}>PETS CHIT CHIT</Text>
        <Text style={styles.topIcon}>🛒</Text>
      </View>
      <View style={styles.searchWrapper}>
        <TextInput placeholder="Tìm kiếm sản phẩm..." style={styles.searchInput} />
      </View>

      {/* Banner */}
      <Image source={require("./assets/images/banner.png")} style={styles.banner} />

      {/* Categories */}
      <Text style={styles.sectionTitle}>Danh mục nổi bật</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={{ marginBottom: 10 }}
      />

      {/* Product List */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Sản phẩm mới</Text>
        <Text style={styles.viewAll}>Xem tất cả</Text>
      </View>
      <FlatList
        data={productList}
        horizontal
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
      />
    </View>
  );
};

// --- MÀN HÌNH CHI TIẾT SẢN PHẨM (DETAIL) ---
const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; // Nhận dữ liệu từ Home

  return (
    <View style={styles.detailContainer}>
      {/* Nút Quay lại */}
      <TouchableOpacity style={styles.detailBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.detailBackText}>←</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Ảnh lớn */}
        <View style={styles.detailImageContainer}>
          <Image source={{ uri: product.img }} style={styles.detailImage} />
        </View>
        {/* Thông tin */}
        <View style={styles.detailInfo}>
          <Text style={styles.detailName}>{product.name}</Text>
          <Text style={styles.detailPrice}>{product.price}</Text>
          <View style={styles.divider} />
          <Text style={styles.detailDescriptionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.detailDescription}>
            {product.description || "Chưa có mô tả chi tiết."}
          </Text>
        </View>
      </ScrollView>

      {/* Thanh Mua hàng cố định */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={{ fontSize: 24 }}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={() => Alert.alert("Thông báo", "Cảm ơn bạn đã đặt hàng!")}
        >
          <Text style={styles.buyButtonText}>MUA NGAY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- CÁC MÀN HÌNH KHÁC ---
const RegisterScreen = () => (<View style={styles.centerScreen}><Text style={styles.headerTitle}>Đăng Ký</Text></View>);

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const handleResetPassword = () => {
    if (email.trim() === "") { alert("Vui lòng nhập Email!"); return; }
    alert(`Đã gửi mail đến: ${email}`); navigation.goBack();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Trở lại</Text>
        </TouchableOpacity>
        <View style={styles.inner}>
          <Text style={styles.headerTitle}>Quên mật khẩu?</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="email@gmail.com" value={email} onChangeText={setEmail} />
          </View>
          <TouchableOpacity style={styles.primaryButton} onPress={handleResetPassword}>
            <Text style={styles.primaryButtonText}>GỬI YÊU CẦU</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

/* ==========================================================
   3. CẤU HÌNH ĐIỀU HƯỚNG (NAVIGATION)
   ========================================================== */
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/* ==========================================================
   4. STYLES (GIAO DIỆN)
   ========================================================== */
const styles = StyleSheet.create({
  // Common
  centerScreen: { flex: 1, justifyContent: "center", alignItems: "center" },
  backButton: { paddingTop: 50, paddingLeft: 20, marginBottom: 10 },
  backButtonText: { fontSize: 16, color: "#FF6B6B", fontWeight: "bold" },

  // Welcome
  welcomeContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  logoPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: "#FFEAA7", justifyContent: "center", alignItems: "center", marginBottom: 20 },
  welcomeTitle: { fontSize: 28, fontWeight: "bold" },
  welcomeSub: { color: "#636e72", textAlign: "center", marginBottom: 40 },
  welcomeBtn: { backgroundColor: "#FF6B6B", paddingHorizontal: 40, paddingVertical: 15, borderRadius: 30 },
  welcomeBtnText: { color: "#fff", fontSize: 18 },

  // Auth (Login/Forgot)
  container: { flex: 1, backgroundColor: "#fff" },
  inner: { flex: 1, justifyContent: "center", padding: 20 },
  headerTitle: { fontSize: 30, fontWeight: "bold" },
  subTitle: { color: "#777", marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  label: { fontWeight: "bold", marginBottom: 5 },
  input: { backgroundColor: "#F3F3F3", height: 48, borderRadius: 10, paddingHorizontal: 15 },
  primaryButton: { backgroundColor: "#FF6B6B", height: 50, justifyContent: "center", alignItems: "center", borderRadius: 14, marginTop: 20 },
  primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  forgotPassText: { color: "#FF6B6B", textAlign: "right" },

  // Home Screen
  homeMain: { flex: 1, backgroundColor: "#fff", paddingTop: 35 },
  topBar: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 10 },
  topIcon: { fontSize: 22 },
  logo: { fontSize: 22, fontWeight: "bold", color: "#00210eff" },
  searchWrapper: { paddingHorizontal: 15, marginBottom: 10 },
  searchInput: { backgroundColor: "#F4F4F4", height: 45, borderRadius: 10, paddingHorizontal: 12 },
  banner: { width: "100%", height: 140, resizeMode: "cover", marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 15 },
  catBox: { width: "33.3%", alignItems: "center", marginBottom: 15 },
  catImg: { width: 55, height: 55, marginBottom: 5, resizeMode: "contain" },
  catLabel: { fontSize: 12, textAlign: "center" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, marginBottom: 10 },
  viewAll: { color: "#0a4f27ff", fontWeight: "bold" },

  // Product Card Style
  productCard: { backgroundColor: "#fff", width: 160, marginLeft: 15, marginBottom: 15, borderRadius: 12, elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, paddingBottom: 10, overflow: 'hidden' },
  productImgWrapper: { width: '100%', height: 130, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  productImg: { width: 110, height: 110, resizeMode: "contain" },
  productInfo: { paddingHorizontal: 10, paddingTop: 10 },
  productName: { fontSize: 14, fontWeight: "600", color: "#333", height: 40 },
  productPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  productPrice: { fontSize: 14, fontWeight: "bold", color: "#FF6B6B" },
  addToCartBtn: { backgroundColor: "#27ae60", width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  addToCartText: { color: "#fff", fontWeight: "bold", fontSize: 18, lineHeight: 20 },

  // Product Detail Style
  detailContainer: { flex: 1, backgroundColor: '#fff' },
  detailBackButton: { position: 'absolute', top: 40, left: 20, zIndex: 10, backgroundColor: 'rgba(255,255,255,0.8)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  detailBackText: { fontSize: 24, fontWeight: 'bold' },
  detailImageContainer: { height: 320, backgroundColor: '#f9f9f9', justifyContent: 'center', alignItems: 'center' },
  detailImage: { width: '85%', height: '85%', resizeMode: 'contain' },
  detailInfo: { padding: 20, flex: 1 },
  detailName: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  detailPrice: { fontSize: 24, fontWeight: 'bold', color: "#FF6B6B", marginBottom: 15 },
  divider: { height: 1, backgroundColor: '#eee', marginBottom: 15 },
  detailDescriptionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  detailDescription: { fontSize: 15, color: '#666', lineHeight: 22, textAlign: 'justify' },

  // Bottom Bar (Mua ngay)
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center' },
  cartButton: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, marginRight: 15 },
  buyButton: { flex: 1, backgroundColor: '#FF6B6B', height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  buyButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default registerRootComponent(App);