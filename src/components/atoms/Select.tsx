/**
 * Select Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Select (Dropdown) réutilisable pour mobile
 */

import React, { useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, spacing, radii, typography, shadows } from '../../theme';

export interface SelectOption {
  /** Valeur de l'option */
  value: string;
  /** Label affiché */
  label: string;
  /** Option désactivée */
  disabled?: boolean;
}

export interface SelectProps {
  /** Options disponibles */
  options: SelectOption[];
  /** Valeur sélectionnée */
  value?: string;
  /** Fonction appelée au changement */
  onValueChange?: (value: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Label du select */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Message d'erreur */
  error?: string;
  /** Variant de couleur */
  variant?: 'default' | 'filled';
  /** Size */
  size?: 'sm' | 'default' | 'lg';
}

export default function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Sélectionner...',
  label,
  disabled = false,
  invalid = false,
  error,
  variant = 'default',
  size = 'default',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const opacity = useSharedValue(0);

  const selectedOption = options.find(opt => opt.value === value);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    opacity.value = withTiming(1, { duration: 200 });
  };

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 200 });
    setTimeout(() => setIsOpen(false), 200);
  };

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    handleClose();
  };

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: (1 - opacity.value) * 50,
      },
    ],
    opacity: opacity.value,
  }));

  const triggerVariantStyle = invalid ? styles.trigger_invalid : styles[`trigger_${variant}`];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        onPress={handleOpen}
        disabled={disabled}
        style={[
          styles.trigger,
          size === 'default' ? styles.trigger_default_size : styles[`trigger_${size}`],
          triggerVariantStyle,
          disabled && styles.trigger_disabled,
        ]}
      >
        <Text
          style={[styles.triggerText, styles[`triggerText_${size}`], !selectedOption && styles.triggerText_placeholder]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>

        <Text style={styles.chevron}>▼</Text>
      </Pressable>

      {error && invalid && <Text style={styles.error}>{error}</Text>}

      <Modal visible={isOpen} transparent animationType="none" onRequestClose={handleClose}>
        <Pressable onPress={handleClose}>
          <Animated.View style={[styles.backdrop, animatedBackdropStyle]}>
            <Animated.View style={[styles.modal, animatedModalStyle]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label || placeholder}</Text>
                <Pressable onPress={handleClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </Pressable>
              </View>

              <ScrollView style={styles.optionsList}>
                {options.map(option => (
                  <Pressable
                    key={option.value}
                    onPress={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                    style={[
                      styles.option,
                      option.value === value && styles.option_selected,
                      option.disabled && styles.option_disabled,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        option.value === value && styles.optionText_selected,
                        option.disabled && styles.optionText_disabled,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {option.value === value && <Text style={styles.checkmark}>✓</Text>}
                  </Pressable>
                ))}
              </ScrollView>
            </Animated.View>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
}

Select.displayName = 'Select';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  label: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },

  // Trigger (bouton)
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
  },

  trigger_sm: {
    height: 32,
  },
  trigger_default_size: {
    height: 40,
  },
  trigger_lg: {
    height: 48,
  },

  trigger_default: {
    backgroundColor: colors.muted,
    borderColor: colors.border,
  },
  trigger_filled: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },

  trigger_invalid: {
    backgroundColor: colors.muted,
    borderColor: colors.error,
  },

  trigger_disabled: {
    opacity: 0.5,
  },

  triggerText: {
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
    flex: 1,
  },

  triggerText_sm: {
    fontSize: typography.fontSize.caption,
  },
  triggerText_default: {
    fontSize: typography.fontSize.body,
  },
  triggerText_lg: {
    fontSize: typography.fontSize.titleMd,
  },

  triggerText_placeholder: {
    color: colors.textMuted,
  },

  chevron: {
    fontSize: 10,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },

  error: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.error,
    marginTop: spacing.xs,
  },

  // Modal
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },

  modal: {
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    ...shadows.lg,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  modalTitle: {
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    flex: 1,
  },

  closeButton: {
    width: 32,
    height: 32,
    borderRadius: radii.full,
    backgroundColor: colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeButtonText: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  optionsList: {
    maxHeight: 400,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  option_selected: {
    backgroundColor: colors.muted,
  },

  option_disabled: {
    opacity: 0.5,
  },

  optionText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
    flex: 1,
  },

  optionText_selected: {
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },

  optionText_disabled: {
    color: colors.textMuted,
  },

  checkmark: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
});
