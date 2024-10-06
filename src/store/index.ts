import { createStore, createTypedHooks } from 'easy-peasy';
import cameraModel, { CameraModel } from './models/cameraModel';
import loginModel, { LoginModel } from './models/loginModel';

interface StoreModel {
  camera: CameraModel;
  login: LoginModel;
}

const store = createStore<StoreModel>({
  camera: cameraModel,
  login: loginModel,
});

export const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export default store;

