import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "@/app/services/apiService";
import CustomInput from "../FloatingLabelInput";
import CustomButton from "../CustomButton";
import Layout from "../Layout";

interface ChooseUsernameScreenProps {
  onClose: () => void;
}

const ChooseUsernameScreen: React.FC<ChooseUsernameScreenProps> = ({
  onClose,
}) => {
  const [newShopName, setNewShopName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const checkShopNameAvailability = async (name: string) => {
    setLoading(true);
    setStatusMessage("Checking availability...");
    try {
      const response = await apiCall(
        "/shop/check-shop-name",
        "POST",
        { shopName: name },
        {},
        true
      );
      if (response.data) {
        setIsAvailable(true);
        setStatusMessage("Name is available!");
      } else {
        setIsAvailable(false);
        setStatusMessage("Name is not available.");
      }
    } catch (error) {
      setStatusMessage("Error checking availability.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (newShopName.trim()) {
        checkShopNameAvailability(newShopName);
      } else {
        setStatusMessage("");
        setIsAvailable(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [newShopName]);

  const handleConfirm = async () => {
    if (!isAvailable || newShopName.trim() === "") return;

    setLoading(true);
    setStatusMessage("Saving name...");

    try {
      const shopData = await AsyncStorage.getItem("shop");
      const shop = shopData ? JSON.parse(shopData) : null;
      const shopId = shop?._id;

      if (shopId) {
        const response = await apiCall(
          `/shop/${shopId}/shop-name`,
          "PUT",
          { shopName: newShopName },
          {},
          true
        );
        await AsyncStorage.setItem("shop", JSON.stringify(response.data.shop));
        setStatusMessage("Name saved successfully!");
        onClose();
      } else {
        setStatusMessage("Shop ID not found.");
      }
    } catch (error) {
      setStatusMessage("Error saving name.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={{ uri: "https://upload-file-droplinked.s3.amazonaws.com/7892629c5291a818efbcdefc9074d0e4d29f4562b3569b3b925adfffd1b44f78.png" }} // Replace with your image URL
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Choose a Username</Text>
        <Text style={styles.subtitle}>
          Choose a unique username to get started.
        </Text>

        <CustomInput
          placeholder="Username"
          value={newShopName}
          onChangeText={setNewShopName}
        />

        <Text
          style={{ ...styles.status, color: isAvailable ? "green" : "red" }}
        >
          {statusMessage}
        </Text>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Continue"
            onPress={handleConfirm}
            disabled={!isAvailable || loading}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 60,
    marginBottom: 24,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    color: "#848F9A",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  status: {
    fontSize: 14,
    marginVertical: 8,
  },
  buttonContainer: {
    width: "100%",
    paddingTop:20
  },
});

export default ChooseUsernameScreen;
