// services/apiService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "https://apiv3dev.droplinked.com";

export async function apiCall(
  endpoint: string,
  method: string = "GET",
  data: any = null,
  headers: any = {},
  requiresAuth: boolean = false // پیش‌فرض به false تنظیم شده است
) {
  const url = `${BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  // اگر نیاز به احراز هویت باشد، access_token را اضافه می‌کنیم
  if (requiresAuth) {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No access token found in storage");
    }
  }

  const config: RequestInit = {
    method: method,
    headers: defaultHeaders,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "An error occurred");
    }

    return result;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
}