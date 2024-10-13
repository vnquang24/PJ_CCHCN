import { Action, action } from 'easy-peasy';

export interface LoginModel {
    isLoggedIn: boolean;
    setIsLoggedIn: Action<LoginModel, boolean>;
    setIsLoggedOut: Action<LoginModel, void>;
}

const loginModel: LoginModel = {
    isLoggedIn: true,
    setIsLoggedIn: action((state, payload) => {
        state.isLoggedIn = payload;
    }),
    setIsLoggedOut: action((state) => {
        state.isLoggedIn = false;
    }),
};

export default loginModel;