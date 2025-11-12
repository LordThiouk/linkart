/**
 * Button Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Button réutilisable avec support de variants, sizes et animations
 */

import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface ButtonProps {
  /** Texte du bouton */
  title?: string;
  /** Fonction appelée au press */
  onPress: () => void;
  /** Style variant du bouton */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  /** Taille du bouton */
  size?: 'sm' | 'default' | 'lg' | 'icon';
  /** État désactivé */
  disabled?: boolean;
  /** État de chargement */
  loading?: boolean;
  /** Largeur pleine */
  fullWidth?: boolean;
  /** Enfants custom (remplace title) */
  children?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSequence(withTiming(1.02, { duration: 100 }), withTiming(1, { duration: 100 }));
  };

  const isDisabled = disabled || loading;

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        animatedStyle,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'destructive'
              ? colors.white
              : variant === 'link'
                ? colors.primary
                : colors.primary
          }
        />
      ) : children ? (
        children
      ) : (
        <Text style={[styles.text, styles[`text_${variant}`], styles[`text_size_${size}`]]}>{title}</Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  // Base styles
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xxl,
  },

  // Variants
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderWidth: 2,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: colors.transparent,
  },
  destructive: {
    backgroundColor: colors.error,
  },
  link: {
    backgroundColor: colors.transparent,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  size_default: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  size_lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  size_icon: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: radii.lg,
  },

  // Full width
  fullWidth: {
    width: '100%',
  },

  // Text base
  text: {
    fontFamily: typography.fontFamily.poppins.semibold,
  },

  // Text variants
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.background, // #0A0A0A (noir) pour contraste sur orange
  },
  text_outline: {
    color: colors.textPrimary,
  },
  text_ghost: {
    color: colors.textPrimary,
  },
  text_destructive: {
    color: colors.white,
  },
  text_link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },

  // Text sizes
  text_size_sm: {
    fontSize: typography.fontSize.label,
  },
  text_size_default: {
    fontSize: typography.fontSize.body,
  },
  text_size_lg: {
    fontSize: typography.fontSize.titleMd,
  },
  text_size_icon: {
    fontSize: typography.fontSize.body, // Icon size, text rarement utilisé
  },

  // States
  disabled: {
    opacity: 0.5,
  },
});
