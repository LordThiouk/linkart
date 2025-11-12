/**
 * Checkbox Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Checkbox réutilisable avec support de variants et animations
 */

import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface CheckboxProps {
  /** État coché */
  checked?: boolean;
  /** Fonction appelée au changement */
  onCheckedChange?: (checked: boolean) => void;
  /** Label du checkbox */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';
  /** Size */
  size?: 'sm' | 'default' | 'lg';
}

export default function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  invalid = false,
  variant = 'primary',
  size = 'default',
}: CheckboxProps) {
  const scale = useSharedValue(1);

  const handlePress = () => {
    if (disabled) return;

    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    onCheckedChange?.(!checked);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkboxVariantStyle = invalid
    ? styles.checkbox_invalid
    : checked
      ? styles[`checkbox_checked_${variant}`]
      : styles.checkbox_unchecked;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, disabled && styles.container_disabled]}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <AnimatedPressable
        style={[styles.checkbox, styles[`checkbox_${size}`], checkboxVariantStyle, animatedStyle]}
        onPress={handlePress}
        disabled={disabled}
      >
        {checked && (
          <View style={styles.checkmark}>
            <Text style={[styles.checkmarkText, styles[`checkmarkText_${size}`]]}>✓</Text>
          </View>
        )}
      </AnimatedPressable>

      {label && <Text style={[styles.label, styles[`label_${size}`], disabled && styles.label_disabled]}>{label}</Text>}
    </Pressable>
  );
}

Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  container_disabled: {
    opacity: 0.5,
  },

  // Checkbox base
  checkbox: {
    borderWidth: 2,
    borderRadius: radii.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.muted,
  },

  // Sizes
  checkbox_sm: {
    width: 16,
    height: 16,
  },
  checkbox_default: {
    width: 20,
    height: 20,
  },
  checkbox_lg: {
    width: 24,
    height: 24,
  },

  // States
  checkbox_unchecked: {
    borderColor: colors.border,
    backgroundColor: colors.muted,
  },

  checkbox_checked_primary: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkbox_checked_secondary: {
    borderColor: colors.secondary,
    backgroundColor: colors.secondary,
  },
  checkbox_checked_success: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },

  checkbox_invalid: {
    borderColor: colors.error,
    backgroundColor: colors.muted,
  },

  // Checkmark
  checkmark: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkmarkText: {
    color: colors.white,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: '700',
  },

  checkmarkText_sm: {
    fontSize: 10,
  },
  checkmarkText_default: {
    fontSize: 12,
  },
  checkmarkText_lg: {
    fontSize: 14,
  },

  // Label
  label: {
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
  },

  label_sm: {
    fontSize: typography.fontSize.caption,
  },
  label_default: {
    fontSize: typography.fontSize.body,
  },
  label_lg: {
    fontSize: typography.fontSize.titleMd,
  },

  label_disabled: {
    color: colors.textMuted,
  },
});
