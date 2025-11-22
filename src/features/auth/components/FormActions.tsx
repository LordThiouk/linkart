import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface FormActionsProps {
  canContinue: boolean;
  onContinue: () => void;
  onSkip?: () => void;
  continueLabel?: string;
  skipLabel?: string;
  testID?: string;
}

export function FormActions({
  canContinue,
  onContinue,
  onSkip,
  continueLabel = 'Continuer',
  skipLabel = "Passer pour l'instant",
  testID,
}: FormActionsProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const buttonY = useSharedValue(isStorybook ? 0 : 20);
  const buttonOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    buttonY.value = withDelay(700, withTiming(0, { duration: 500 }));
    buttonOpacity.value = withDelay(700, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonY.value }],
    opacity: buttonOpacity.value,
  }));

  return (
    <AnimatedView style={[styles.container, buttonAnimatedStyle]} testID={testID}>
      <PrimaryButton
        onPress={onContinue}
        fullWidth
        disabled={!canContinue}
        style={styles.continueButton}
        testID="continue-button"
      >
        {continueLabel}
      </PrimaryButton>

      {onSkip && (
        <TouchableOpacity onPress={onSkip} style={styles.skipButton} activeOpacity={0.8} testID="skip-button">
          <Text style={styles.skipButtonText}>{skipLabel}</Text>
        </TouchableOpacity>
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  continueButton: {
    marginBottom: 0,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  skipButtonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
