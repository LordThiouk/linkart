/**
 * Separator Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Separator pour diviser visuellement les sections
 */

import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing } from '../../theme';

export interface SeparatorProps extends ViewProps {
  /** Orientation du separator */
  orientation?: 'horizontal' | 'vertical';
  /** Variant du separator */
  variant?: 'default' | 'muted' | 'strong';
  /** Taille du separator */
  size?: 'sm' | 'default' | 'lg';
  /** Largeur pleine */
  fullWidth?: boolean;
}

export default function Separator({
  orientation = 'horizontal',
  variant = 'default',
  size = 'default',
  fullWidth = false,
  style,
  ...props
}: SeparatorProps) {
  return (
    <View
      style={[
        styles.base,
        styles[orientation],
        styles[`${orientation}_${size}`],
        styles[`variant_${variant}`],
        fullWidth && orientation === 'horizontal' && styles.fullWidth,
        style,
      ]}
      {...props}
    />
  );
}

Separator.displayName = 'Separator';

const styles = StyleSheet.create({
  // Base
  base: {
    backgroundColor: colors.border,
  },

  // Orientation - Horizontal
  horizontal: {
    width: '100%',
    marginVertical: spacing.md,
  },

  // Horizontal Sizes
  horizontal_sm: {
    height: 1,
  },
  horizontal_default: {
    height: 1,
  },
  horizontal_lg: {
    height: 2,
  },

  // Orientation - Vertical
  vertical: {
    height: '100%',
    marginHorizontal: spacing.md,
  },

  // Vertical Sizes
  vertical_sm: {
    width: 1,
  },
  vertical_default: {
    width: 1,
  },
  vertical_lg: {
    width: 2,
  },

  // Variants
  variant_default: {
    backgroundColor: colors.border,
  },
  variant_muted: {
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  variant_strong: {
    backgroundColor: colors.textSecondary,
  },

  // Full Width
  fullWidth: {
    width: '100%',
  },
});
