import { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid, Platform, Alert } from 'react-native';
import { canGoBack, goBack } from './use-navigation';

export const useDoubleBackPress = () => {
  const lastBackPressed = useRef(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack()) {
        goBack();
        return true;
      }

      const currentTime = new Date().getTime();

      if (currentTime - lastBackPressed.current < 2000) {
        Alert.alert(
          'Xác nhận thoát',
          'Bạn có chắc chắn muốn thoát ứng dụng?',
          [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Đồng ý', onPress: () => BackHandler.exitApp() }
          ]
        );
        return true;
      }

      lastBackPressed.current = currentTime;

      if (Platform.OS === 'android') {
        ToastAndroid.show('Nhấn lần nữa để thoát', ToastAndroid.SHORT);
      }

      return true;
    });

    return () => backHandler.remove();
  }, []);
};