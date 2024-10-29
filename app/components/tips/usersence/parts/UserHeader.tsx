import React, { useEffect, useState } from 'react';;
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';


const UserHeader: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');

    useEffect(() => {
      const loadUsername = async () => {
        const shopData = await AsyncStorage.getItem("shop");
        const shop = shopData ? JSON.parse(shopData) : null;
        if (shop) {
          setUsername(shop.name);
        }
      };
  
      loadUsername();
    }, []);

    const handleLogout = async () => {
        try {
          await AsyncStorage.clear(); // پاک کردن تمام داده‌های ذخیره شده
          Alert.alert("Logged Out", "You have been logged out successfully.");
          router.replace("/(tabs)"); // بازگشت به صفحه ورود
        } catch (error) {
          console.error("Error logging out:", error);
          Alert.alert("Error", "An error occurred while logging out.");
        }
      };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://upload-file-droplinked.s3.amazonaws.com/9eb1637e190fb598bdf4ad030cb30962a93c10fbdcb65142700890a9deacc453.jpg' }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width:'100%',
    marginBottom:24
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  textContainer: {
    marginLeft: 12,
  },
  welcomeText: {
    color: '#848F9A',
    fontSize: 14,
    fontStyle: 'normal',
  },
  username: {
    color: '#000',
    fontSize: 20,
    fontWeight: '500',
    fontStyle: 'normal',
  },
  logoutButton: {
    marginLeft: 'auto',
    backgroundColor: '#E6E8EA',
    padding: 8,
    borderRadius: 12,
    width:48,
    height:48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserHeader;
