import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import MediaForm from '../../common/media/media-form';
import Camera from '../../common/media/camera';
import { Disaster, Image as DisasterImage } from '../../../store/models/disaster-models';
import Video from 'react-native-video';

const disasterTypes = [
  { label: 'Cháy rừng', value: 'forest-fire', icon: 'fire' },
  { label: 'Hạn hán', value: 'drought', icon: 'sun-o' },
  { label: 'Hỏa hoạn', value: 'fire', icon: 'fire' },
  { label: 'Mưa lũ', value: 'flood', icon: 'tint' },
  { label: 'Sạt lở', value: 'landslide', icon: 'leaf' },
  { label: 'Nổ', value: 'explosion', icon: 'bomb' },
];

interface DisasterFormProps {
  disaster: Disaster;
  onSave: (updatedDisaster: Disaster) => void;
  isEditing: boolean;
  onToggleEdit: () => void;
}

const DisasterForm: React.FC<DisasterFormProps> = ({ disaster, onSave, isEditing, onToggleEdit }) => {
  const [editedDisaster, setEditedDisaster] = useState<Disaster>(disaster);
  const [showCamera, setShowCamera] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<{ uri: string; type: 'photo' | 'video' } | null>(null);

  const handleCapture = (uri: string, type: 'photo' | 'video') => {
    setCapturedMedia({ uri, type });
    setShowCamera(false);
    setShowMediaForm(true);
  };

  const handleSave = () => {
    const selectedType = disasterTypes.find(type => type.value === editedDisaster.type);
    onSave({
      ...editedDisaster,
      icon: selectedType ? selectedType.icon : 'question-circle',
    });
    onToggleEdit();
  };
  
  const handleMediaSubmit = (mediaInfo: Omit<DisasterImage, 'id'>) => {
    const newImage: DisasterImage = {
      ...mediaInfo,
      id: Date.now(), // Tạo ID tạm thời
    };
    setEditedDisaster(prev => ({
      ...prev,
      images: [...prev.images, newImage],
    }));
    setShowMediaForm(false);
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const renderField = (label: string, value: string, onChangeText?: (text: string) => void) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
      ) : (
        <Text style={styles.readOnlyText}>{value}</Text>
      )}
    </View>
  );

  const formFields = [
    { label: 'Tên thảm họa', value: editedDisaster.title, onChangeText: (text: string) => setEditedDisaster(prev => ({ ...prev, title: text })) },
    { label: 'Mô tả thảm họa', value: editedDisaster.des, onChangeText: (text: string) => setEditedDisaster(prev => ({ ...prev, des: text })) },
    { label: 'Địa danh cụ thể', value: editedDisaster.location, onChangeText: (text: string) => setEditedDisaster(prev => ({ ...prev, location: text })) },
    {
      label: 'Tọa độ',
      value: `${editedDisaster.coordinates.lat}, ${editedDisaster.coordinates.lng}`,
      onChangeText: (text: string) => {
        const [lat, lng] = text.split(',').map(Number);
        setEditedDisaster(prev => ({ ...prev, coordinates: { lat, lng } }));
      }
    },
    { label: 'Mức độ thiệt hại', value: editedDisaster.damageLevel, onChangeText: (text: string) => setEditedDisaster(prev => ({ ...prev, damageLevel: text })) },
    {
      label: 'Thời gian',
      value: formatDate(editedDisaster.timestamp),
      onChangeText: (text: string) => {
        const date = new Date(text);
        if (!isNaN(date.getTime())) {
          setEditedDisaster(prev => ({ ...prev, timestamp: date.getTime() }));
        }
      }
    }
  ];

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    if (index === formFields.length) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loại thảm họa</Text>
          {isEditing ? (
            <Picker
              selectedValue={editedDisaster.type}
              onValueChange={(itemValue: string) => setEditedDisaster(prev => ({ ...prev, type: itemValue }))}
              style={styles.picker}
            >
              {disasterTypes.map((type) => (
                <Picker.Item key={type.value} label={type.label} value={type.value} />
              ))}
            </Picker>
          ) : (
            <Text style={styles.readOnlyText}>
              {disasterTypes.find(type => type.value === editedDisaster.type)?.label || editedDisaster.type}
            </Text>
          )}
        </View>
      );
    } else if (index === formFields.length + 1) {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hình ảnh và Video</Text>
          {isEditing && (
            <TouchableOpacity style={styles.addMediaButton} onPress={() => setShowCamera(true)}>
              <Icon name="camera" size={24} color="#007AFF" />
              <Text style={styles.addMediaButtonText}>Thêm ảnh/video</Text>
            </TouchableOpacity>
          )}
          <FlatList
            data={editedDisaster.images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.mediaItem}>
                {item.type === 'photo' ? (
                  <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
                ) : (
                  <Video source={{ uri: item.uri }} style={styles.mediaPreview} />
                )}
                <Text>{item.des}</Text>
              </View>
            )}
          />
        </View>
      );
    } else {
      return renderField(item.label, item.value, item.onChangeText);
    }
  };

  return (
    <View style={styles.formContainer}>
      {isEditing ? (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name="check" size={24} color="#007AFF" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.editButton} onPress={onToggleEdit}>
          <Icon name="edit" size={24} color="#007AFF" />
        </TouchableOpacity>
      )}
      <FlatList
        data={[...formFields, {}, {}]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal visible={showCamera} animationType="slide">
        <Camera onCapture={handleCapture} />
      </Modal>
      <Modal visible={showMediaForm} animationType="slide">
        {capturedMedia && (
          <MediaForm
            onSubmit={handleMediaSubmit}
            mediaUri={capturedMedia.uri}
            mediaType={capturedMedia.type}
          />
        )}
      </Modal>
    </View>
  );
};

export default DisasterForm;