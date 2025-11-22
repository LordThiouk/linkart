import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { OTPBackButton, OTPHeader, OTPVerificationForm } from '../components';
import { colors, spacing } from '@/theme';

export interface OTPVerificationScreenFigmaProps {
  contact: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPVerificationScreenFigma({ contact, onVerify, onBack }: OTPVerificationScreenFigmaProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setTimeout(() => setError(false), 500);
      return;
    }

    onVerify();
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(30);
      setCanResend(false);
      setOtp('');
      setError(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <OTPBackButton onPress={onBack} />

          <OTPHeader title="Entrez le code" contact={contact} />

          <OTPVerificationForm
            otp={otp}
            error={error}
            resendTimer={resendTimer}
            canResend={canResend}
            onOtpChange={setOtp}
            onVerify={handleVerify}
            onResend={handleResend}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
});
