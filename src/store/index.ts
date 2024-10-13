import { createStore, createTypedHooks } from 'easy-peasy';
import loginModel, { LoginModel } from './models/login-state-model';
import disasterModel, { DisasterModel } from './models/disaster-models';
import authModel, { AuthModel } from './models/auth-model';

export interface StoreModel {
  login: LoginModel;
  disaster: DisasterModel;
  auth: AuthModel;
}

const store = createStore<StoreModel>({
  login: loginModel,
  disaster: disasterModel,
  auth: authModel,
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreState = typedHooks.useStoreState;
export const useStoreDispatch = typedHooks.useStoreDispatch;

export default store;