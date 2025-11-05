import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { Music, Mail, Phone } from 'lucide-react-native';
import { InputField } from '../../components/atoms/InputField';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';

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
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logo}
            >
              <Music size={32} color="#F5F5F5" />
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
                      colors={['#6366F1', '#8B5CF6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.typeButtonGradient}
                    >
                      <Phone size={16} color="#F5F5F5" />
                      <Text style={styles.typeButtonTextActive}>Téléphone</Text>
                    </LinearGradient>
                  ) : (
                    <>
                      <Phone size={16} color="#A3A3A3" />
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
                      colors={['#6366F1', '#8B5CF6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.typeButtonGradient}
                    >
                      <Mail size={16} color="#F5F5F5" />
                      <Text style={styles.typeButtonTextActive}>Email</Text>
                    </LinearGradient>
                  ) : (
                    <>
                      <Mail size={16} color="#A3A3A3" />
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
    backgroundColor: '#0A0A0A',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 32, // p-8
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48, // mb-12
    marginTop: 32, // mt-8
  },
  logo: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
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
    marginBottom: 32, // mb-8
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
  formContainer: {
    backgroundColor: '#111111',
    borderRadius: 24, // rounded-2xl
    padding: 24, // p-6
    marginBottom: 24, // mb-6
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8, // gap-2
    marginBottom: 24, // mb-6
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12, // py-3
    paddingHorizontal: 16, // px-4
    borderRadius: 12, // rounded-xl
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
    backgroundColor: '#1A1A1A',
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
    gap: 8,
  },
  typeButtonText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  typeButtonTextActive: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  inputContainer: {
    marginBottom: 24, // space-y-6
  },
  input: {
    marginBottom: 24,
  },
  submitButton: {
    marginTop: 24,
  },
});
