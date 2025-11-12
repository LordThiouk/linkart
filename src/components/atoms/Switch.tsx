/**
 * Switch Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Switch (toggle) réutilisable avec animations
 */

import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

export interface SwitchProps {
  /** État activé */
  checked?: boolean;
  /** Fonction appelée au changement */
  onCheckedChange?: (checked: boolean) => void;
  /** Label du switch */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';
  /** Size */
  size?: 'sm' | 'default' | 'lg';
}

export default function Switch({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  variant = 'primary',
  size = 'default',
}: SwitchProps) {
  const translateX = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    translateX.value = withTiming(checked ? 1 : 0, { duration: 200 });
  }, [checked, translateX]);

  const handlePress = () => {
    if (disabled) return;
    onCheckedChange?.(!checked);
  };

  const animatedThumbStyle = useAnimatedStyle(() => {
    const sizes = {
      sm: { width: 28, thumbSize: 12 },
      default: { width: 32, thumbSize: 16 },
      lg: { width: 44, thumbSize: 20 },
    };

    const { width, thumbSize } = sizes[size];
    const maxTranslate = width - thumbSize - 4; // 2px padding each side

    return {
      transform: [
        {
          translateX: translateX.value * maxTranslate,
        },
      ],
    };
  });

  const trackVariantStyle = checked ? styles[`track_checked_${variant}`] : styles.track_unchecked;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.container, disabled && styles.container_disabled]}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View style={[styles.track, styles[`track_${size}`], trackVariantStyle]}>
        <Animated.View style={[styles.thumb, styles[`thumb_${size}`], animatedThumbStyle]} />
      </View>

      {label && <Text style={[styles.label, styles[`label_${size}`], disabled && styles.label_disabled]}>{label}</Text>}
    </Pressable>
  );
}

Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  container_disabled: {
    opacity: 0.5,
  },

  // Track (background)
  track: {
    borderRadius: radii.full,
    padding: 2,
    justifyContent: 'center',
  },

  track_sm: {
    width: 28,
    height: 16,
  },
  track_default: {
    width: 32,
    height: 20,
  },
  track_lg: {
    width: 44,
    height: 24,
  },

  track_unchecked: {
    backgroundColor: colors.border,
  },

  track_checked_primary: {
    backgroundColor: colors.primary,
  },
  track_checked_secondary: {
    backgroundColor: colors.secondary,
  },
  track_checked_success: {
    backgroundColor: colors.success,
  },

  // Thumb (circle)
  thumb: {
    backgroundColor: colors.white,
    borderRadius: radii.full,
  },

  thumb_sm: {
    width: 12,
    height: 12,
  },
  thumb_default: {
    width: 16,
    height: 16,
  },
  thumb_lg: {
    width: 20,
    height: 20,
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
