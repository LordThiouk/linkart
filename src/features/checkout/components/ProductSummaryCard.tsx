import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Tag } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

interface LicenseFeature {
  name: string;
  price: number;
  features: string[];
}

interface ProductSummaryCardProps {
  productTitle: string;
  artistName: string;
  coverImage: string;
  license: LicenseFeature;
}

export function ProductSummaryCard({ productTitle, artistName, coverImage, license }: ProductSummaryCardProps) {
  return (
    <View style={styles.productSummary}>
      <View style={styles.productSummaryRow}>
        <ImageWithFallback src={coverImage} alt={productTitle} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{productTitle}</Text>
          <Text style={styles.productArtist}>{artistName}</Text>
          <View style={styles.licenseBadge}>
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.licenseBadgeGradient}
            >
              <Tag size={12} color={colors.textPrimary} />
              <Text style={styles.licenseBadgeText}>{license.name}</Text>
            </LinearGradient>
          </View>
        </View>
      </View>

      <View style={styles.licenseFeatures}>
        <Text style={styles.licenseFeaturesTitle}>Cette licence inclut :</Text>
        <View style={styles.licenseFeaturesList}>
          {license.features.map((feature, index) => (
            <View key={index} style={styles.licenseFeature}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productSummary: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productSummaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  productArtist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  licenseBadge: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: radii.sm,
  },
  licenseBadgeGradient: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  licenseFeatures: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  licenseFeaturesTitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  licenseFeaturesList: {
    gap: spacing.xs,
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
    backgroundColor: colors.primary,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
