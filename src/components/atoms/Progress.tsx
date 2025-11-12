/**
 * Progress Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Progress pour indiquer la progression
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, radii } from '../../theme';

export interface ProgressProps extends ViewProps {
  /** Valeur de progression (0-100) */
  value?: number;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /** Size de la barre */
  size?: 'sm' | 'default' | 'lg';
}

export default function Progress({ value = 0, variant = 'primary', size = 'default', style, ...props }: ProgressProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(100, Math.max(0, value)), {
      duration: 300,
    });
  }, [value, progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={[styles.container, styles[`container_${size}`], style]} {...props}>
      <Animated.View style={[styles.indicator, styles[`indicator_${variant}`], animatedStyle]} />
    </View>
  );
}

Progress.displayName = 'Progress';

const styles = StyleSheet.create({
  // Container
  container: {
    width: '100%',
    backgroundColor: `${colors.primary}20`, // 20% opacity
    borderRadius: radii.full,
    overflow: 'hidden',
  },

  container_sm: {
    height: 4,
  },
  container_default: {
    height: 8,
  },
  container_lg: {
    height: 12,
  },

  // Indicator
  indicator: {
    height: '100%',
    borderRadius: radii.full,
  },

  indicator_primary: {
    backgroundColor: colors.primary,
  },
  indicator_secondary: {
    backgroundColor: colors.secondary,
  },
  indicator_success: {
    backgroundColor: colors.success,
  },
  indicator_warning: {
    backgroundColor: colors.warning,
  },
  indicator_error: {
    backgroundColor: colors.error,
  },
});
