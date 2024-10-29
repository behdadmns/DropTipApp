import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const tabOptions = {
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
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="login"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "login",
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
              name={focused ? "log-in" : "log-in-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "register",
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
              name={focused ? "person-add" : "person-add-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
