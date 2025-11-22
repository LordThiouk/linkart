import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface OrderSummaryCardProps {
  productTitle: string;
  licenseLabel: string;
  basePrice?: number;
  commission?: number;
  total?: number;
  currency?: string;
}

export function OrderSummaryCard({
  productTitle,
  licenseLabel,
  basePrice,
  commission,
  total,
  currency = 'F',
}: OrderSummaryCardProps) {
  const hasBreakdown = typeof basePrice === 'number' && typeof commission === 'number';
  const computedTotal = typeof total === 'number' ? total : hasBreakdown ? basePrice - commission : undefined;
  const finalTotal = formatAmount(Math.max(0, computedTotal ?? 0), currency);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Commande</Text>

      <View style={styles.row}>
        <Text style={styles.label}>{productTitle}</Text>
        <Text style={styles.value}>{licenseLabel}</Text>
      </View>

      {hasBreakdown && (
        <>
          <View style={styles.divider} />
          <View style={styles.meta}>
            <Text style={styles.metaText}>Prix</Text>
            <Text style={styles.metaValue}>{formatAmount(basePrice, currency)}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.metaText}>Commission (5%)</Text>
            <Text style={styles.metaValue}>- {formatAmount(commission, currency)}</Text>
          </View>
        </>
      )}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Montant total</Text>
        <Text style={styles.totalValue}>{finalTotal}</Text>
      </View>
    </View>
  );
}

function formatAmount(amount: number, currency: string) {
  return `${amount.toLocaleString()} ${currency}`;
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  value: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  metaValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  totalValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
  },
});
