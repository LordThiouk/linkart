import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DollarSign } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export type LicenseType = 'basic' | 'premium' | 'exclusive';

interface License {
  price: string;
  enabled: boolean;
}

interface LicenseCardProps {
  licenseType: LicenseType;
  name: string;
  features: string[];
  suggestedPrice: number;
  license: License;
  onPriceChange: (price: string) => void;
}

export function LicenseCard({ licenseType, name, features, suggestedPrice, license, onPriceChange }: LicenseCardProps) {
  return (
    <View style={styles.licenseCard}>
      <View style={styles.licenseHeader}>
        <Text style={styles.licenseName}>{name}</Text>
        <Text style={styles.licenseSuggested}>Suggéré: {suggestedPrice} F</Text>
      </View>
      <View style={styles.licenseFeatures}>
        {features.map(feature => (
          <View key={feature} style={styles.licenseFeature}>
            <View style={styles.licenseFeatureDot} />
            <Text style={styles.licenseFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>
      <View style={styles.licensePriceInput}>
        <DollarSign size={20} color={colors.textMuted} style={styles.priceIcon} />
        <TextInput
          placeholder={suggestedPrice.toString()}
          value={license.price}
          onChangeText={onPriceChange}
          keyboardType="numeric"
          style={styles.priceInput}
          placeholderTextColor={colors.textMuted}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  licenseCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  licenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  licenseName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  licenseSuggested: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  licenseFeatures: {
    gap: spacing.sm,
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  licenseFeatureDot: {
    width: spacing.xs,
    height: spacing.xs,
    borderRadius: spacing.xs / 2,
    backgroundColor: colors.primary,
  },
  licenseFeatureText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    flex: 1,
  },
  licensePriceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  priceIcon: {
    marginRight: spacing.xs,
  },
  priceInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
