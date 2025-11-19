import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InputField } from '@/components/atoms/InputField';
import { colors, spacing, typography } from '@/theme';

export interface PhoneNumberFormProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  keyboardType?: 'phone-pad' | 'default';
}

export function PhoneNumberForm({
  label,
  value,
  onChange,
  placeholder = '+221 77 123 45 67',
  hint = 'Vous recevrez une notification pour valider le paiement',
  disabled = false,
  keyboardType = 'phone-pad',
}: PhoneNumberFormProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <InputField
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        editable={!disabled}
        inputStyle={styles.input}
      />
      {!!hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  label: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  input: {
    fontFamily: typography.fontFamily.inter.medium,
    fontSize: typography.fontSize.body,
  },
  hint: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
