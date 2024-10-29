import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { apiCall } from "../services/apiService";
import CustomInput from "../components/FloatingLabelInput";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    // اعتبارسنجی: بررسی خالی نبودن فیلدها
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    // بررسی مطابقت پسوردها
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // آماده‌سازی داده‌ها برای API
    const registerData = {
      email: email,
      password: password,
      hasProducerAccount: true,
    };

    setLoading(true);

    try {
      // فراخوانی API ثبت‌نام
      const response = await apiCall("/auth/register", "POST", registerData);
      if (response && response.statusCode === 201) {
        Alert.alert(
          "Registration Successful",
          "Check your email to verify your account."
        );
        router.replace("/check-email"); // هدایت به صفحه‌ی check-email در صورت موفقیت
      }
      // می‌توانید کاربر را به صفحه دیگری هدایت کنید
    } catch (error) {
   
      if (error instanceof Error) {
        Alert.alert("Login Failed", error.message || "An error occurred.");
      } else {
        Alert.alert("Login Failed", "An unknown error occurred.");
      }
    } finally {
      setLoading(false); // غیر فعال کردن حالت لودینگ
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://upload-file-droplinked.s3.amazonaws.com/25b5af933969e7a1be8bf31a71f63f415da373a35f8fe3219d9f3e7c1cad48a2.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Create Your Account</Text>
        <Text style={styles.subText}>
          Join now and start tipping in seconds.
        </Text>

        <View style={styles.inputsContainer}>
          <CustomInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />

          <CustomInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <CustomInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title={loading ? "Registering..." : "Register"}
            onPress={handleRegister}
            disabled={loading}
          />
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 160,
    marginBottom: 24,
  },
  welcomeText: {
    color: "#000",
    fontSize: 24,
    marginBottom: 8,
  },
  subText: {
    color: "#848F9A",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  inputsContainer: {
    width: "100%",
    gap: 16,
  },
  buttonContainer: {
    width: "100%",
    paddingTop: 80,
  },
});
