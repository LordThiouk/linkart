import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated';
import { colors, spacing, typography } from '@/theme';

const AnimatedText = Animated.createAnimatedComponent(Text);

export interface SplashContentProps {
  title: string;
  subtitle: string;
  testID?: string;
}

export function SplashContent({ title, subtitle, testID }: SplashContentProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const titleY = useSharedValue(isStorybook ? 0 : 20);
  const titleOpacity = useSharedValue(isStorybook ? 1 : 0);
  const subtitleY = useSharedValue(isStorybook ? 0 : 20);
  const subtitleOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    setTimeout(() => {
      titleY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
      titleOpacity.value = withTiming(1, { duration: 600 });
    }, 300);

    setTimeout(() => {
      subtitleY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
      subtitleOpacity.value = withTiming(1, { duration: 600 });
    }, 400);
  }, [isStorybook]);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value,
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleY.value }],
    opacity: subtitleOpacity.value,
  }));

  return (
    <>
      <AnimatedText style={[styles.title, titleAnimatedStyle]} testID={testID}>
        {title}
      </AnimatedText>
      <AnimatedText style={[styles.subtitle, subtitleAnimatedStyle]} testID={`${testID}-subtitle`}>
        {subtitle}
      </AnimatedText>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
});
