/**
 * Input Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Input réutilisable avec support de variants, sizes et états
 */

import React, { forwardRef } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface InputProps extends TextInputProps {
  /** Label du champ */
  label?: string;
  /** Message d'erreur */
  error?: string;
  /** Message d'aide */
  helperText?: string;
  /** Icône à gauche */
  leftIcon?: React.ReactNode;
  /** Icône à droite */
  rightIcon?: React.ReactNode;
  /** Variant du input */
  variant?: 'default' | 'filled' | 'outline';
  /** Size du input */
  size?: 'sm' | 'default' | 'lg';
  /** État désactivé */
  disabled?: boolean;
  /** Largeur pleine */
  fullWidth?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = 'default',
      size = 'default',
      disabled = false,
      fullWidth = false,
      style,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <View style={[styles.container, fullWidth && styles.fullWidth]}>
        {/* Label */}
        {label && <Text style={styles.label}>{label}</Text>}

        {/* Input Container */}
        <View
          style={[
            styles.inputContainer,
            styles[variant],
            styles[`size_${size}`],
            hasError && styles.error,
            disabled && styles.disabled,
          ]}
        >
          {/* Left Icon */}
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

          {/* Text Input */}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              styles[`input_${size}`],
              leftIcon ? styles.inputWithLeftIcon : null,
              rightIcon ? styles.inputWithRightIcon : null,
              style,
            ]}
            placeholderTextColor={colors.textMuted}
            editable={!disabled}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
        </View>

        {/* Error Message */}
        {hasError && <Text style={styles.errorText}>{error}</Text>}

        {/* Helper Text */}
        {!hasError && helperText && <Text style={styles.helperText}>{helperText}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  // Container
  container: {
    marginVertical: spacing.xs,
  },
  fullWidth: {
    width: '100%',
  },

  // Label
  label: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  // Input Container
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.lg,
    borderWidth: 1,
  },

  // Variants
  default: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.surface,
    borderColor: colors.transparent,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderColor: colors.border,
    borderWidth: 2,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  size_default: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  size_lg: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  // Input
  input: {
    flex: 1,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
  },

  // Input Sizes
  input_sm: {
    fontSize: typography.fontSize.label,
  },
  input_default: {
    fontSize: typography.fontSize.body,
  },
  input_lg: {
    fontSize: typography.fontSize.titleMd,
  },

  // Input with Icons
  inputWithLeftIcon: {
    marginLeft: spacing.xs,
  },
  inputWithRightIcon: {
    marginRight: spacing.xs,
  },

  // Icon Containers
  leftIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // States
  error: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: colors.muted,
  },

  // Messages
  errorText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.error,
    marginTop: spacing.xs,
  },
  helperText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});

export default Input;
