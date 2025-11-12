/**
 * InputOTP Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant InputOTP pour codes de vérification
 */

import React, { useRef, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, radii, typography } from '../../theme';

export interface InputOTPProps {
  /** Nombre de digits */
  length?: number;
  /** Valeur actuelle */
  value?: string;
  /** Fonction appelée au changement */
  onValueChange?: (value: string) => void;
  /** Fonction appelée quand tous les digits sont remplis */
  onComplete?: (value: string) => void;
  /** Label */
  label?: string;
  /** État désactivé */
  disabled?: boolean;
  /** État invalide (erreur) */
  invalid?: boolean;
  /** Message d'erreur */
  error?: string;
  /** Type de clavier */
  keyboardType?: 'numeric' | 'default';
}

export default function InputOTP({
  length = 6,
  value = '',
  onValueChange,
  onComplete,
  label,
  disabled = false,
  invalid = false,
  error,
  keyboardType = 'numeric',
}: InputOTPProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const digits = value.split('').concat(Array(length - value.length).fill(''));

  const handleChange = (text: string, index: number) => {
    if (disabled) return;

    // Allow only single character
    const newDigit = text.slice(-1);

    // Only allow numbers if keyboardType is numeric
    if (keyboardType === 'numeric' && !/^\d*$/.test(newDigit)) {
      return;
    }

    const newValue = digits.slice(0, index).join('') + newDigit + digits.slice(index + 1).join('');

    const cleanedValue = newValue.slice(0, length);
    onValueChange?.(cleanedValue);

    // Auto-focus next input
    if (newDigit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all digits are filled
    if (cleanedValue.length === length) {
      onComplete?.(cleanedValue);
      inputRefs.current[index]?.blur();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handlePress = (index: number) => {
    if (disabled) return;
    inputRefs.current[index]?.focus();
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {digits.map((digit, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            style={[
              styles.digitBox,
              focusedIndex === index && styles.digitBox_focused,
              invalid && styles.digitBox_invalid,
              disabled && styles.digitBox_disabled,
            ]}
          >
            <TextInput
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              keyboardType={keyboardType === 'numeric' ? 'number-pad' : 'default'}
              maxLength={1}
              selectTextOnFocus
              editable={!disabled}
              style={[styles.input, focusedIndex === index && styles.input_focused]}
              textAlign="center"
            />
            {!digit && focusedIndex === index && <View style={styles.cursor} />}
          </Pressable>
        ))}
      </View>

      {error && invalid && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

InputOTP.displayName = 'InputOTP';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  label: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  inputContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
  },

  digitBox: {
    width: 48,
    height: 56,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  digitBox_focused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },

  digitBox_invalid: {
    borderColor: colors.error,
  },

  digitBox_disabled: {
    opacity: 0.5,
  },

  input: {
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    width: '100%',
    height: '100%',
    padding: 0,
  },

  input_focused: {
    color: colors.primary,
  },

  cursor: {
    position: 'absolute',
    width: 2,
    height: 24,
    backgroundColor: colors.primary,
  },

  error: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.error,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
