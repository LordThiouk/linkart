/**
 * Design System Helpers
 * Fonctions réutilisables pour créer des styles cohérents
 * Version: 1.0
 */

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { radii } from './radii';
import { typography } from './typography';
import { shadows } from './shadows';

/**
 * Convertit une couleur hex en rgba
 * @param hex - Couleur hex (ex: '#6366F1' ou '6366F1')
 * @param alpha - Opacité (0-1)
 * @returns Chaîne rgba (ex: 'rgba(99, 102, 241, 0.5)')
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  if (!hex || typeof hex !== 'string') {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6) {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Crée des styles pour les boutons selon variant et size
 */
export const createButtonStyle = (
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary',
  size: 'sm' | 'default' | 'lg' = 'default'
) => {
  const baseStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xxl,
  };

  const sizeStyles: Record<string, ViewStyle> = {
    sm: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    default: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    lg: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
    },
  };

  const variantStyles: Record<string, ViewStyle> = {
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
  };

  return StyleSheet.create({
    container: {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    },
  });
};

/**
 * Crée des styles de texte pour les boutons
 */
export const createButtonTextStyle = (
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary',
  size: 'sm' | 'default' | 'lg' = 'default'
) => {
  const sizeStyles: Record<string, TextStyle> = {
    sm: {
      fontSize: typography.fontSize.label,
    },
    default: {
      fontSize: typography.fontSize.body,
    },
    lg: {
      fontSize: typography.fontSize.titleMd,
    },
  };

  const variantStyles: Record<string, TextStyle> = {
    primary: {
      color: colors.white,
    },
    secondary: {
      color: colors.background, // Noir sur orange pour contraste
    },
    outline: {
      color: colors.textPrimary,
    },
    ghost: {
      color: colors.textPrimary,
    },
  };

  return StyleSheet.create({
    text: {
      fontFamily: typography.fontFamily.poppins.semibold,
      ...sizeStyles[size],
      ...variantStyles[variant],
    },
  });
};

/**
 * Crée des styles de texte selon le variant typographique
 */
export const createTextStyle = (variant: 'h1' | 'h2' | 'h3' | 'body' | 'label' | 'caption' = 'body') => {
  const variantStyles: Record<string, TextStyle> = {
    h1: {
      fontSize: typography.fontSize.displayXl,
      fontFamily: typography.fontFamily.poppins.bold,
      color: colors.textPrimary,
      lineHeight: typography.fontSize.displayXl * typography.lineHeight.tight,
    },
    h2: {
      fontSize: typography.fontSize.headingLg,
      fontFamily: typography.fontFamily.poppins.semibold,
      color: colors.textPrimary,
      lineHeight: typography.fontSize.headingLg * typography.lineHeight.tight,
    },
    h3: {
      fontSize: typography.fontSize.titleMd,
      fontFamily: typography.fontFamily.poppins.medium,
      color: colors.textPrimary,
      lineHeight: typography.fontSize.titleMd * typography.lineHeight.normal,
    },
    body: {
      fontSize: typography.fontSize.body,
      fontFamily: typography.fontFamily.inter.regular,
      color: colors.textSecondary,
      lineHeight: typography.fontSize.body * typography.lineHeight.normal,
    },
    label: {
      fontSize: typography.fontSize.label,
      fontFamily: typography.fontFamily.inter.medium,
      color: colors.textSecondary,
      lineHeight: typography.fontSize.label * typography.lineHeight.normal,
    },
    caption: {
      fontSize: typography.fontSize.caption,
      fontFamily: typography.fontFamily.inter.medium,
      color: colors.textMuted,
      lineHeight: typography.fontSize.caption * typography.lineHeight.normal,
    },
  };

  return StyleSheet.create({
    text: variantStyles[variant],
  });
};

/**
 * Crée des styles de card selon variant
 */
export const createCardStyle = (
  variant: 'default' | 'elevated' | 'outline' = 'default',
  withShadow: boolean = false
) => {
  const variantStyles: Record<string, ViewStyle> = {
    default: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    elevated: {
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
    },
    outline: {
      backgroundColor: colors.transparent,
      borderWidth: 2,
      borderColor: colors.border,
    },
  };

  return StyleSheet.create({
    container: {
      borderRadius: radii.lg,
      padding: spacing.lg,
      ...variantStyles[variant],
      ...(withShadow ? shadows.md : {}),
    },
  });
};
