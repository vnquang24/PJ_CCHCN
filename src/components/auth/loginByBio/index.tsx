import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { useStoreActions } from '../../../store';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const LoginByBio: React.FC = () => {
  const setIsLoggedIn = useStoreActions((actions) => actions.login.setIsLoggedIn);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const checkBiometricAvailability = async () => {
    try {
        const rnBiometrics = new ReactNativeBiometrics();
        const { available, biometryType } = await rnBiometrics.isSensorAvailable();
        console.log('Biometric available:', available, 'Type:', biometryType);
        setBiometricAvailable(available);
        setBiometricType(biometryType || null);
      } catch (error) {
        console.error('Error checking biometric availability:', error);
        Alert.alert('Error', 'An error occurred while checking biometrics availability.');
      }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Xác thực để đăng nhập' });
      if (success) {
        // Simulate server communication delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoggedIn(true);
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed');
      }
    } catch (error) {
      console.error('Error during biometric authentication:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
    } finally {
      setIsLoading(false);
    }
  };

  if (!biometricAvailable) {
    return <Text>Biometric not available</Text>;
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />
      ) : (
        <TouchableOpacity onPress={handleBiometricLogin} style={styles.button}>
          <Icon 
            name="finger-print-outline"
            size={24} 
            color="#fff" 
          />
          <Text style={styles.buttonText}>
            Đăng nhập bằng vân tay
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoginByBio;