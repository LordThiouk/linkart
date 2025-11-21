import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

interface ServiceInfoCardProps {
  serviceName: string;
  providerName: string;
  providerImage: string;
  packageName: string;
  price: number;
  deliveryTime: string;
}

export function ServiceInfoCard({
  serviceName,
  providerName,
  providerImage,
  packageName,
  price,
  deliveryTime,
}: ServiceInfoCardProps) {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.serviceCardHeader}>
        <ImageWithFallback src={providerImage} alt={providerName} style={styles.providerImage} />
        <View style={styles.serviceCardInfo}>
          <Text style={styles.serviceCardTitle}>{serviceName}</Text>
          <Text style={styles.serviceCardSubtitle}>{providerName}</Text>
        </View>
      </View>
      <View style={styles.serviceCardFooter}>
        <View style={styles.serviceCardDetail}>
          <Text style={styles.serviceCardDetailLabel}>Package</Text>
          <Text style={styles.serviceCardDetailValue}>{packageName}</Text>
        </View>
        <View style={styles.serviceCardDetail}>
          <Text style={styles.serviceCardDetailLabel}>Prix</Text>
          <Text style={styles.serviceCardDetailValuePrice}>€{price.toFixed(2)}</Text>
        </View>
        <View style={styles.serviceCardDetail}>
          <Text style={styles.serviceCardDetailLabel}>Délai</Text>
          <Text style={styles.serviceCardDetailValue}>{deliveryTime}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  serviceCard: {
    margin: spacing.md,
    padding: spacing.md,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs, // gap-3
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  providerImage: {
    width: spacing.xxl * 1.25, // 40px
    height: spacing.xxl * 1.25,
    borderRadius: radii.full,
  },
  serviceCardInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  serviceCardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  serviceCardSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  serviceCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  serviceCardDetail: {
    flex: 1,
    gap: spacing.xs,
  },
  serviceCardDetailLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  serviceCardDetailValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  serviceCardDetailValuePrice: {
    color: colors.secondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
});
