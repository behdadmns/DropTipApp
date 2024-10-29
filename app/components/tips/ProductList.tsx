import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable ,
} from "react-native";
import { useRouter } from "expo-router";

interface ProductListProps {
  products: any[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const router = useRouter();

  const goToPaymentScreen = (productId: string) => {
    router.push({
      pathname: "/PaymentScreen", // مسیری که برای صفحه پرداخت تعریف کرده‌اید
      params: { productId },
    });
  };

  return (
    <View style={styles.container}>
      {products.map((item, index) => (
        <Pressable key={index} style={styles.card} onPress={()=>{goToPaymentScreen(item._id)}}>
          <Text style={styles.title}>Tip Title</Text>
          <Text style={styles.price}>{item.highestPrice} AED</Text>
        </Pressable >
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 16,

    marginBottom: 16,
  },

  title: {
    fontSize: 14,
    color: "#848F9A",
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    color: "#000",
    fontWeight: "bold",
  },
});
export default ProductList;
