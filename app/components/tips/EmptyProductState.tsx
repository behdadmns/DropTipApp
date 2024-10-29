import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiCall } from "../../services/apiService"; // مسیر را به درستی تنظیم کنید

interface EmptyProductStateProps {
  updateProducts: (newProducts: any[]) => void;
}


const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={styles.imageSkeleton} />
    <View style={styles.textSkeletonShort} />
    <View style={styles.textSkeletonLong} />
  </View>
);

const SkeletonGrid = () => (
  <View style={styles.container}>
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </View>
);



const EmptyProductState: React.FC<EmptyProductStateProps> = ({
  updateProducts,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // مرحله اول: دریافت محصولات
        const response = await apiCall(
          "/product?page=1&limit=15",
          "GET",
          null,
          {},
          true
        );
        const products = response.data?.data || [];

        if (products.length > 0) {
          // اگر محصولات موجود بود، ذخیره‌سازی در لوکال و آپدیت استیت
          await AsyncStorage.setItem("products", JSON.stringify(products));
          updateProducts(products);
        } else {
          // اگر محصولات خالی بود، ایجاد محصولات نمونه
          const collectionId = await createCollection();
          await createSampleProducts(collectionId);
        }
      } catch (error) {
        console.error("Error fetching or creating products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // تابع برای ایجاد کالکشن
  const createCollection = async () => {
    try {
      const response = await apiCall(
        "/collection/list/minimal",
        "GET",
        null,
        {},
        true
      );
      return response.data[0]._id;
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  };

  // تابع برای ایجاد محصولات نمونه
  const createSampleProducts = async (collectionId: string) => {
    const sampleProducts = [
      {
        title: "5usd product",
        price: 5,
      },
      {
        title: "10usd product",
        price: 10,
      },
      {
        title: "20usd product",
        price: 20,
      },
    ];

    for (const product of sampleProducts) {
      await apiCall(
        "/product",
        "POST",
        {
          description: "<p>5usd product</p>",
          media: [
            {
              isMain: true,
              url: "https://upload-file-droplinked.s3.amazonaws.com/9eb1637e190fb598bdf4ad030cb30962a93c10fbdcb65142700890a9deacc453.jpg",
              thumbnail:
                "https://upload-file-droplinked.s3.amazonaws.com/9eb1637e190fb598bdf4ad030cb30962a93c10fbdcb65142700890a9deacc453_small.jpg",
            },
          ],
          priceUnit: "USD",
          productCollectionID: collectionId,
          product_type: "DIGITAL",
          publish_product: true,
          purchaseAvailable: true,
          shippingType: "EASY_POST",

          shippingPrice: 0,
          title: product.title,
          sku: [
            {
              externalID: "",
              price: product.price,
              dimensions: {
                height: 0,
                length: 0,
                width: 0,
              },
              quantity: 1000,
              recorded_quantity: 1000,
              recordData: {},
              deploy_hash: "",
              weight: null,
            },
          ],
        },
        {},
        true
      );
    }

    // ذخیره‌سازی محصولات جدید در AsyncStorage
    const updatedProducts = await apiCall(
      "/product?page=1&limit=15",
      "GET",
      null,
      {},
      true
    );
    await AsyncStorage.setItem(
      "products",
      JSON.stringify(updatedProducts.data.data)
    );
    updateProducts(updatedProducts.data.data);
  };

  return (
    
      <SkeletonGrid />
  
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  card: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  imageSkeleton: {
    width: 32,
    height: 32,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 8,
  },
  textSkeletonShort: {
    width: '60%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 6,
  },
  textSkeletonLong: {
    width: '80%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});


export default EmptyProductState;
