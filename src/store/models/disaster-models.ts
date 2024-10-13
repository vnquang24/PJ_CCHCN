import { Action, action, Thunk, thunk } from 'easy-peasy';

export interface Disaster {
  id: number;
  title: string;
  icon: string;
  des: string; // Mô tả
  location: string; // Địa danh cụ thể
  coordinates: { lat: number; lng: number }; // Tọa độ
  timestamp: number; // Thời gian
  damageLevel: string; // Mức độ thiệt hại
  type: string; // Loại thảm họa
  images: Image[]; // Mảng các hình ảnh liên quan
}

export interface Image {
  id: number;
  uri: string;
  des: string; // Mô tả
  coordinates: { lat: number; lng: number }; // Tọa độ chụp bức ảnh
  type: 'photo' | 'video';
}

export interface DisasterModel {
  disasters: Disaster[];
  images: Image[];
  setDisasters: Action<DisasterModel, Disaster[]>;
  updateDisaster: Action<DisasterModel, Partial<Disaster>>;
  fetchDisasters: Thunk<DisasterModel>;
  addImage: Action<DisasterModel, { disasterId: number, image: Image }>;
  removeImage: Action<DisasterModel, { disasterId: number, imageId: number }>;
  updateImageCoordinates: Action<DisasterModel, { disasterId: number, imageId: number, coordinates: { lat: number, lng: number } }>;
}

const generateSampleDisasters = (): Disaster[] => {
  return [
    {
      id: 1,
      title: "Lũ lụt tại Quảng Bình",
      icon: "tint",
      des: "Lũ lụt nghiêm trọng tại nhiều huyện của tỉnh Quảng Bình",
      location: "Quảng Bình",
      coordinates: { lat: 17.5127, lng: 106.2589 },
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000,
      damageLevel: "Nghiêm trọng",
      type: "flood",
      images: [
        {
          id: 1,
          uri: "https://example.com/flood1.jpg",
          des: "Nước lũ dâng cao tại trung tâm thành phố",
          coordinates: { lat: 17.5130, lng: 106.2592 },
          type: 'photo'
        },
        {
          id: 2,
          uri: "https://example.com/flood2.jpg",
          des: "Người dân di chuyển bằng thuyền",
          coordinates: { lat: 17.5135, lng: 106.2588 },
          type: 'photo'
        }
      ]
    },
    {
      id: 2,
      title: "Cháy rừng tại Hà Tĩnh",
      icon: "fire",
      des: "Cháy rừng lớn tại Vườn Quốc gia Vũ Quang, Hà Tĩnh",
      location: "Hà Tĩnh",
      coordinates: { lat: 18.3441, lng: 105.4445 },
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
      damageLevel: "Trung bình",
      type: "forest-fire",
      images: []
    },
    {
      id: 3,
      title: "Sạt lở đất tại Quảng Nam",
      icon: "leaf",
      des: "Sạt lở đất nghiêm trọng tại huyện Nam Trà My, Quảng Nam",
      location: "Quảng Nam",
      coordinates: { lat: 15.5393, lng: 107.9262 },
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000,
      damageLevel: "Rất nghiêm trọng",
      type: "landslide",
      images: []
    },
    {
      id: 4,
      title: "Hạn hán tại Ninh Thuận",
      icon: "sun-o",
      des: "Hạn hán kéo dài tại nhiều huyện của tỉnh Ninh Thuận",
      location: "Ninh Thuận",
      coordinates: { lat: 11.6739, lng: 108.8629 },
      timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000,
      damageLevel: "Nhẹ",
      type: "drought",
      images: []
    },
    {
      id: 5,
      title: "Hỏa hoạn tại Hồ Chí Minh",
      icon: "fire",
      des: "Cháy lớn tại khu công nghiệp ở quận Bình Tân, TP.HCM",
      location: "Hồ Chí Minh",
      coordinates: { lat: 10.8231, lng: 106.6297 },
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
      damageLevel: "Nghiêm trọng",
      type: "fire",
      images: []
    }
  ];
};

const disasterModel: DisasterModel = {
  disasters: [],
  images: [],
  setDisasters: action((state, payload) => {
    state.disasters = payload;
  }),
  updateDisaster: action((state, payload) => {
    const index = state.disasters.findIndex(d => d.id === payload.id);
    if (index !== -1) {
      state.disasters[index] = { ...state.disasters[index], ...payload };
    }
  }),
  fetchDisasters: thunk(async (actions) => {
    // Mô phỏng việc gọi API
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 giây
    const sampleDisasters = generateSampleDisasters();
    actions.setDisasters(sampleDisasters);
  }),
  addImage: action((state, payload) => {
    const disaster = state.disasters.find(d => d.id === payload.disasterId);
    if (disaster) {
      disaster.images.push(payload.image);
    }
  }),
  removeImage: action((state, payload) => {
    const disaster = state.disasters.find(d => d.id === payload.disasterId);
    if (disaster) {
      disaster.images = disaster.images.filter(img => img.id !== payload.imageId);
    }
  }),
  updateImageCoordinates: action((state, payload) => {
    const disaster = state.disasters.find(d => d.id === payload.disasterId);
    if (disaster) {
      const image = disaster.images.find(img => img.id === payload.imageId);
      if (image) {
        image.coordinates = payload.coordinates;
      }
    }
  }),
};

export default disasterModel;