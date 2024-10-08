import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './style';

interface WebViewComponentProps {
  url: string;
}

const WebViewComponent: React.FC<WebViewComponentProps> = ({ url }) => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        scrollEnabled={true}
        bounces={true}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={true}
      />
    </View>
  );
};

export default WebViewComponent;