import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TipsBanner: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>the easiest way to receive tips!</Text>
        <Text style={styles.subtitle}>
          Whether it’s for great service or a simple thank you, we’ve made
          tipping quick and hassle-free.
        </Text>
      </View>
      <Image
        source={{
          uri: "https://upload-file-droplinked.s3.amazonaws.com/d349e44abc258fdb33a39a2e7cf4bf71ddfb22c86c393985d7de9252f57fb8c7.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    backgroundColor: "#F1F2F4", // Light grey as the base
    overflow: "hidden", // Ensures rounded corners apply to inner elements
     // flex: 1,
  },
  textContainer: {
    backgroundColor: "rgba(249, 250, 250, 0.5)", // Layer for pseudo-gradient
    padding: 16,
    marginBottom: 32,
    borderRadius: 16,
  },
  title: {
    color: "#000",
    fontSize: 18,
    fontStyle: "normal",
  },
  subtitle: {
    color: "#848F9A",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    marginTop: 8,
  },
  image: {
    width: "100%",
    height: "auto",
    aspectRatio: 1,
  },
});

export default TipsBanner;
