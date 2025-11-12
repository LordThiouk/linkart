/**
 * Alert Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Alert pour afficher des messages de feedback
 */

import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface AlertProps extends ViewProps {
  /** Titre de l'alert */
  title?: string;
  /** Description/message de l'alert */
  description?: string;
  /** Variant de l'alert */
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  /** Icône à gauche (optionnel) */
  icon?: React.ReactNode;
  /** Enfants custom */
  children?: React.ReactNode;
}

export default function Alert({
  title,
  description,
  variant = 'default',
  icon,
  children,
  style,
  ...props
}: AlertProps) {
  return (
    <View style={[styles.base, styles[variant], style]} {...props}>
      {icon && <View style={styles.icon}>{icon}</View>}

      <View style={styles.content}>
        {title && <Text style={[styles.title, styles[`title_${variant}`]]}>{title}</Text>}
        {description && <Text style={[styles.description, styles[`description_${variant}`]]}>{description}</Text>}
        {children}
      </View>
    </View>
  );
}

Alert.displayName = 'Alert';

const styles = StyleSheet.create({
  // Base
  base: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: spacing.md,
  },

  // Variants
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  destructive: {
    backgroundColor: `${colors.error}15`, // 15% opacity
    borderColor: colors.error,
  },
  success: {
    backgroundColor: `${colors.success}15`,
    borderColor: colors.success,
  },
  warning: {
    backgroundColor: `${colors.warning}15`,
    borderColor: colors.warning,
  },
  info: {
    backgroundColor: `${colors.cyan}15`,
    borderColor: colors.cyan,
  },

  // Icon
  icon: {
    paddingTop: 2,
  },

  // Content
  content: {
    flex: 1,
    gap: spacing.xs,
  },

  // Title
  title: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    lineHeight: typography.lineHeight.tight,
  },

  title_default: {
    color: colors.textPrimary,
  },
  title_destructive: {
    color: colors.error,
  },
  title_success: {
    color: colors.success,
  },
  title_warning: {
    color: colors.warning,
  },
  title_info: {
    color: colors.cyan,
  },

  // Description
  description: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: typography.lineHeight.relaxed,
  },

  description_default: {
    color: colors.textSecondary,
  },
  description_destructive: {
    color: colors.error,
    opacity: 0.9,
  },
  description_success: {
    color: colors.success,
    opacity: 0.9,
  },
  description_warning: {
    color: colors.warning,
    opacity: 0.9,
  },
  description_info: {
    color: colors.cyan,
    opacity: 0.9,
  },
});
