import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { Shield, ArrowLeft } from 'lucide-react-native';
import { OTPField } from '../../components/atoms/OTPField';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import * as Haptics from 'expo-haptics';

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

  const backX = useSharedValue(-20);
  const backOpacity = useSharedValue(0);
  const logoY = useSharedValue(-20);
  const logoOpacity = useSharedValue(0);
  const contentY = useSharedValue(20);
  const contentOpacity = useSharedValue(0);
  const formY = useSharedValue(20);
  const formOpacity = useSharedValue(0);

  useEffect(() => {
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
  }, []);

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
              <ArrowLeft size={20} color="#A3A3A3" />
              <Text style={styles.backText}>Retour</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <LinearGradient
              colors={['#8B5CF6', '#EC4899']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logo}
            >
              <Shield size={32} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 32, // p-8
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 32, // mb-8
  },
  backText: {
    color: '#A3A3A3',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    marginLeft: 8,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48, // mb-12
  },
  logo: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48, // mb-12
  },
  title: {
    color: '#F5F5F5',
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#A3A3A3',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  contact: {
    color: '#D4D4D4',
    fontFamily: 'Inter_500Medium',
  },
  formContainer: {
    gap: 32, // space-y-8
  },
  errorContainer: {
    marginTop: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  verifyButton: {
    marginTop: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  resendLink: {
    color: '#6366F1',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  resendTimer: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
