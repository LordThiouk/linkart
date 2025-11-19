import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface PurchaseDetailsCardProps {
  productTitle: string;
  licenseType: string;
  amount: number;
  transactionId: string;
  currency?: string;
  delay?: number;
}

export function PurchaseDetailsCard({
  productTitle,
  licenseType,
  amount,
  transactionId,
  currency = 'F',
  delay = 600,
}: PurchaseDetailsCardProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(delay)} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.label}>Produit</Text>
            <Text style={styles.value}>{productTitle}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Licence</Text>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.licenseBadge}
            >
              <Text style={styles.licenseBadgeText}>{licenseType.toUpperCase()}</Text>
            </LinearGradient>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Montant payé</Text>
            <Text style={styles.valuePrice}>
              {amount.toLocaleString()} {currency}
            </Text>
          </View>

          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>ID Transaction</Text>
            <Text style={styles.valueId}>{transactionId}</Text>
          </View>
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 400,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  value: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  valuePrice: {
    color: colors.success,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  licenseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.poppins.bold,
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.md - spacing.xs, // 12px
    marginBottom: spacing.md - spacing.xs, // 12px
  },
  valueId: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: 'monospace', // Monospace pour les IDs de transaction
  },
});
