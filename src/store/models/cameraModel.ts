import { Action, action } from 'easy-peasy';

export interface CameraModel {
  uri : string;
  mediaType: 'photo' | 'video' | null;
  setMedia: Action<CameraModel, { uri: string; type: 'photo' | 'video' }>;
}

const cameraModel: CameraModel = {
  uri: '',
  mediaType: null,
  setMedia: action((state, payload) => {
    state.uri = payload.uri;
    state.mediaType = payload.type;
  }),
};

export default cameraModel;