import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { InputField } from '@/components/atoms/InputField';
import { colors, spacing, typography, radii } from '@/theme';

interface MultiTierPrice {
  name: string;
  price: string;
  features: string;
  deliveryDays: string;
}

interface MultiTierCardProps {
  tier: MultiTierPrice;
  index: number;
  onPriceChange: (price: string) => void;
  onFeaturesChange: (features: string) => void;
  onDeliveryDaysChange: (deliveryDays: string) => void;
}

const suggestedPlaceholders = ['15000', '35000', '65000'];

export function MultiTierCard({
  tier,
  index,
  onPriceChange,
  onFeaturesChange,
  onDeliveryDaysChange,
}: MultiTierCardProps) {
  return (
    <View style={styles.tierCard}>
      <Text style={styles.tierName}>{tier.name}</Text>
      <InputField
        label="Prix (F CFA)"
        placeholder={suggestedPlaceholders[index]}
        value={tier.price}
        onChangeText={onPriceChange}
        keyboardType="numeric"
      />
      <View style={styles.textAreaSection}>
        <Text style={styles.textAreaLabel}>Fonctionnalités incluses</Text>
        <TextInput
          value={tier.features}
          onChangeText={onFeaturesChange}
          placeholder="Ex: Mixage de 1 track, 2 révisions..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={2}
          style={styles.textArea}
          textAlignVertical="top"
        />
      </View>
      <InputField
        label="Délai de livraison"
        placeholder="3 jours"
        value={tier.deliveryDays}
        onChangeText={onDeliveryDaysChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tierCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  tierName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  textAreaSection: {
    gap: spacing.sm,
  },
  textAreaLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  textArea: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    minHeight: spacing.xxl * 2,
  },
});
