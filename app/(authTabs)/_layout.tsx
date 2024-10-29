import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon"; // اگر آیکون‌ها را دارید، از این مسیر استفاده کنید
import { Colors } from "@/constants/Colors"; // رنگ‌های تب را می‌توانید از اینجا تنظیم کنید
import { useColorScheme } from "@/hooks/useColorScheme"; // برای انتخاب رنگ بر اساس تم
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AuthTabs() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          router.replace("/(authTabs)");
        } else {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.replace("/(tabs)");
      }
    };

    checkAuth();
  }, []);


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"} // آیکون مناسب برای پروفایل
              color={color}
            />
          ),
        }}
      />

      {/* تب Tip */}
      <Tabs.Screen
        name="TipScreen"
        options={{
          title: "Tip",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "500",
            fontStyle: "normal",
            color: "#4E575F",
          },
          tabBarItemStyle: {
            paddingHorizontal: 24,
            borderRadius: 12,
          },
          tabBarActiveBackgroundColor: "rgba(41, 88, 255, 0.10)",
          tabBarActiveTintColor: "#2958FF",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cash" : "cash-outline"} // آیکون مناسب برای تب tip
              color={color}
            />
          ),
        }}
      />

     
    </Tabs>
  );
}
