import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

interface HomeHeroCarouselProps {
  onExploreDeals?: () => void;
  onDiscoverKits?: () => void;
  onBoost?: () => void;
}

const BANNER_WIDTH = 340;

export function HomeHeroCarousel({ onExploreDeals, onDiscoverKits, onBoost }: HomeHeroCarouselProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={BANNER_WIDTH + spacing.md}
        decelerationRate="fast"
      >
        <View style={[styles.banner, styles.banner1]}>
          <LinearGradient
            colors={[colors.primary, colors.primaryDark, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>🔥 Hot Deals</Text>
              </View>
              <Text style={styles.bannerTitle}>Beats Premium -30%</Text>
              <Text style={styles.bannerSubtitle}>Offre limitée sur une sélection de beats</Text>
              <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9} onPress={onExploreDeals}>
                <Text style={styles.bannerButtonText}>Explorer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerGlow1} />
            <View style={styles.bannerGlow2} />
          </LinearGradient>
        </View>

        <View style={[styles.banner, styles.banner2]}>
          <LinearGradient
            colors={[colors.cyan, colors.primary, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>✨ Nouveautés</Text>
              </View>
              <Text style={styles.bannerTitle}>Kits Afrobeat 2024</Text>
              <Text style={styles.bannerSubtitle}>Les derniers drum kits des producteurs top</Text>
              <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9} onPress={onDiscoverKits}>
                <Text style={[styles.bannerButtonText, { color: colors.cyan }]}>Découvrir</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerGlow1} />
          </LinearGradient>
        </View>

        <View style={[styles.banner, styles.banner3]}>
          <LinearGradient
            colors={[colors.accent, colors.secondary, colors.warning]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerContent}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>⚡ Boost</Text>
              </View>
              <Text style={styles.bannerTitle}>Boostez vos ventes</Text>
              <Text style={styles.bannerSubtitle}>+350% de visibilité garantie</Text>
              <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9} onPress={onBoost}>
                <Text style={[styles.bannerButtonText, { color: colors.accent }]}>Essayer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerGlow1} />
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  banner: {
    width: BANNER_WIDTH,
    borderRadius: radii.xxl,
    overflow: 'hidden',
  },
  bannerGradient: {
    padding: spacing.xl,
    borderRadius: radii.xxl,
    overflow: 'hidden',
  },
  bannerContent: {
    gap: spacing.sm,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  bannerBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  bannerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  bannerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  bannerButton: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  bannerButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  bannerGlow1: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    top: -spacing.md,
    right: spacing.md,
  },
  bannerGlow2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    bottom: -spacing.md,
    left: spacing.lg,
  },
  banner1: {
    borderColor: colors.primary,
  },
  banner2: {
    borderColor: colors.cyan,
  },
  banner3: {
    borderColor: colors.accent,
  },
});
