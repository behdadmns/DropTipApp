import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChooseUsernameScreen from "../components/tips/ChooseUsernameScreen";
import Layout from "../components/Layout";
import UserScreen from "../components/tips/usersence/UserScreen";

interface Shop {
  name: string;
  _id: string;
  // می‌توانید ویژگی‌های دیگر را نیز اضافه کنید
}

export default function HomeScreen() {
  const router = useRouter();


  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const shopData = await AsyncStorage.getItem("shop");
        const shop = shopData ? JSON.parse(shopData) : null;
  

        // بررسی اینکه آیا shop.name شامل کلمه default_droplinked هست یا خیر
        if (shop && shop.name && shop.name.includes("default_droplinked")) {
          setModalVisible(true); // نمایش مدال در صورت برقرار بودن شرط
        }
      } catch (error) {
        await AsyncStorage.clear(); // پاک کردن تمام داده‌های ذخیره شده
        router.replace("/(tabs)"); // بازگشت به صفحه ورود
      }
    };

    loadData();
  }, [modalVisible]);

  console.log("modalVisible ", modalVisible);

  return (
    <Layout>
      <View style={styles.container}>
        {modalVisible ? (
          <ChooseUsernameScreen onClose={() => setModalVisible(false)} />
        ) : (
          <UserScreen />
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125, // این باعث می‌شود تصویر گرد نمایش داده شود
    marginBottom: 20,
  },
  shopName: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
