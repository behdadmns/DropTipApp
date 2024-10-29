import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ReceiveTipsCard: React.FC = () => {
  const router = useRouter();
  
  const navigateToTipScreen = () => {
    router.push("/(authTabs)/TipScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Receive Tips!</Text>
        <Text style={styles.subtitle}>
          Effortless tipping at your fingertips.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToTipScreen}>
        <Ionicons name="arrow-forward" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E6E8EA",
    borderRadius: 16,
    width: "100%",
    marginBottom: 24,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
    fontStyle: "normal",
  },
  subtitle: {
    color: "#848F9A",
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#2958FF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ReceiveTipsCard;
