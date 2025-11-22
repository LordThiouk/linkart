import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography } from '@/theme';

export interface ServiceBottomCTAProps {
  price: number;
  deliveryTime: string;
  onBook: () => void;
  testID?: string;
}

export function ServiceBottomCTA({ price, deliveryTime, onBook, testID }: ServiceBottomCTAProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text style={styles.label}>À partir de</Text>
            <Text style={styles.price}>€{price.toFixed(2)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Livraison</Text>
            <Text style={styles.delivery}>{deliveryTime}</Text>
          </View>
        </View>
        <PrimaryButton onPress={onBook} fullWidth testID="book-button">
          <View style={styles.buttonContent}>
            <Calendar size={20} color={colors.textPrimary} />
            <Text style={styles.buttonText}>Réserver ce service</Text>
          </View>
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    padding: spacing.xl,
    paddingBottom: spacing.xl + spacing.sm,
  },
  content: {
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
    gap: spacing.md,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  infoItem: {
    gap: spacing.xs,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  price: {
    color: colors.secondary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  delivery: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
  },
});
