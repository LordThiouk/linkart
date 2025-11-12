/**
 * Skeleton Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Skeleton pour loading states
 */

import React, { useEffect } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { colors, radii } from '../../theme';

export interface SkeletonProps extends ViewProps {
  /** Largeur du skeleton */
  width?: number;
  /** Hauteur du skeleton */
  height?: number;
  /** Variant de forme */
  variant?: 'default' | 'circle' | 'text';
  /** Désactiver l'animation */
  disableAnimation?: boolean;
}

export default function Skeleton({
  width = 100,
  height = 20,
  variant = 'default',
  disableAnimation = false,
  style,
  ...props
}: SkeletonProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (!disableAnimation) {
      opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true);
    }
  }, [disableAnimation, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: disableAnimation ? 1 : opacity.value,
  }));

  const variantStyle = variant === 'circle' ? styles.circle : variant === 'text' ? styles.text : styles.default;

  return <Animated.View style={[styles.base, variantStyle, { width, height }, animatedStyle, style]} {...props} />;
}

Skeleton.displayName = 'Skeleton';

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.muted,
  },

  default: {
    borderRadius: radii.md,
  },

  circle: {
    borderRadius: radii.full,
  },

  text: {
    borderRadius: radii.sm,
  },
});
