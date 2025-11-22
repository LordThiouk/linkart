import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Calendar, FileText } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { ContractBadge, type LicenseType } from './ContractBadge';
import { DownloadCTA } from './DownloadCTA';
import { colors, spacing, typography, radii, hexToRgba } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface PurchaseCardProps {
  id: string;
  type: 'beat' | 'kit' | 'sample';
  title: string;
  artist: string;
  coverImage: string;
  license: LicenseType;
  purchaseDate: string;
  price: number;
  downloaded?: boolean;
  hasReview?: boolean;
  contractUrl?: string;
  onDownload?: (purchaseId: string) => void;
  onViewContract?: (purchaseId: string) => void;
  delay?: number;
}

export function PurchaseCard({
  id,
  title,
  artist,
  coverImage,
  license,
  purchaseDate,
  price,
  downloaded = false,
  hasReview = false,
  contractUrl,
  onDownload,
  onViewContract,
  delay = 0,
}: PurchaseCardProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(delay)} style={styles.card}>
      <View style={styles.content}>
        {/* Cover */}
        <ImageWithFallback src={coverImage} alt={title} style={styles.cover} />

        {/* Info */}
        <View style={styles.info}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.artist}>{artist}</Text>
            </View>
            <ContractBadge license={license} />
          </View>

          <View style={styles.meta}>
            <Calendar size={12} color={colors.textMuted} />
            <Text style={styles.date}>{new Date(purchaseDate).toLocaleDateString('fr-FR')}</Text>
            <Text style={styles.separator}>•</Text>
            <Text style={styles.price}>{price.toLocaleString()} F</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <DownloadCTA downloaded={downloaded} onPress={() => onDownload?.(id)} />
            <TouchableOpacity onPress={() => onViewContract?.(id)} style={styles.contractButton} activeOpacity={0.8}>
              <FileText size={16} color={colors.textSecondary} />
              <Text style={styles.contractText}>Contrat</Text>
            </TouchableOpacity>
          </View>

          {/* Review Status */}
          {!hasReview && (
            <View style={styles.reviewBanner}>
              <Text style={styles.reviewText}>⭐ Laissez un avis sur ce produit</Text>
            </View>
          )}
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
  },
  info: {
    flex: 1,
    gap: spacing.md - spacing.xs, // 12px
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    gap: spacing.xs,
    marginRight: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  artist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md - spacing.xs, // 12px
  },
  date: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  separator: {
    color: colors.border,
    fontSize: typography.fontSize.caption,
  },
  price: {
    color: colors.primary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  contractButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contractText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  reviewBanner: {
    padding: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: hexToRgba(colors.secondary, 0.1),
    borderWidth: 1,
    borderColor: hexToRgba(colors.secondary, 0.3),
    marginTop: spacing.sm,
  },
  reviewText: {
    color: colors.secondary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
});
