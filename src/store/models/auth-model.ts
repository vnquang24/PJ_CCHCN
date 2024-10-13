import { Action, action, Thunk, thunk } from 'easy-peasy';

// Hàm mô phỏng gọi API
const simulateApiCall = (shouldSucceed = true, delay = 1000): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(true);
      } else {
        reject(new Error('Lỗi mô phỏng API'));
      }
    }, delay);
  });
};

export interface AuthModel {
  currentStep: 'email' | 'verify' | 'newPassword';
  email: string;
  isLoading: boolean;
  error: string | null;
  setCurrentStep: Action<AuthModel, 'email' | 'verify' | 'newPassword'>;
  setEmail: Action<AuthModel, string>;
  setIsLoading: Action<AuthModel, boolean>;
  setError: Action<AuthModel, string | null>;
  submitEmail: Thunk<AuthModel, string>;
  verifyCode: Thunk<AuthModel, string>;
  resetPassword: Thunk<AuthModel, string>;
}

const authModel: AuthModel = {
  currentStep: 'email',
  email: '',
  isLoading: false,
  error: null,

  setCurrentStep: action((state, payload) => {
    state.currentStep = payload;
  }),
  setEmail: action((state, payload) => {
    state.email = payload;
  }),
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),

  submitEmail: thunk(async (actions, email) => {
    actions.setIsLoading(true);
    actions.setError(null);
    try {
      await simulateApiCall(true, 1000);
      actions.setEmail(email);
      actions.setCurrentStep('verify');
    } catch (error) {
      actions.setError('Không thể gửi email. Vui lòng thử lại.');
    } finally {
      actions.setIsLoading(false);
    }
  }),

  verifyCode: thunk(async (actions, code) => {
    actions.setIsLoading(true);
    actions.setError(null);
    try {
      await simulateApiCall(true, 1000);
      actions.setCurrentStep('newPassword');
    } catch (error) {
      actions.setError('Mã không hợp lệ. Vui lòng thử lại.');
    } finally {
      actions.setIsLoading(false);
    }
  }),

  resetPassword: thunk(async (actions, newPassword) => {
    actions.setIsLoading(true);
    actions.setError(null);
    try {
      await simulateApiCall(true, 1000);
      actions.setCurrentStep('email');
    } catch (error) {
      actions.setError('Không thể đặt lại mật khẩu. Vui lòng thử lại.');
    } finally {
      actions.setIsLoading(false);
    }
  }),
};

export default authModel;