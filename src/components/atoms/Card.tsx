/**
 * Card Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Card réutilisable avec support de variants et sous-composants
 */

import React from 'react';
import { View, Text, StyleSheet, ViewProps, TextProps } from 'react-native';
import { colors, spacing, radii, typography, shadows } from '../../theme';

export interface CardProps extends ViewProps {
  /** Variant du card */
  variant?: 'default' | 'elevated' | 'outline';
  /** Size du card */
  size?: 'sm' | 'md' | 'lg';
  /** Avec ombre */
  withShadow?: boolean;
  /** Enfants */
  children: React.ReactNode;
}

export default function Card({
  variant = 'default',
  size = 'md',
  withShadow = false,
  children,
  style,
  ...props
}: CardProps) {
  return (
    <View style={[styles.base, styles[variant], styles[`size_${size}`], withShadow && shadows.md, style]} {...props}>
      {children}
    </View>
  );
}

Card.displayName = 'Card';

/**
 * CardHeader - En-tête de la card
 */
export interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
}

export function CardHeader({ children, style, ...props }: CardHeaderProps) {
  return (
    <View style={[styles.header, style]} {...props}>
      {children}
    </View>
  );
}

CardHeader.displayName = 'CardHeader';

/**
 * CardTitle - Titre de la card
 */
export interface CardTitleProps extends TextProps {
  children: React.ReactNode;
}

export function CardTitle({ children, style, ...props }: CardTitleProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

CardTitle.displayName = 'CardTitle';

/**
 * CardDescription - Description de la card
 */
export interface CardDescriptionProps extends TextProps {
  children: React.ReactNode;
}

export function CardDescription({ children, style, ...props }: CardDescriptionProps) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

CardDescription.displayName = 'CardDescription';

/**
 * CardContent - Contenu principal de la card
 */
export interface CardContentProps extends ViewProps {
  children: React.ReactNode;
}

export function CardContent({ children, style, ...props }: CardContentProps) {
  return (
    <View style={[styles.content, style]} {...props}>
      {children}
    </View>
  );
}

CardContent.displayName = 'CardContent';

/**
 * CardFooter - Pied de page de la card
 */
export interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
}

export function CardFooter({ children, style, ...props }: CardFooterProps) {
  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
}

CardFooter.displayName = 'CardFooter';

/**
 * CardAction - Zone d'actions (boutons, menu) en haut à droite
 */
export interface CardActionProps extends ViewProps {
  children: React.ReactNode;
}

export function CardAction({ children, style, ...props }: CardActionProps) {
  return (
    <View style={[styles.action, style]} {...props}>
      {children}
    </View>
  );
}

CardAction.displayName = 'CardAction';

const styles = StyleSheet.create({
  // Base
  base: {
    borderRadius: radii.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },

  // Variants
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderColor: colors.border,
    borderWidth: 2,
  },

  // Sizes
  size_sm: {
    padding: spacing.md,
  },
  size_md: {
    padding: spacing.lg,
  },
  size_lg: {
    padding: spacing.xl,
  },

  // Sub-components
  header: {
    marginBottom: spacing.md,
  },

  title: {
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  description: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textSecondary,
  },

  content: {
    // Pas de style par défaut, flexible
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },

  action: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
  },
});
