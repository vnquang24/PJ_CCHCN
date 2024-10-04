import { Action, action } from 'easy-peasy';

export interface CameraModel {
  uri : string;
  setUri: Action<CameraModel, string>;
}

const cameraModel: CameraModel = {
  uri: '',
  setUri: action((state, payload) => {
    state.uri = payload;
  }),
};

export default cameraModel;