import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';

interface CameraProps {
  onCapture: (uri: string, type: 'photo' | 'video') => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const cameraRef = useRef<RNCamera | null>(null);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [captureMode, setCaptureMode] = useState<'photo' | 'video'>('photo');
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0);

  const onPinchGesture = useCallback((event: PinchGestureHandlerGestureEvent) => {
    const { scale } = event.nativeEvent;
    const newZoom = Math.max(0, Math.min(1, zoom + (scale - 1) * 0.01));
    setZoom(newZoom);
  }, [zoom]);

  const handleCapture = useCallback(async () => {
    if (cameraRef.current) {
      if (captureMode === 'photo') {
        try {
          const options = { quality: 1, base64: true };
          const data: TakePictureResponse = await cameraRef.current.takePictureAsync(options);
          if (data.uri) {
            onCapture(data.uri, 'photo');
          }
        } catch (error) {
          console.error('Error taking picture:', error);
        }
      } else {
        if (isRecording) {
          try {
            await cameraRef.current.stopRecording();
          } catch (error) {
            console.error('Error stopping video recording:', error);
          }
        } else {
          try {
            setVideoUri(null);
            const options = {
              quality: RNCamera.Constants.VideoQuality['720p'],
            };
            await cameraRef.current.recordAsync(options);
          } catch (error) {
            console.error('Error starting video recording:', error);
          }
        }
      }
    }
  }, [captureMode, isRecording, onCapture]);


  const handleRecordingStart = useCallback((event: {
    nativeEvent: {
      uri: string;
      videoOrientation: number;
      deviceOrientation: number;
    };
  }) => {
    console.log('Recording started:', event.nativeEvent);
    setIsRecording(true);
    setVideoUri(event.nativeEvent.uri);
  }, []);

  const handleRecordingEnd = useCallback(() => {
    console.log('Recording ended');
    setIsRecording(false);
    if (videoUri) {
      onCapture(videoUri, 'video');
    }
  }, [videoUri, onCapture]);

  const toggleCameraType = () => {
    setCameraType(prev => prev === 'back' ? 'front' : 'back');
  };

  const toggleCaptureMode = () => {
    setCaptureMode(prev => prev === 'photo' ? 'video' : 'photo');
  };

  useEffect(() => {
    return () => {
      if (isRecording && cameraRef.current) {
        cameraRef.current.stopRecording();
      }
    };
  }, [isRecording]);

  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <PinchGestureHandler onGestureEvent={onPinchGesture}>
          <View style={{ flex: 1 }}>
            <RNCamera
              ref={cameraRef}
              style={styles.preview}
              type={cameraType === 'front' ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              onRecordingStart={handleRecordingStart}
              onRecordingEnd={handleRecordingEnd}
              zoom={zoom}
            />
          </View>
        </PinchGestureHandler>
        <View style={styles.zoomIndicator}>
          <Text style={styles.zoomText}>{`${(zoom * 100).toFixed(0)}%`}</Text>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={toggleCameraType} style={styles.controlButton}>
            <Icon name="camera-reverse-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCapture} style={styles.captureButton}>
            {captureMode === 'photo' ? (
              <Icon name="camera-outline" size={40} color="black" />
            ) : (
              <Icon name={isRecording ? 'stop-circle-outline' : 'videocam-outline'} size={40} color="black" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCaptureMode} style={styles.controlButton}>
            <Icon name={captureMode === 'photo' ? 'videocam-outline' : 'camera-outline'} size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default Camera;