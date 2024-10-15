import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useStoreState, useStoreActions } from 'easy-peasy';
import styles from './style';
import MediaSelector from '../../common/media/media-selector';
import MediaGallery from '../../common/media/media-gallery';
import { disasterTypes } from '../../../constants/disaster-types';
import Camera from '../../../components/common/media/camera';
import MediaForm from '../../common/media/media-form';
import { Image } from '../../../store/models/disaster-models';

interface DisasterFormProps {
  disasterId: number;
  isEditing: boolean;
  onToggleEdit: () => void;
}

const DisasterForm: React.FC<DisasterFormProps> = ({ disasterId, isEditing, onToggleEdit }) => {
  const disaster = useStoreState((state: any) => 
    state.disaster.disasters.find((d: any) => d.id === disasterId)
  );
  const updateDisaster = useStoreActions((actions: any) => actions.disaster.updateDisaster);
  const addImage = useStoreActions((actions: any) => actions.disaster.addImage);

  const [showCamera, setShowCamera] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<{ uri: string; type: 'photo' | 'video' } | null>(null);

  const handleSave = () => {
    updateDisaster(disaster);
    onToggleEdit();
  };

  const handleCancel = () => {
    onToggleEdit();
  };

  const handleMediaSelected = (uri: string, type: 'photo' | 'video', des: string, coordinates: { lat: number, lng: number }) => {
    const newImage = {
      id: Date.now(),
      uri,
      type,
      des,
      coordinates,
    };
    addImage({ disasterId, image: newImage });
  };

  const handleCameraCapture = (uri: string, type: 'photo' | 'video') => {
    setShowCamera(false);
    setCapturedMedia({ uri, type });
    setShowMediaForm(true);
  };

  const handleMediaFormSubmit = (mediaInfo: Omit<Image, 'id'>) => {
    setShowMediaForm(false);
    handleMediaSelected(mediaInfo.uri, mediaInfo.type, mediaInfo.des, mediaInfo.coordinates);
  };

  const renderField = (label: string, value: string, onChangeText?: (text: string) => void, multiline: boolean = false) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={[styles.input, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
        />
      ) : (
        <Text style={styles.readOnlyText}>{value}</Text>
      )}
    </View>
  );

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (index === 6) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loại thảm họa</Text>
          {isEditing ? (
            <Picker
              selectedValue={disaster.type}
              onValueChange={(itemValue: string) => updateDisaster({ ...disaster, type: itemValue })}
              style={styles.picker}
            >
              {disasterTypes.map((type) => (
                <Picker.Item key={type.value} label={type.label} value={type.value} />
              ))}
            </Picker>
          ) : (
            <Text style={styles.readOnlyText}>
              {disasterTypes.find(type => type.value === disaster.type)?.label || disaster.type}
            </Text>
          )}
        </View>
      );
    } else if (index === 7) {
      return (
        <View>
          <Text style={styles.sectionTitle}>Hình ảnh và Video</Text>
          {isEditing && (
            <MediaSelector 
              onCameraPress={() => setShowCamera(true)}
              onMediaSelected={(uri, type) => {
                setCapturedMedia({ uri, type });
                setShowMediaForm(true);
              }}
            />
          )}
          <MediaGallery
            isEditing={isEditing}
            disasterId={disasterId}
          />
        </View>
      );
    } else {
      return renderField(
        item.label, 
        item.value, 
        (text: string) => updateDisaster({ ...disaster, [item.key]: text }),
        item.key === 'des'  // Sử dụng multiline cho trường mô tả
      );
    }
  };

  const formFields = [
    { label: 'Tên thảm họa', value: disaster.title, key: 'title' },
    { label: 'Mô tả thảm họa', value: disaster.des, key: 'des' },
    { label: 'Địa danh cụ thể', value: disaster.location, key: 'location' },
    { label: 'Tọa độ', value: `${disaster.coordinates.lat}, ${disaster.coordinates.lng}`, key: 'coordinates' },
    { label: 'Mức độ thiệt hại', value: disaster.damageLevel, key: 'damageLevel' },
    { label: 'Thời gian', value: new Date(disaster.timestamp).toLocaleDateString('vi-VN'), key: 'timestamp' },
    { label: 'Loại thảm họa', value: disaster.type, key: 'type' },
    { label: 'Hình ảnh và Video', value: '', key: 'images' },
  ];

  return (
    <View style={styles.formContainer}>
      <FlatList
        data={formFields}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.saveButton]} 
              onPress={handleSave}
            >
              <Text style={styles.actionButtonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.cancelButton]} 
              onPress={handleCancel}
            >
              <Text style={styles.actionButtonText}>Hủy</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]} 
            onPress={onToggleEdit}
          >
            <Text style={styles.actionButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <Modal visible={showCamera} animationType="slide">
        <Camera onCapture={handleCameraCapture} />
      </Modal>
      <Modal visible={showMediaForm} animationType="slide" onRequestClose={() => setShowMediaForm(false)}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          {capturedMedia && (
            <MediaForm
              onSubmit={handleMediaFormSubmit}
              mediaUri={capturedMedia.uri}
              mediaType={capturedMedia.type}
            />
          )}
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default DisasterForm;
