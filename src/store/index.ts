import { createStore, createTypedHooks } from 'easy-peasy';
import cameraModel, { CameraModel } from './models/cameraModel';
import loginModel, { LoginModel } from './models/loginModel';
import disasterModel, { DisasterModel } from './models/disasterModel';
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

