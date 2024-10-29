import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NfcManager, { NfcTech, Ndef } from 'react-native-nfc-manager';
import { useEffect } from 'react';

interface NFCComponentProps {
  url: string;
}

const NFCComponent: React.FC<NFCComponentProps> = ({ url }) => {
  useEffect(() => {
    NfcManager.start();

    const writeNfc = async () => {
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const bytes = Ndef.encodeMessage([Ndef.textRecord(url)]);
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        await NfcManager.setAlertMessageIOS('URL shared via NFC!');
      } catch (ex) {
        console.warn(ex);
      } finally {
        NfcManager.cancelTechnologyRequest();
      }
    };

    writeNfc();
  }, [url]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="nfc" size={20} color="#000" />
      </View>
      <Text style={styles.title}>Receive Tips via NFC</Text>
      <Text style={styles.subtitle}>Tap devices to collect tips instantly!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#F9FAFA',
    alignItems: 'center',

  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6E8EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    color: '#848F9A',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NFCComponent;
