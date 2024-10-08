import { Action, action } from 'easy-peasy';

export interface MediaItem {
  uri: string;
  type: 'photo' | 'video' | null;
}

export interface CameraModel {
  mediaItems: MediaItem[];
  addMedia: Action<CameraModel, MediaItem>;
  removeMedia: Action<CameraModel, number>;
}

const cameraModel: CameraModel = {
  mediaItems: [],
  addMedia: action((state, payload) => {
    state.mediaItems.push(payload);
  }),
  removeMedia: action((state, payload) => {
    state.mediaItems.splice(payload, 1);
  }),
};

export default cameraModel;