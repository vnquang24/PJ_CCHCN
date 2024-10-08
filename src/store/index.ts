import { createStore, createTypedHooks } from 'easy-peasy';
import cameraModel, { CameraModel } from './models/camera-model';
import loginModel, { LoginModel } from './models/login-model';
import disasterModel, { DisasterModel } from './models/disaster-model';
interface StoreModel {
  camera: CameraModel;
  login: LoginModel;
  disaster: DisasterModel;
}

const store = createStore<StoreModel>({
  camera: cameraModel,
  login: loginModel,
  disaster: disasterModel,
});

export const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export default store;

