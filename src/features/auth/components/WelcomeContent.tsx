import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { colors, spacing, typography } from '@/theme';

export interface WelcomeContentProps {
  title: string;
  description: string;
  testID?: string;
}

export function WelcomeContent({ title, description, testID }: WelcomeContentProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const titleY = useSharedValue(isStorybook ? 0 : 20);
  const titleOpacity = useSharedValue(isStorybook ? 1 : 0);
  const descriptionY = useSharedValue(isStorybook ? 0 : 20);
  const descriptionOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    titleY.value = withDelay(200, withTiming(0, { duration: 500 }));
    titleOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    descriptionY.value = withDelay(300, withTiming(0, { duration: 500 }));
    descriptionOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value,
  }));

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: descriptionY.value }],
    opacity: descriptionOpacity.value,
  }));

  return (
    <View style={styles.container} testID={testID}>
      <Animated.View style={titleAnimatedStyle}>
        <Text style={styles.title}>{title}</Text>
      </Animated.View>

      <Animated.View style={descriptionAnimatedStyle}>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4,
    fontFamily: typography.fontFamily.poppins.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: typography.fontSize.body * typography.lineHeight.normal,
  },
});
