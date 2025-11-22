import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flame, Play, Pause } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';
import type { HomeProduct } from '../types';

interface HomeRecentUploadsSectionProps {
  products: HomeProduct[];
  playingProductId?: string | null;
  onTogglePlay?: (productId: string) => void;
  onProductPress?: (productId: string) => void;
}

export function HomeRecentUploadsSection({
  products,
  playingProductId,
  onTogglePlay,
  onProductPress,
}: HomeRecentUploadsSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.sectionIcon}
        >
          <Flame size={20} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.sectionTitle}>Nouveautés</Text>
      </View>

      <View style={styles.list}>
        {products.map(product => (
          <TouchableOpacity
            key={product.id}
            onPress={() => onProductPress?.(product.id)}
            style={styles.item}
            activeOpacity={0.9}
          >
            <ImageWithFallback src={product.coverImage} alt={product.title} style={styles.image} />
            <View style={styles.content}>
              <View style={styles.titleRow}>
                <Text style={styles.title} numberOfLines={1}>
                  {product.title}
                </Text>
                <View
                  style={[
                    styles.typeBadge,
                    product.type === 'beat' && styles.typeBadgeBeat,
                    product.type === 'kit' && styles.typeBadgeKit,
                    product.type === 'sample' && styles.typeBadgeSample,
                  ]}
                >
                  <Text
                    style={[
                      styles.typeBadgeText,
                      product.type === 'beat' && styles.typeBadgeTextBeat,
                      product.type === 'kit' && styles.typeBadgeTextKit,
                      product.type === 'sample' && styles.typeBadgeTextSample,
                    ]}
                  >
                    {product.type}
                  </Text>
                </View>
              </View>
              {product.artist && (
                <Text style={styles.artist} numberOfLines={1}>
                  {product.artist}
                </Text>
              )}
              <View style={styles.meta}>
                {product.bpm && (
                  <>
                    <Text style={styles.metaText}>{product.bpm} BPM</Text>
                    <Text style={styles.metaSeparator}>•</Text>
                  </>
                )}
                <Text style={styles.metaText}>{product.price} F</Text>
              </View>
            </View>
            {product.type === 'beat' && (
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  onTogglePlay?.(product.id);
                }}
                style={styles.playButton}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.playGradient}
                >
                  {playingProductId === product.id ? (
                    <Pause size={20} color={colors.textPrimary} fill={colors.textPrimary} />
                  ) : (
                    <Play size={20} color={colors.textPrimary} fill={colors.textPrimary} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionIcon: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  list: {
    gap: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.md,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: radii.lg,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceElevated,
  },
  typeBadgeText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  typeBadgeBeat: {
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  typeBadgeTextBeat: {
    color: colors.primary,
  },
  typeBadgeKit: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  typeBadgeTextKit: {
    color: colors.secondary,
  },
  typeBadgeSample: {
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
  },
  typeBadgeTextSample: {
    color: colors.accent,
  },
  artist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  metaSeparator: {
    color: colors.textMuted,
  },
  playButton: {
    padding: spacing.xs,
    borderRadius: radii.full,
  },
  playGradient: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
