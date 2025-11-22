import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

interface DownloadProductInfoCardProps {
  title: string;
  artist: string;
  coverImage: string;
  license: string;
}

export function DownloadProductInfoCard({ title, artist, coverImage, license }: DownloadProductInfoCardProps) {
  return (
    <View style={styles.productInfoCard}>
      <View style={styles.productInfoContent}>
        <ImageWithFallback src={coverImage} alt={title} style={styles.productImage} />
        <View style={styles.productInfoText}>
          <Text style={styles.productTitle}>{title}</Text>
          <Text style={styles.productArtist}>{artist}</Text>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.licenseBadge}
          >
            <Text style={styles.licenseBadgeText}>{license} License</Text>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productInfoCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productInfoContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
  },
  productInfoText: {
    flex: 1,
    gap: spacing.sm,
  },
  productTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  productArtist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  licenseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    alignSelf: 'flex-start',
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
