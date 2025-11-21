import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface PriceBreakdownCardProps {
  basePrice: number;
  discount?: number;
  total: number;
  showCommissionInfo?: boolean;
}

export function PriceBreakdownCard({
  basePrice,
  discount = 0,
  total,
  showCommissionInfo = true,
}: PriceBreakdownCardProps) {
  return (
    <View style={styles.priceBreakdown}>
      <Text style={styles.sectionTitle}>Résumé</Text>

      <View style={styles.priceRow}>
        <Text style={styles.priceLabel}>Prix</Text>
        <Text style={styles.priceValue}>{basePrice.toLocaleString()} F</Text>
      </View>

      {discount > 0 && (
        <View style={styles.priceRow}>
          <Text style={[styles.priceLabel, styles.discountLabel]}>Réduction (10%)</Text>
          <Text style={[styles.priceValue, styles.discountValue]}>-{discount.toLocaleString()} F</Text>
        </View>
      )}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total à payer</Text>
        <Text style={styles.totalValue}>{total.toLocaleString()} F</Text>
      </View>

      {showCommissionInfo && (
        <View style={styles.commissionInfo}>
          <Text style={styles.commissionText}>
            💡 Aucun frais supplémentaire. La commission de 5% est déduite du vendeur.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  priceBreakdown: {
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  priceLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  priceValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  discountLabel: {
    color: colors.success,
  },
  discountValue: {
    color: colors.success,
  },
  totalRow: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  totalValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  commissionInfo: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  commissionText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
