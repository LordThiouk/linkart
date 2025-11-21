import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Music, FileAudio, LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

interface UploadPreviewCardProps {
  title: string;
  uploadType: string;
  description: string;
  genres: string[];
  isProductType: boolean;
  bpm?: string;
  musicKey?: string;
  pricingType?: string;
  serviceTypes?: string[];
  iconColor?: [string, string];
}

export function UploadPreviewCard({
  title,
  uploadType,
  description,
  genres,
  isProductType,
  bpm,
  musicKey,
  pricingType,
  serviceTypes,
  iconColor,
}: UploadPreviewCardProps) {
  const defaultIconColor: [string, string] = isProductType
    ? [colors.primary, colors.primaryDark]
    : [colors.cyan, colors.primaryDark];
  const Icon: LucideIcon = isProductType ? Music : FileAudio;

  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <LinearGradient
          colors={iconColor || defaultIconColor}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summaryIcon}
        >
          <Icon size={32} color={colors.textPrimary} />
        </LinearGradient>
        <View style={styles.summaryContent}>
          <Text style={styles.summaryTitle}>{title}</Text>
          <Text style={styles.summaryType}>{uploadType.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.summaryDetails}>
        <View style={styles.summaryDetail}>
          <Text style={styles.summaryDetailLabel}>Description</Text>
          <Text style={styles.summaryDetailValue}>{description}</Text>
        </View>

        <View style={styles.summaryDetail}>
          <Text style={styles.summaryDetailLabel}>Genres</Text>
          <View style={styles.summaryTags}>
            {genres.map(genre => (
              <View key={genre} style={styles.summaryTag}>
                <Text style={styles.summaryTagText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        {isProductType && bpm && (
          <View style={styles.summaryRow}>
            <View style={styles.summaryDetailHalf}>
              <Text style={styles.summaryDetailLabel}>BPM</Text>
              <Text style={styles.summaryDetailValue}>{bpm}</Text>
            </View>
            {musicKey && (
              <View style={styles.summaryDetailHalf}>
                <Text style={styles.summaryDetailLabel}>Tonalité</Text>
                <Text style={styles.summaryDetailValue}>{musicKey}</Text>
              </View>
            )}
          </View>
        )}

        {!isProductType && (
          <>
            {pricingType && (
              <View style={styles.summaryDetail}>
                <Text style={styles.summaryDetailLabel}>Type de tarification</Text>
                <Text style={styles.summaryDetailValue}>
                  {pricingType === 'fixed' && 'Prix fixe'}
                  {pricingType === 'on-demand' && 'Sur devis'}
                  {pricingType === 'multi-tier' && 'Packages multiples'}
                </Text>
              </View>
            )}
            {serviceTypes && serviceTypes.length > 0 && (
              <View style={styles.summaryDetail}>
                <Text style={styles.summaryDetailLabel}>Prestations</Text>
                <View style={styles.summaryTags}>
                  {serviceTypes.map(type => (
                    <View key={type} style={[styles.summaryTag, styles.summaryTagService]}>
                      <Text style={[styles.summaryTagText, styles.summaryTagTextService]}>{type}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryIcon: {
    width: spacing.xxl * 2 + spacing.xs,
    height: spacing.xxl * 2 + spacing.xs,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContent: {
    flex: 1,
    gap: spacing.xs,
  },
  summaryTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  summaryType: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryDetails: {
    gap: spacing.md,
  },
  summaryDetail: {
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  summaryDetailHalf: {
    flex: 1,
    gap: spacing.sm,
  },
  summaryDetailLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summaryDetailValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  summaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  summaryTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceElevated,
  },
  summaryTagService: {
    backgroundColor: hexToRgba(colors.cyan, 0.1),
  },
  summaryTagText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  summaryTagTextService: {
    color: colors.cyan,
  },
});
