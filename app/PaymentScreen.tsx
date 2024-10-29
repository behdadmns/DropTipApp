import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { apiCall } from "./services/apiService";

import FancyLoader from "./components/tips/FancyLoader";
import LoadingSpinner from "./components/LoadingSpinner";
import QRCodeCard from "./components/QRCodeCard";
import NFCComponent from "./components/NFCComponent";
const PaymentScreen = () => {
  // استفاده از useLocalSearchParams برای دریافت پارامترها
  const { productId } = useLocalSearchParams<{ productId: string }>();
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null); // ذخیره لینک پرداخت
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const processPayment = async () => {
      try {
        // 1. دریافت محصول و اطلاعات فروشگاه
        const productResponse = await apiCall(`/product/link/${productId}`);

        // 2. ایجاد کارت موقت
        const cartResponse = await apiCall(
          "/cart/public/anonymous-cart",
          "POST"
        );
        const newCartId = cartResponse.data._id;

        // 3. اضافه کردن محصول به کارت
        await apiCall(`/cart/v2/public/anonymous-cart/${newCartId}`, "POST", {
          quantity: 1,
          shopID: productResponse.data.shop._id,
          skuID: productResponse.data.product.skuIDs[0]._id,
        });

        // 4. اضافه کردن جزئیات اضافی به کارت
       let data = await apiCall(
          `/checkout/anon/${newCartId}/additional-details`,
          "PATCH",
          {
            email: "bedi.mns@gmail.com",
          }
        );
        setPrice(data.data.totalCart.totalPayment)
        // 5. فراخوانی نهایی برای پرداخت با Stripe
        const stripeResponse = await apiCall(
          `/checkout/v2/public/anonymous-cart/${newCartId}/stripeSession`,
          "POST",
          {
            email: "bedi.mns@gmail.com",
          }
        );
        setPaymentUrl(stripeResponse?.data?.paymentSession);
        setLoading(false);
        // بررسی موفقیت آمیز بودن پرداخت
        if (stripeResponse) {
          Alert.alert(
            "Payment Initiated",
            "Your payment has been initiated successfully."
          );
        }
      } catch (error) {
        console.error("Error in payment process:", error);
        Alert.alert("Error", "An error occurred during the payment process.");
      } finally {
        setLoading(false);
      }
    };

    // شروع فرایند پرداخت
    processPayment();
  }, [productId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Text style={styles.title}>Droplinked</Text>
          <QRCodeCard price={price} qrCodeUri={paymentUrl || ""} />
          <NFCComponent url={paymentUrl || ""} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // همه اجزا را وسط چین می‌کند
    justifyContent: "flex-start", // شروع از بالا
    gap: 60,
    backgroundColor:'#fff'
  },
  title: {
    color: "#000",
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom:60,
    paddingTop:60
  },
});

export default PaymentScreen;
