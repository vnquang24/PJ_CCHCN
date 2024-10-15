import React, { useState, useEffect } from 'react';
import {PermissionsAndroid, View, TextInput, Button, KeyboardAvoidingView, Platform, TouchableOpacity, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Image } from '../../../../store/models/disaster-models';
import styles from './style';

interface MediaFormProps {
    onSubmit: (mediaInfo: Omit<Image, 'id'>) => void;
    mediaUri: string;
    mediaType: 'photo' | 'video';
}

const MediaForm: React.FC<MediaFormProps> = ({ onSubmit, mediaUri, mediaType }) => {
    const [des, setDes] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [isManualInput, setIsManualInput] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    const [locationError, setLocationError] = useState(false);

    useEffect(() => {
        if (Platform.OS === 'android') {
            checkLocationPermission();
        } else {
            setHasLocationPermission(true);
        }
    }, []);

    const checkLocationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            try {
                const granted = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted) {
                    setHasLocationPermission(true);
                } else {
                    const result = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "Yêu cầu quyền truy cập vị trí",
                            message: "Ứng dụng cần quyền truy cập vị trí để xác định tọa độ của bạn.",
                            buttonNeutral: "Hỏi lại sau",
                            buttonNegative: "Từ chối",
                            buttonPositive: "Đồng ý"
                        }
                    );
                    setHasLocationPermission(result === PermissionsAndroid.RESULTS.GRANTED);
                }
            } catch (err) {
               // console.warn(err);
                setHasLocationPermission(false);
            }
        }
    };

    const getCurrentLocation = () => {
        if (Platform.OS === 'android' && !hasLocationPermission) {
            checkLocationPermission();
            return;
        }
        setIsLoading(true);
        setLocationError(false);
        Geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude.toString());
                setLng(position.coords.longitude.toString());
                setIsLoading(false);
            },
            (error) => {
                setIsLoading(false);
                setLocationError(true);
            },
            { enableHighAccuracy: false, timeout: 2000, maximumAge: 1000 }
        );
    };

    const toggleInputMethod = () => {
        setIsManualInput(!isManualInput);
        if (!isManualInput) {
            setLat('');
            setLng('');
        }
    };
    const handleSubmit = () => {
        onSubmit({
            uri: mediaUri,
            des,
            coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
            type: mediaType,
        });
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TextInput
                style={styles.input}
                placeholder="Mô tả"
                value={des}
                onChangeText={setDes}
            />
            <TouchableOpacity style={styles.toggleButton} onPress={toggleInputMethod}>
                <Text style={styles.toggleButtonText}>
                    {isManualInput ? 'Sử dụng vị trí hiện tại' : 'Nhập thủ công'}
                </Text>
            </TouchableOpacity>
            {isManualInput ? (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Vĩ độ"
                        value={lat}
                        onChangeText={setLat}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Kinh độ"
                        value={lng}
                        onChangeText={setLng}
                        keyboardType="numeric"
                    />
                </>
            ) : (
                <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>Vĩ độ: {lat}</Text>
                    <Text style={styles.locationText}>Kinh độ: {lng}</Text>
                    <TouchableOpacity 
                        style={[styles.locationButton, (isLoading || (Platform.OS === 'android' && !hasLocationPermission)) && styles.disabledButton]} 
                        onPress={getCurrentLocation}
                        disabled={isLoading || (Platform.OS === 'android' && !hasLocationPermission)}
                    >
                        <Text style={styles.locationButtonText}>
                            {isLoading ? 'Đang xác định...' : 
                             Platform.OS === 'android' && !hasLocationPermission ? 'Yêu cầu quyền truy cập' : 
                             locationError ? 'Thử lại' : 'Xác định vị trí'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Lưu" onPress={handleSubmit} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default MediaForm;
