import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertCircle } from 'lucide-react-native';
import { InputField } from '@/components/atoms/InputField';
import { colors, spacing, typography, radii } from '@/theme';

interface PromoCodeSectionProps {
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  promoApplied: boolean;
  onApplyPromo: () => void;
}

export function PromoCodeSection({ promoCode, onPromoCodeChange, promoApplied, onApplyPromo }: PromoCodeSectionProps) {
  return (
    <View style={styles.promoSection}>
      <Text style={styles.sectionTitle}>Code promo</Text>
      <View style={styles.promoRow}>
        <InputField
          value={promoCode}
          onChangeText={onPromoCodeChange}
          placeholder="LINKART10"
          editable={!promoApplied}
          containerStyle={styles.promoInput}
        />
        <TouchableOpacity
          onPress={onApplyPromo}
          disabled={promoApplied || !promoCode}
          style={styles.promoButton}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.promoButtonGradient}
          >
            <Text style={styles.promoButtonText}>Appliquer</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {promoApplied && (
        <View style={styles.promoApplied}>
          <AlertCircle size={16} color={colors.success} />
          <Text style={styles.promoAppliedText}>Code promo appliqué : -10%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  promoSection: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  promoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  promoInput: {
    flex: 1,
  },
  promoButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  promoButtonGradient: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  promoApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  promoAppliedText: {
    color: colors.success,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
