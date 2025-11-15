import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { Shield, ArrowLeft } from 'lucide-react-native';
import { OTPField } from '../../components/atoms/OTPField';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography, radii } from '@/theme';

interface OTPVerificationScreenProps {
  contact: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPVerificationScreen({ contact, onVerify, onBack }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Détecter si on est dans Storybook (navigateur)
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  // Initialiser les valeurs différemment selon l'environnement
  const backX = useSharedValue(isStorybook ? 0 : -20);
  const backOpacity = useSharedValue(isStorybook ? 1 : 0);
  const logoY = useSharedValue(isStorybook ? 0 : -20);
  const logoOpacity = useSharedValue(isStorybook ? 1 : 0);
  const contentY = useSharedValue(isStorybook ? 0 : 20);
  const contentOpacity = useSharedValue(isStorybook ? 1 : 0);
  const formY = useSharedValue(isStorybook ? 0 : 20);
  const formOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    // Dans Storybook, les animations sont déjà à leur état final
    if (isStorybook) return;

    backX.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    backOpacity.value = withTiming(1, { duration: 600 });
    logoY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    logoOpacity.value = withTiming(1, { duration: 600 });
    setTimeout(() => {
      contentY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
      contentOpacity.value = withTiming(1, { duration: 600 });
    }, 100);
    setTimeout(() => {
      formY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
      formOpacity.value = withTiming(1, { duration: 600 });
    }, 200);
  }, [isStorybook]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: backX.value }],
    opacity: backOpacity.value,
  }));

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: logoY.value }],
    opacity: logoOpacity.value,
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: contentY.value }],
    opacity: contentOpacity.value,
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: formY.value }],
    opacity: formOpacity.value,
  }));

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
          <Animated.View style={backAnimatedStyle}>
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
              <ArrowLeft size={20} color={colors.textMuted} />
              <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <LinearGradient
              colors={[colors.primaryDark, colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logo}
            >
              <Shield size={32} color={colors.textPrimary} />
            </LinearGradient>
          </Animated.View>

          <Animated.View style={[styles.content, contentAnimatedStyle]}>
            <View style={styles.header}>
              <Text style={styles.title}>Entrez le code</Text>
              <Text style={styles.subtitle}>
                Code envoyé à <Text style={styles.contact}>{contact}</Text>
              </Text>
            </View>

            <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
              <OTPField value={otp} onChange={setOtp} error={error} testID="otp-field" />

              {error && (
                <Animated.View style={styles.errorContainer}>
                  <Text style={styles.errorText}>Code invalide. Veuillez réessayer.</Text>
                </Animated.View>
              )}

              <PrimaryButton fullWidth onPress={handleVerify} disabled={otp.length !== 6} style={styles.verifyButton}>
                Vérifier
              </PrimaryButton>

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Vous n'avez pas reçu le code ? </Text>
                {canResend ? (
                  <TouchableOpacity onPress={handleResend} activeOpacity={0.8}>
                    <Text style={styles.resendLink}>Renvoyer</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.resendTimer}>Renvoyer dans {resendTimer}s</Text>
                )}
              </View>
            </Animated.View>
          </Animated.View>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: spacing.xl,
  },
  backText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    marginLeft: spacing.sm,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  logo: {
    width: 64, // w-16 (specific size)
    height: 64, // h-16
    borderRadius: radii.full, // 32 = width/2 (circle)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: spacing.sm },
    shadowOpacity: 0.3,
    shadowRadius: spacing.md,
    elevation: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - 4, // 28px (between headingLg and displayXl)
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
  contact: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.inter.medium,
  },
  formContainer: {
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
