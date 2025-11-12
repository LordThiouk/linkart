/**
 * TextArea Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant TextArea multilignes réutilisable
 */

import React, { forwardRef } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface TextAreaProps extends Omit<TextInputProps, 'multiline'> {
  /** Label du champ */
  label?: string;
  /** Message d'erreur */
  error?: string;
  /** Message d'aide */
  helperText?: string;
  /** Variant du textarea */
  variant?: 'default' | 'filled' | 'outline';
  /** Size du textarea */
  size?: 'sm' | 'default' | 'lg';
  /** État désactivé */
  disabled?: boolean;
  /** Largeur pleine */
  fullWidth?: boolean;
  /** Nombre de lignes par défaut */
  rows?: number;
  /** Afficher le compteur de caractères */
  showCharacterCount?: boolean;
  /** Nombre maximum de caractères */
  maxLength?: number;
}

const TextArea = forwardRef<TextInput, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'default',
      disabled = false,
      fullWidth = false,
      rows = 4,
      showCharacterCount = false,
      maxLength,
      value,
      style,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const characterCount = value?.length || 0;

    return (
      <View style={[styles.container, fullWidth && styles.fullWidth]}>
        {/* Label */}
        {label && <Text style={styles.label}>{label}</Text>}

        {/* TextArea Container */}
        <View
          style={[
            styles.textareaContainer,
            styles[variant],
            styles[`size_${size}`],
            hasError && styles.error,
            disabled && styles.disabled,
          ]}
        >
          {/* Text Input */}
          <TextInput
            ref={ref}
            style={[
              styles.textarea,
              styles[`textarea_${size}`],
              { minHeight: rows * 24 }, // Approximation de hauteur par ligne
              style,
            ]}
            placeholderTextColor={colors.textMuted}
            editable={!disabled}
            multiline
            numberOfLines={rows}
            textAlignVertical="top"
            maxLength={maxLength}
            value={value}
            {...props}
          />
        </View>

        {/* Footer Container */}
        <View style={styles.footer}>
          {/* Error or Helper Text */}
          <View style={styles.messageContainer}>
            {hasError && <Text style={styles.errorText}>{error}</Text>}
            {!hasError && helperText && <Text style={styles.helperText}>{helperText}</Text>}
          </View>

          {/* Character Count */}
          {showCharacterCount && (
            <Text style={styles.characterCount}>
              {characterCount}
              {maxLength && ` / ${maxLength}`}
            </Text>
          )}
        </View>
      </View>
    );
  }
);

TextArea.displayName = 'TextArea';

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

  // TextArea Container
  textareaContainer: {
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
    padding: spacing.sm,
  },
  size_default: {
    padding: spacing.md,
  },
  size_lg: {
    padding: spacing.lg,
  },

  // TextArea
  textarea: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
    // Pas de paddingVertical ici car géré par textareaContainer
  },

  // TextArea Sizes
  textarea_sm: {
    fontSize: typography.fontSize.label,
  },
  textarea_default: {
    fontSize: typography.fontSize.body,
  },
  textarea_lg: {
    fontSize: typography.fontSize.titleMd,
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

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: spacing.xs,
  },

  messageContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },

  // Messages
  errorText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.error,
  },
  helperText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
  },

  // Character Count
  characterCount: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textMuted,
  },
});

export default TextArea;
