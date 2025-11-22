import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface OTPBackButtonProps {
  onPress: () => void;
  label?: string;
  testID?: string;
}

export function OTPBackButton({ onPress, label = 'Retour', testID }: OTPBackButtonProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const backX = useSharedValue(isStorybook ? 0 : -20);
  const backOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    backX.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
    backOpacity.value = withTiming(1, { duration: 600 });
  }, [isStorybook]);

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: backX.value }],
    opacity: backOpacity.value,
  }));

  return (
    <AnimatedView style={backAnimatedStyle} testID={testID}>
      <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8} testID="back-button">
        <ArrowLeft size={20} color={colors.textMuted} />
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: spacing.xl,
  },
  text: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    marginLeft: spacing.sm,
  },
});
