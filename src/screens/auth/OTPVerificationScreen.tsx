import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  OTPVerificationScreenFigma,
  type OTPVerificationScreenFigmaProps,
} from '@/features/auth/screens/OTPVerificationScreenFigma';

export function OTPVerificationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const contact = route.params?.contact || '';

  const handleVerify: OTPVerificationScreenFigmaProps['onVerify'] = () => {
    // Navigate to home or next screen after verification
    navigation.navigate('Home');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return <OTPVerificationScreenFigma contact={contact} onVerify={handleVerify} onBack={handleBack} />;
}
