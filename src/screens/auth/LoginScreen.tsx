import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenFigma, type LoginScreenFigmaProps } from '@/features/auth/screens/LoginScreenFigma';

export function LoginScreen() {
  const navigation = useNavigation<any>();

  const handleSubmit: LoginScreenFigmaProps['onSubmit'] = contact => {
    // Navigate to OTP verification screen
    navigation.navigate('OTPVerification', { contact });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return <LoginScreenFigma onSubmit={handleSubmit} onBack={handleBack} />;
}
