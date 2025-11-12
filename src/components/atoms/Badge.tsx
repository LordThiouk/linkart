/**
 * Badge Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Badge pour tags, statuts et labels
 */

import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface BadgeProps extends ViewProps {
  /** Contenu du badge */
  children: React.ReactNode;
  /** Variant du badge */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
  /** Size du badge */
  size?: 'sm' | 'default' | 'lg';
  /** Badge visible */
  visible?: boolean;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'default',
  visible = true,
  style,
  ...props
}: BadgeProps) {
  if (!visible) return null;

  return (
    <View style={[styles.base, styles[variant], styles[`size_${size}`], style]} {...props}>
      <Text style={[styles.text, styles[`text_${variant}`], styles[`text_size_${size}`]]}>{children}</Text>
    </View>
  );
}

Badge.displayName = 'Badge';

const styles = StyleSheet.create({
  // Base
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: radii.md,
    borderWidth: 1,
    overflow: 'hidden',
  },

  // Variants
  default: {
    backgroundColor: colors.primary,
    borderColor: colors.transparent,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.transparent,
  },
  destructive: {
    backgroundColor: colors.error,
    borderColor: colors.transparent,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderColor: colors.border,
  },
  success: {
    backgroundColor: colors.success,
    borderColor: colors.transparent,
  },
  warning: {
    backgroundColor: colors.warning,
    borderColor: colors.transparent,
  },
  info: {
    backgroundColor: colors.cyan,
    borderColor: colors.transparent,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    minHeight: 20,
  },
  size_default: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    minHeight: 24,
  },
  size_lg: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 28,
  },

  // Text base
  text: {
    fontFamily: typography.fontFamily.inter.medium,
    textAlign: 'center',
  },

  // Text variants
  text_default: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.background, // Noir sur orange
  },
  text_destructive: {
    color: colors.white,
  },
  text_outline: {
    color: colors.textPrimary,
  },
  text_success: {
    color: colors.white,
  },
  text_warning: {
    color: colors.white,
  },
  text_info: {
    color: colors.white,
  },

  // Text sizes
  text_size_sm: {
    fontSize: typography.fontSize.caption,
  },
  text_size_default: {
    fontSize: typography.fontSize.label,
  },
  text_size_lg: {
    fontSize: typography.fontSize.body,
  },
});
