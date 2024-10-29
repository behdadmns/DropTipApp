import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import QRCode from "react-native-qrcode-svg";

const QRCodeCard = ({ price, qrCodeUri }: { price: number; qrCodeUri: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>{price} AED</Text>
      <QRCode value={qrCodeUri} size={160} />
      <Text style={styles.description}>Scan the QR code to quickly connect</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: '#E6E8EA',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: '#000',
    fontSize: 32,
    textAlign: 'center',
  },
  qrCode: {
    width: 160,
    height: 160,
  },
  description: {
    color: '#848F9A',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default QRCodeCard;
