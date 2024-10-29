import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyProductState from '../components/tips/EmptyProductState';
import ProductList from '../components/tips/ProductList';

export default function TipScreen() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    // این تابع تنها یک بار اجرا می‌شود
    const loadProducts = async () => {
      try {
        // تلاش برای دریافت محصولات از AsyncStorage
        const storedProducts = await AsyncStorage.getItem('products');
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts);
          // بررسی می‌کنیم که آرایه محصولات خالی نباشد
          if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
            setProducts(parsedProducts);
          }
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  const updateProducts = (newProducts: any[]) => {
    setProducts(newProducts);
  };

  return (
    <View style={styles.container}>
      
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <EmptyProductState updateProducts={updateProducts} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
