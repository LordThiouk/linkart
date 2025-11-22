import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { colors, spacing, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface LoadingDotsProps {
  testID?: string;
}

export function LoadingDots({ testID }: LoadingDotsProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const dotsOpacity = useSharedValue(isStorybook ? 1 : 0);
  const dot1Scale = useSharedValue(1);
  const dot2Scale = useSharedValue(1);
  const dot3Scale = useSharedValue(1);

  useEffect(() => {
    if (isStorybook) {
      dot1Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      setTimeout(() => {
        dot2Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 200);
      setTimeout(() => {
        dot3Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 400);
      return;
    }

    setTimeout(() => {
      dotsOpacity.value = withTiming(1, { duration: 600 });
      dot1Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      dot2Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      setTimeout(() => {
        dot2Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 200);
      dot3Scale.value = withRepeat(
        withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
        -1,
        false
      );
      setTimeout(() => {
        dot3Scale.value = withRepeat(
          withSequence(withTiming(1.2, { duration: 500 }), withTiming(1, { duration: 500 })),
          -1,
          false
        );
      }, 400);
    }, 600);
  }, [isStorybook]);

  const dotsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: dotsOpacity.value,
  }));

  const dot1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
  }));

  const dot2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
  }));

  const dot3AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
  }));

  return (
    <AnimatedView style={[styles.container, dotsAnimatedStyle]} testID={testID}>
      <AnimatedView style={[styles.dot, styles.dot1, dot1AnimatedStyle]} />
      <AnimatedView style={[styles.dot, styles.dot2, dot2AnimatedStyle]} />
      <AnimatedView style={[styles.dot, styles.dot3, dot3AnimatedStyle]} />
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radii.sm,
  },
  dot1: {
    backgroundColor: colors.primary,
  },
  dot2: {
    backgroundColor: colors.primaryDark,
  },
  dot3: {
    backgroundColor: colors.accent,
  },
});
