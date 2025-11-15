import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Zap, Info, Check } from 'lucide-react-native';
import { BoostCardFigma } from '../../components/atoms/BoostCardFigma';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

interface BoostScreenFigmaProps {
  onBack?: () => void;
  itemType: 'product' | 'profile';
  itemName?: string;
}

const boostPlans = [
  {
    duration: '24h' as const,
    price: 2500,
    views: '500-1000',
    isPopular: false,
  },
  {
    duration: '7j' as const,
    price: 12000,
    views: '5k-10k',
    isPopular: true,
  },
  {
    duration: '30j' as const,
    price: 35000,
    views: '25k-50k',
    isPopular: false,
  },
];

export function BoostScreenFigma({ onBack, itemType, itemName }: BoostScreenFigmaProps) {
  const [selectedPlan, setSelectedPlan] = useState<'24h' | '7j' | '30j' | null>(null);

  const handlePurchaseBoost = () => {
    if (!selectedPlan) return;
    // Handle boost purchase
    console.log('Purchasing boost:', selectedPlan);
  };

  const benefits = [
    'Mise en avant dans les résultats',
    'Badge "Boosté" sur votre contenu',
    'Statistiques détaillées en temps réel',
    'Ciblage géographique automatique',
  ];

  const stats = [
    { label: 'Vues', value: '+350%', icon: '👁️' },
    { label: 'Clics', value: '+240%', icon: '🎯' },
    { label: 'Ventes', value: '+180%', icon: '💰' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ArrowLeft size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Booster la visibilité</Text>
              <Text style={styles.headerSubtitle}>
                {itemType === 'product' ? '📦 Produit' : '👤 Profil'} • {itemName || 'Sélection'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Hero Section */}
        <AnimatedView entering={FadeIn} style={styles.heroSection}>
          <LinearGradient
            colors={[hexToRgba(colors.primary, 0.2), hexToRgba(colors.primaryDark, 0.2), hexToRgba(colors.accent, 0.2)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroHeader}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.heroIcon}
              >
                <Zap size={24} color={colors.textPrimary} fill={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.heroTitle}>Augmentez votre visibilité</Text>
            </View>
            <Text style={styles.heroSubtitle}>
              Apparaissez en tête des résultats de recherche et attirez plus de clients
            </Text>

            {/* Benefits */}
            <View style={styles.benefitsContainer}>
              {benefits.map((benefit, index) => (
                <View key={index} style={styles.benefitItem}>
                  <LinearGradient
                    colors={[colors.cyan, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.benefitIcon}
                  >
                    <Check size={12} color={colors.textPrimary} />
                  </LinearGradient>
                  <Text style={styles.benefitText}>{benefit}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Info Banner */}
        <AnimatedView entering={FadeIn.delay(100)} style={styles.infoBanner}>
          <View style={styles.infoBannerContent}>
            <Info size={20} color={colors.cyan} />
            <View style={styles.infoBannerText}>
              <Text style={styles.infoBannerTitle}>💡 Astuce</Text>
              <Text style={styles.infoBannerMessage}>
                Les boosts de 7 jours offrent le meilleur rapport qualité-prix et permettent une exposition continue
              </Text>
            </View>
          </View>
        </AnimatedView>

        {/* Plans */}
        <AnimatedView entering={FadeIn.delay(200)} style={styles.plansSection}>
          <Text style={styles.sectionTitle}>Choisissez votre durée</Text>
          <View style={styles.plansContainer}>
            {boostPlans.map((plan, index) => (
              <AnimatedView key={plan.duration} entering={FadeInDown.delay(index * 100)} style={styles.planWrapper}>
                <TouchableOpacity
                  onPress={() => setSelectedPlan(plan.duration)}
                  style={styles.planTouchable}
                  activeOpacity={0.9}
                >
                  <BoostCardFigma {...plan} onSelect={() => setSelectedPlan(plan.duration)} />
                  {selectedPlan === plan.duration && (
                    <AnimatedView entering={FadeIn} style={styles.selectedBadge}>
                      <LinearGradient
                        colors={[colors.cyan, colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.selectedBadgeGradient}
                      >
                        <Check size={20} color={colors.textPrimary} />
                      </LinearGradient>
                    </AnimatedView>
                  )}
                </TouchableOpacity>
              </AnimatedView>
            ))}
          </View>
        </AnimatedView>

        {/* Stats Preview */}
        <AnimatedView entering={FadeIn.delay(400)} style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Résultats attendus</Text>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <AnimatedView key={stat.label} entering={FadeInDown.delay(index * 100)} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </AnimatedView>
            ))}
          </View>
        </AnimatedView>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      {selectedPlan && (
        <AnimatedView entering={FadeIn} style={styles.bottomCTA}>
          <LinearGradient
            colors={[colors.transparent, colors.background, colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.bottomCTAGradient}
          >
            <View style={styles.bottomCTAContent}>
              <PrimaryButton onPress={handlePurchaseBoost} fullWidth>
                <View style={styles.ctaButtonContent}>
                  <Zap size={20} color={colors.textPrimary} fill={colors.textPrimary} />
                  <Text style={styles.ctaButtonText}>
                    Acheter le boost {selectedPlan} -{' '}
                    {boostPlans.find(p => p.duration === selectedPlan)?.price.toLocaleString()} F
                  </Text>
                </View>
              </PrimaryButton>
            </View>
          </LinearGradient>
        </AnimatedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl + spacing.lg, // 48px
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4, // 28px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  scrollContent: {
    paddingBottom: 120, // Fixed value for bottom CTA space
  },
  heroSection: {
    padding: spacing.lg,
  },
  heroCard: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: hexToRgba(colors.primary, 0.3),
    gap: spacing.md,
    overflow: 'hidden',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // 12px
    marginBottom: spacing.md,
  },
  heroIcon: {
    width: spacing.xxl + spacing.xs, // 40px
    height: spacing.xxl + spacing.xs, // 40px
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg, // 24px
    fontFamily: typography.fontFamily.poppins.bold,
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.md,
  },
  benefitsContainer: {
    gap: spacing.md - spacing.xs, // 12px
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // 12px
  },
  benefitIcon: {
    width: spacing.xl - spacing.xs, // 20px
    height: spacing.xl - spacing.xs, // 20px
    borderRadius: spacing.xl / 2, // 10px (half of width/height for perfect circle)
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  infoBanner: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  infoBannerContent: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs, // 12px
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: hexToRgba(colors.cyan, 0.1),
    borderWidth: 1,
    borderColor: hexToRgba(colors.cyan, 0.3),
  },
  infoBannerText: {
    flex: 1,
    gap: spacing.xs,
  },
  infoBannerTitle: {
    color: colors.cyan,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  infoBannerMessage: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  plansSection: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  plansContainer: {
    gap: spacing.md,
  },
  planWrapper: {
    position: 'relative',
  },
  planTouchable: {
    position: 'relative',
  },
  selectedBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl / 2, // 16px (half of width/height for perfect circle)
    overflow: 'hidden',
    zIndex: 1,
  },
  selectedBadgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs, // 12px
  },
  statCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: spacing.lg,
    marginBottom: spacing.sm,
  },
  statValue: {
    color: colors.cyan,
    fontSize: typography.fontSize.body + 2, // 18px
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: hexToRgba(colors.border, 0.5),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  bottomCTAGradient: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  bottomCTAContent: {
    maxWidth: 375,
    alignSelf: 'center',
    width: '100%',
  },
  ctaButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  ctaButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
