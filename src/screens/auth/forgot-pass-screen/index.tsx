// src/screens/auth/forgot-pass-screen/index.tsx
import React from 'react';
import { View } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';

import EnterEmailScreen from '../../../components/auth/forgot-pass-enter-email';
import VerifyCodeScreen from '../../../components/auth/forgot-pass-verify-code';
import NewPasswordScreen from '../../../components/auth/forgot-pass-new-pass';
import styles from './style';

const ForgotPasswordScreen: React.FC = () => {
  const { currentStep, email, isLoading, error } = useStoreState((state:any) => state.auth);
  const { submitEmail, verifyCode, resetPassword } = useStoreActions((actions:any) => actions.auth);
  return (
    <View style={styles.container}>
      {currentStep === 'email' && (
        <EnterEmailScreen onSubmit={submitEmail} isLoading={isLoading} error={error} />
      )}
      {currentStep === 'verify' && (
        <VerifyCodeScreen onSubmit={verifyCode} email={email} isLoading={isLoading} error={error} />
      )}
      {currentStep === 'newPassword' && (
        <NewPasswordScreen onSubmit={resetPassword} isLoading={isLoading} error={error} />
      )}
    </View>
  );
};

export default ForgotPasswordScreen;