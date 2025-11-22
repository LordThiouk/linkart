import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export interface Feature {
  icon: LucideIcon;
  label: string;
  gradient: [string, string];
}

export interface WelcomeFeaturesGridProps {
  features: Feature[];
  onFeaturePress?: (feature: Feature) => void;
  testID?: string;
}

export function WelcomeFeaturesGrid({ features, onFeaturePress, testID }: WelcomeFeaturesGridProps) {
  // Détecter si on est dans Storybook
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const containerY = useSharedValue(isStorybook ? 0 : 20);
  const containerOpacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    containerY.value = withDelay(400, withTiming(0, { duration: 500 }));
    containerOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
  }, [isStorybook]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: containerY.value }],
    opacity: containerOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]} testID={testID}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.label} feature={feature} index={index} onPress={() => onFeaturePress?.(feature)} />
      ))}
    </Animated.View>
  );
}

function FeatureCard({ feature, index, onPress }: { feature: Feature; index: number; onPress?: () => void }) {
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const scale = useSharedValue(isStorybook ? 1 : 0);
  const opacity = useSharedValue(isStorybook ? 1 : 0);

  useEffect(() => {
    if (isStorybook) return;

    scale.value = withDelay(500 + index * 100, withSpring(1, { stiffness: 200, damping: 15 }));
    opacity.value = withDelay(500 + index * 100, withTiming(1, { duration: 300 }));
  }, [index, isStorybook]);

  const featureAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedTouchableOpacity
      style={[styles.card, featureAnimatedStyle]}
      activeOpacity={0.9}
      onPress={onPress}
      testID={`feature-${feature.label}`}
    >
      <LinearGradient
        colors={feature.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconContainer}
      >
        <feature.icon size={24} color={colors.textPrimary} />
      </LinearGradient>
      <Text style={styles.label}>{feature.label}</Text>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 320,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  card: {
    width: '47%',
    alignItems: 'center',
    gap: spacing.md - spacing.xs,
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
