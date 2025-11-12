/**
 * Label Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Label pour les formulaires et étiquettes
 */

import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { colors, spacing, typography } from '../../theme';

export interface LabelProps extends TextProps {
  /** Texte du label */
  children: React.ReactNode;
  /** Est requis */
  required?: boolean;
  /** Est désactivé */
  disabled?: boolean;
  /** Size du label */
  size?: 'sm' | 'default' | 'lg';
  /** Variant du label */
  variant?: 'default' | 'muted' | 'error' | 'success';
}

export default function Label({
  children,
  required = false,
  disabled = false,
  size = 'default',
  variant = 'default',
  style,
  ...props
}: LabelProps) {
  return (
    <Text
      style={[styles.base, styles[`size_${size}`], styles[`variant_${variant}`], disabled && styles.disabled, style]}
      {...props}
    >
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
}

Label.displayName = 'Label';

const styles = StyleSheet.create({
  // Base
  base: {
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },

  // Sizes
  size_sm: {
    fontSize: typography.fontSize.caption,
  },
  size_default: {
    fontSize: typography.fontSize.label,
  },
  size_lg: {
    fontSize: typography.fontSize.body,
  },

  // Variants
  variant_default: {
    color: colors.textPrimary,
  },
  variant_muted: {
    color: colors.textMuted,
  },
  variant_error: {
    color: colors.error,
  },
  variant_success: {
    color: colors.success,
  },

  // States
  disabled: {
    opacity: 0.5,
    color: colors.textMuted,
  },

  // Required indicator
  required: {
    color: colors.error,
    fontSize: typography.fontSize.label,
  },
});
