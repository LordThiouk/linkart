/**
 * RadioGroup Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant RadioGroup réutilisable avec animations
 */

import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface RadioOption {
  /** Valeur de l'option */
  value: string;
  /** Label affiché */
  label: string;
  /** Option désactivée */
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Options disponibles */
  options: RadioOption[];
  /** Valeur sélectionnée */
  value?: string;
  /** Fonction appelée au changement */
  onValueChange?: (value: string) => void;
  /** État désactivé global */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';
  /** Size */
  size?: 'sm' | 'default' | 'lg';
  /** Layout direction */
  orientation?: 'vertical' | 'horizontal';
}

export default function RadioGroup({
  options,
  value,
  onValueChange,
  disabled = false,
  invalid = false,
  variant = 'primary',
  size = 'default',
  orientation = 'vertical',
}: RadioGroupProps) {
  return (
    <View style={[styles.container, orientation === 'horizontal' && styles.container_horizontal]}>
      {options.map(option => (
        <RadioGroupItem
          key={option.value}
          option={option}
          selected={value === option.value}
          onSelect={() => onValueChange?.(option.value)}
          disabled={disabled || option.disabled}
          invalid={invalid}
          variant={variant}
          size={size}
        />
      ))}
    </View>
  );
}

RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps {
  option: RadioOption;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'default' | 'lg';
}

function RadioGroupItem({
  option,
  selected,
  onSelect,
  disabled,
  invalid,
  variant = 'primary',
  size = 'default',
}: RadioGroupItemProps) {
  const scale = useSharedValue(1);

  const handlePress = () => {
    if (disabled) return;

    scale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );

    onSelect();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const radioVariantStyle = invalid
    ? styles.radio_invalid
    : selected
      ? styles[`radio_selected_${variant}`]
      : styles.radio_unselected;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[styles.item, disabled && styles.item_disabled]}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      accessibilityLabel={option.label}
    >
      <AnimatedPressable
        style={[styles.radio, styles[`radio_${size}`], radioVariantStyle, animatedStyle]}
        onPress={handlePress}
        disabled={disabled}
      >
        {selected && <View style={[styles.indicator, styles[`indicator_${size}`], styles[`indicator_${variant}`]]} />}
      </AnimatedPressable>

      <Text style={[styles.label, styles[`label_${size}`], disabled && styles.label_disabled]}>{option.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },

  container_horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  item_disabled: {
    opacity: 0.5,
  },

  // Radio button base
  radio: {
    borderWidth: 2,
    borderRadius: radii.full,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Sizes
  radio_sm: {
    width: 16,
    height: 16,
  },
  radio_default: {
    width: 20,
    height: 20,
  },
  radio_lg: {
    width: 24,
    height: 24,
  },

  // States
  radio_unselected: {
    borderColor: colors.border,
    backgroundColor: colors.muted,
  },

  radio_selected_primary: {
    borderColor: colors.primary,
    backgroundColor: colors.transparent,
  },
  radio_selected_secondary: {
    borderColor: colors.secondary,
    backgroundColor: colors.transparent,
  },
  radio_selected_success: {
    borderColor: colors.success,
    backgroundColor: colors.transparent,
  },

  radio_invalid: {
    borderColor: colors.error,
    backgroundColor: colors.muted,
  },

  // Indicator (inner circle)
  indicator: {
    borderRadius: radii.full,
  },

  indicator_sm: {
    width: 8,
    height: 8,
  },
  indicator_default: {
    width: 10,
    height: 10,
  },
  indicator_lg: {
    width: 12,
    height: 12,
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
