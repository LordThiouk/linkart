import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { Music, Mail, Phone } from 'lucide-react-native';
import { InputField } from '../../components/atoms/InputField';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

interface LoginScreenProps {
  onSubmit: (contact: string) => void;
  onBack?: () => void;
}

export function LoginScreen({ onSubmit, onBack }: LoginScreenProps) {
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [error, setError] = useState('');

  const logoY = useSharedValue(-20);
  const logoOpacity = useSharedValue(0);
  const contentY = useSharedValue(20);
  const contentOpacity = useSharedValue(0);
  const formY = useSharedValue(20);
  const formOpacity = useSharedValue(0);

  React.useEffect(() => {
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

  const handleSubmit = () => {
    setError('');

    if (!contact.trim()) {
      setError('Ce champ est requis');
      return;
    }

    if (contactType === 'email' && !contact.includes('@')) {
      setError('Email invalide');
      return;
    }

    if (contactType === 'phone' && contact.replace(/\D/g, '').length < 10) {
      setError('Numéro de téléphone invalide');
      return;
    }

    onSubmit(contact);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logo}
            >
              <Music size={32} color={colors.textPrimary} />
            </LinearGradient>
          </Animated.View>

          <Animated.View style={[styles.content, contentAnimatedStyle]}>
            <View style={styles.header}>
              <Text style={styles.title}>Bienvenue</Text>
              <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
            </View>

            <Animated.View style={[styles.formContainer, formAnimatedStyle]}>
              <View style={styles.typeSelector}>
                <TouchableOpacity
                  onPress={() => setContactType('phone')}
                  style={[styles.typeButton, contactType === 'phone' && styles.typeButtonActive]}
                  activeOpacity={0.9}
                >
                  {contactType === 'phone' ? (
                    <LinearGradient
                      colors={[colors.primary, colors.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.typeButtonGradient}
                    >
                      <Phone size={16} color={colors.textPrimary} />
                      <Text style={styles.typeButtonTextActive}>Téléphone</Text>
                    </LinearGradient>
                  ) : (
                    <>
                      <Phone size={16} color={colors.textMuted} />
                      <Text style={styles.typeButtonText}>Téléphone</Text>
                    </>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setContactType('email')}
                  style={[styles.typeButton, contactType === 'email' && styles.typeButtonActive]}
                  activeOpacity={0.9}
                >
                  {contactType === 'email' ? (
                    <LinearGradient
                      colors={[colors.primary, colors.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.typeButtonGradient}
                    >
                      <Mail size={16} color={colors.textPrimary} />
                      <Text style={styles.typeButtonTextActive}>Email</Text>
                    </LinearGradient>
                  ) : (
                    <>
                      <Mail size={16} color={colors.textMuted} />
                      <Text style={styles.typeButtonText}>Email</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <InputField
                  label={contactType === 'phone' ? 'Numéro de téléphone' : 'Email'}
                  value={contact}
                  onChangeText={setContact}
                  placeholder={contactType === 'phone' ? '+221 7X XXX XX XX' : 'email@example.com'}
                  keyboardType={contactType === 'phone' ? 'phone-pad' : 'email-address'}
                  autoCapitalize="none"
                  error={error}
                  containerStyle={styles.input}
                />
              </View>

              <PrimaryButton fullWidth onPress={handleSubmit} disabled={!contact.trim()} style={styles.submitButton}>
                Continuer
              </PrimaryButton>
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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
  },
  logo: {
    width: 64, // w-16 (specific size)
    height: 64, // h-16
    borderRadius: radii.full, // 32 = width/2 (circle)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
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
    marginBottom: spacing.xl,
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
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    overflow: 'hidden',
  },
  typeButtonActive: {
    borderWidth: 0,
  },
  typeButtonGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  typeButtonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  typeButtonTextActive: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
});
