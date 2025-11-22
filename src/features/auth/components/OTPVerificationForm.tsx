import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { OTPField } from '@/components/atoms/OTPField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface OTPVerificationFormProps {
  otp: string;
  error?: boolean;
  resendTimer: number;
  canResend: boolean;
  onOtpChange: (otp: string) => void;
  onVerify: () => void;
  onResend: () => void;
  verifyLabel?: string;
  testID?: string;
}

export function OTPVerificationForm({
  otp,
  error,
  resendTimer,
  canResend,
  onOtpChange,
  onVerify,
  onResend,
  verifyLabel = 'Vérifier',
  testID,
}: OTPVerificationFormProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const formY = useSharedValue(isStorybook ? 0 : 20);
  const formOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    setTimeout(() => {
      formY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
      formOpacity.value = withTiming(1, { duration: 600 });
    }, 200);
  }, [isStorybook]);

  const formAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formY.value }],
    opacity: formOpacity.value,
  }));

  return (
    <AnimatedView style={[styles.container, formAnimatedStyle]} testID={testID}>
      <OTPField value={otp} onChange={onOtpChange} error={error} testID="otp-field" />

      {error && (
        <AnimatedView style={styles.errorContainer}>
          <Text style={styles.errorText}>Code invalide. Veuillez réessayer.</Text>
        </AnimatedView>
      )}

      <PrimaryButton
        fullWidth
        onPress={onVerify}
        disabled={otp.length !== 6}
        style={styles.verifyButton}
        testID="verify-button"
      >
        {verifyLabel}
      </PrimaryButton>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Vous n'avez pas reçu le code ? </Text>
        {canResend ? (
          <TouchableOpacity onPress={onResend} activeOpacity={0.8} testID="resend-button">
            <Text style={styles.resendLink}>Renvoyer</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.resendTimer}>Renvoyer dans {resendTimer}s</Text>
        )}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  errorContainer: {
    marginTop: spacing.md,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
  verifyButton: {
    marginTop: spacing.lg,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  resendText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  resendLink: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  resendTimer: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
