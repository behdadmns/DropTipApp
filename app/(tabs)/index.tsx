import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "../services/apiService";
import CustomInput from "../components/FloatingLabelInput";
import CustomButton from "../components/CustomButton";
import Layout from "../components/Layout";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      console.error("Validation Error", "Email and password are required.");
      Alert.alert("Validation Error", "Email and password are required.");
      return;
    }

    const loginData = {
      email: email,
      password: password,
      userType: "PRODUCER",
    };

    setLoading(true);

    try {
      const data = await apiCall("/auth/login/basic", "POST", loginData);
      console.log("data ", data.data.shop.name);
      await AsyncStorage.setItem("access_token", data.data.access_token);
      await AsyncStorage.setItem("refresh_token", data.data.refresh_token);
      await AsyncStorage.setItem("shop", JSON.stringify(data.data.shop)); // ذخیره به‌صورت رشته
      await AsyncStorage.setItem("user", JSON.stringify(data.data.user));
      router.replace("/(authTabs)");
      Alert.alert("Login Successful", "You have been logged in.");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Login Failed", error.message || "An error occurred.");
      } else {
        Alert.alert("Login Failed", "An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://upload-file-droplinked.s3.amazonaws.com/e77a6ee07e8617f7ddc5903d1e121df72b43a3f411ffb4228e107b6d726f9ebd.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subText}>
          Log in and continue receiving tips with ease.
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
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title={loading ? "Logging in..." : "Log In"}
            onPress={handleLogin}
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
