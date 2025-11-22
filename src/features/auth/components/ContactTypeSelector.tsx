import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Phone } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface ContactTypeSelectorProps {
  contactType: 'phone' | 'email';
  onTypeChange: (type: 'phone' | 'email') => void;
  testID?: string;
}

export function ContactTypeSelector({ contactType, onTypeChange, testID }: ContactTypeSelectorProps) {
  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity
        onPress={() => onTypeChange('phone')}
        style={[styles.button, contactType === 'phone' && styles.buttonActive]}
        activeOpacity={0.9}
        testID="phone-button"
      >
        {contactType === 'phone' ? (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Phone size={16} color={colors.textPrimary} />
            <Text style={styles.buttonTextActive}>Téléphone</Text>
          </LinearGradient>
        ) : (
          <>
            <Phone size={16} color={colors.textMuted} />
            <Text style={styles.buttonText}>Téléphone</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTypeChange('email')}
        style={[styles.button, contactType === 'email' && styles.buttonActive]}
        activeOpacity={0.9}
        testID="email-button"
      >
        {contactType === 'email' ? (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Mail size={16} color={colors.textPrimary} />
            <Text style={styles.buttonTextActive}>Email</Text>
          </LinearGradient>
        ) : (
          <>
            <Mail size={16} color={colors.textMuted} />
            <Text style={styles.buttonText}>Email</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    overflow: 'hidden',
  },
  buttonActive: {
    borderWidth: 0,
  },
  buttonGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  buttonTextActive: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
