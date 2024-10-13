import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
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

    const handleSubmit = () => {
        onSubmit({
            uri: mediaUri,
            des,
            coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
            type: mediaType,
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Mô tả"
                value={des}
                onChangeText={setDes}
            />
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
            <Button title="Lưu" onPress={handleSubmit} />
        </View>
    );
};

export default MediaForm;