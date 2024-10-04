import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import styles from './style';

interface CameraProps {
  onCapture: (uri: string, type: 'photo' | 'video') => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const cameraRef = useRef<RNCamera | null>(null);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('back');
  const [captureMode, setCaptureMode] = useState<'photo' | 'video'>('photo');
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);

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
            setVideoUri(null); // Reset videoUri when starting a new recording
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

  const handlePictureTaken = useCallback(() => {
    console.log('Picture taken');
  }, []);

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
    <View style={styles.container}>
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
        onPictureTaken={handlePictureTaken}
        onRecordingStart={handleRecordingStart}
        onRecordingEnd={handleRecordingEnd}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={toggleCameraType} style={styles.control}>
          <Text style={styles.text}>Switch Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleCaptureMode} style={styles.control}>
          <Text style={styles.text}>{captureMode === 'photo' ? 'Switch to Video' : 'Switch to Photo'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCapture} style={styles.capture}>
          <Text style={styles.captureText}>
            {captureMode === 'photo' ? 'SNAP' : (isRecording ? 'STOP' : 'RECORD')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Camera;