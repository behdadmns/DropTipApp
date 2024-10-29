import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,Linking, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from './components/CustomButton';

export default function CheckEmailScreen() {
  const router = useRouter();

  const openEmailApp = async () => {
    // Gmail
    const gmailUrl = 'googlegmail://';
    const defaultMailUrl = 'mailto:';
  
    try {
      // Check if Gmail is installed
      const supported = await Linking.canOpenURL(gmailUrl);
      if (supported) {
        await Linking.openURL(gmailUrl);
      } else {
        // Fallback to default mail app
        await Linking.openURL(defaultMailUrl);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to open email app');
    }
  };

  const handleGoBack = () => {
    router.replace("/(tabs)");
  };


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload-file-droplinked.s3.amazonaws.com/1544783c8cce0d70a77b2ea44d697e76b877f9f708c05e7c082036ac83739e63.png' }} // Replace with your image URL
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Check Your Inbox</Text>
      <Text style={styles.subtitle}>
        We’ve sent you an email to verify your account.
      </Text>

      <View style={styles.buttonContainer}>
        <CustomButton title="Back to login" onPress={handleGoBack} />
      </View>

      <TouchableOpacity onPress={openEmailApp} style={styles.resendButton}>
        <Text style={styles.resendText}>Didn’t Receive Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    color: '#848F9A',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 12,
  },
  resendButton: {
    paddingVertical: 8,
  },
  resendText: {
    color: '#2958FF',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
  },
});
