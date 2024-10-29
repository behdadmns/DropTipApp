import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiCall } from '../services/apiService';

interface ShopNameModalProps {
  visible: boolean;
  onClose: () => void;
}

const ShopNameModal: React.FC<ShopNameModalProps> = ({ visible, onClose }) => {
  const [newShopName, setNewShopName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  // تابع برای بررسی موجود بودن نام
  const checkShopNameAvailability = async (name: string) => {
    setLoading(true);
    setStatusMessage("Checking availability...");
    try {
      const response = await apiCall('/shop/check-shop-name', 'POST', { shopName: name }, {}, true);
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

  // Debounce برای جلوگیری از ارسال درخواست در هنگام تایپ
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (newShopName.trim()) {
        checkShopNameAvailability(newShopName);
      } else {
        setStatusMessage('');
        setIsAvailable(false);
      }
    }, 1000); // 1 ثانیه تاخیر

    return () => clearTimeout(delayDebounceFn);
  }, [newShopName]);

  const handleConfirm = async () => {
    if (!isAvailable || newShopName.trim() === '') return;

    setLoading(true);
    setStatusMessage("Saving name...");
    
    try {
      const shopData = await AsyncStorage.getItem('shop');
      const shop = shopData ? JSON.parse(shopData) : null;
      const shopId = shop?._id;

      if (shopId) {
        const response = await apiCall(`/shop/${shopId}/shop-name`, 'PUT', { shopName: newShopName }, {}, true);
        await AsyncStorage.setItem('shop', JSON.stringify(response.data.shop));
        setStatusMessage("Name saved successfully!");
        onClose()
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
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter a new shop name</Text>
          <TextInput
            style={styles.input}
            placeholder="New Shop Name"
            value={newShopName}
            onChangeText={setNewShopName}
          />
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text style={styles.status}>{statusMessage}</Text>
          )}
          <Button title="Confirm" onPress={handleConfirm} disabled={!isAvailable || loading} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  status: {
    marginTop: 10,
    color: 'blue',
  },
});

export default ShopNameModal;
