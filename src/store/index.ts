import { createStore, createTypedHooks } from 'easy-peasy';
import counterModel, { CounterModel } from './models/counterModel';
import cameraModel, { CameraModel } from './models/cameraModel';

interface StoreModel {
  counter: CounterModel;
  camera: CameraModel;
}

const store = createStore<StoreModel>({
  counter: counterModel,
  camera: cameraModel,
});

export const { useStoreActions, useStoreState } = createTypedHooks<StoreModel>();

export default store;

