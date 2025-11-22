import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { InputField } from '@/components/atoms/InputField';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface LoginFormProps {
  contactType: 'phone' | 'email';
  contact: string;
  error?: string;
  onContactChange: (value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
  testID?: string;
}

export function LoginForm({
  contactType,
  contact,
  error,
  onContactChange,
  onSubmit,
  submitLabel = 'Continuer',
  testID,
}: LoginFormProps) {
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
      <View style={styles.inputContainer}>
        <InputField
          label={contactType === 'phone' ? 'Numéro de téléphone' : 'Email'}
          value={contact}
          onChangeText={onContactChange}
          placeholder={contactType === 'phone' ? '+221 7X XXX XX XX' : 'email@example.com'}
          keyboardType={contactType === 'phone' ? 'phone-pad' : 'email-address'}
          autoCapitalize="none"
          error={error}
          containerStyle={styles.input}
        />
      </View>

      <PrimaryButton
        fullWidth
        onPress={onSubmit}
        disabled={!contact.trim()}
        style={styles.submitButton}
        testID="submit-button"
      >
        {submitLabel}
      </PrimaryButton>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
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
