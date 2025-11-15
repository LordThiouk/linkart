import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, FileText, Music2, Package, Filter, Calendar } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

interface MyPurchasesScreenFigmaProps {
  onBack?: () => void;
  onDownload?: (purchaseId: string) => void;
  onViewContract?: (purchaseId: string) => void;
}

const purchasesData = [
  {
    id: 'p1',
    type: 'beat' as const,
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Premium',
    purchaseDate: '2024-11-01',
    price: 49000,
    downloaded: true,
    hasReview: true,
    contractUrl: '/contracts/p1.pdf',
  },
  {
    id: 'p2',
    type: 'kit' as const,
    title: 'Afro Percussion Kit',
    artist: 'BeatMaker',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    license: 'Basic',
    purchaseDate: '2024-10-28',
    price: 15000,
    downloaded: false,
    hasReview: false,
    contractUrl: '/contracts/p2.pdf',
  },
  {
    id: 'p3',
    type: 'beat' as const,
    title: 'Summer Dreams',
    artist: 'Melodic Soul',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Exclusive',
    purchaseDate: '2024-10-15',
    price: 299000,
    downloaded: true,
    hasReview: true,
    contractUrl: '/contracts/p3.pdf',
  },
];

export function MyPurchasesScreenFigma({ onBack, onDownload, onViewContract }: MyPurchasesScreenFigmaProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'beats' | 'kits'>('all');

  const filteredPurchases = purchasesData.filter(purchase => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'beats') return purchase.type === 'beat';
    if (selectedFilter === 'kits') return purchase.type === 'kit';
    return true;
  });

  const totalSpent = purchasesData.reduce((sum, p) => sum + p.price, 0);

  const stats = [
    { label: 'Total dépensé', value: `${totalSpent.toLocaleString()} F`, icon: '💰' },
    { label: 'Achats', value: purchasesData.length.toString(), icon: '📦' },
    { label: 'Téléchargés', value: purchasesData.filter(p => p.downloaded).length.toString(), icon: '⬇️' },
  ];

  const filters = [
    { id: 'all' as const, label: 'Tout', icon: Filter },
    { id: 'beats' as const, label: 'Beats', icon: Music2 },
    { id: 'kits' as const, label: 'Kits', icon: Package },
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
              <Text style={styles.headerTitle}>Mes Achats</Text>
              <Text style={styles.headerSubtitle}>
                {purchasesData.length} produit{purchasesData.length > 1 ? 's' : ''} acheté
                {purchasesData.length > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Stats */}
        <AnimatedView entering={FadeIn} style={styles.statsSection}>
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <AnimatedView key={stat.label} entering={FadeInDown.delay(index * 50)} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </AnimatedView>
            ))}
          </View>
        </AnimatedView>

        {/* Filters */}
        <AnimatedView entering={FadeIn.delay(200)} style={styles.filtersSection}>
          <View style={styles.filtersContainer}>
            {filters.map(filter => {
              const Icon = filter.icon;
              const isSelected = selectedFilter === filter.id;

              return (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setSelectedFilter(filter.id)}
                  style={[styles.filterButton, isSelected && styles.filterButtonSelected]}
                  activeOpacity={0.8}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={[colors.primary, colors.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.filterButtonGradient}
                    >
                      <Icon size={16} color={colors.textPrimary} />
                      <Text style={styles.filterButtonTextSelected}>{filter.label}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.filterButtonContent}>
                      <Icon size={16} color={colors.textMuted} />
                      <Text style={styles.filterButtonText}>{filter.label}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </AnimatedView>

        {/* Purchases List */}
        <AnimatedView entering={FadeIn.delay(300)} style={styles.purchasesSection}>
          {filteredPurchases.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Package size={40} color={colors.border} />
              </View>
              <Text style={styles.emptyTitle}>Aucun achat</Text>
              <Text style={styles.emptySubtitle}>Vos achats apparaîtront ici</Text>
            </View>
          ) : (
            <View style={styles.purchasesList}>
              {filteredPurchases.map((purchase, index) => (
                <AnimatedView key={purchase.id} entering={FadeInDown.delay(index * 100)} style={styles.purchaseCard}>
                  <View style={styles.purchaseContent}>
                    {/* Cover */}
                    <ImageWithFallback src={purchase.coverImage} alt={purchase.title} style={styles.purchaseCover} />

                    {/* Info */}
                    <View style={styles.purchaseInfo}>
                      <View style={styles.purchaseHeader}>
                        <View style={styles.purchaseTitleContainer}>
                          <Text style={styles.purchaseTitle} numberOfLines={1}>
                            {purchase.title}
                          </Text>
                          <Text style={styles.purchaseArtist}>{purchase.artist}</Text>
                        </View>
                        <View
                          style={[
                            styles.licenseBadge,
                            purchase.license === 'Exclusive'
                              ? styles.licenseBadgeExclusive
                              : purchase.license === 'Premium'
                                ? styles.licenseBadgePremium
                                : styles.licenseBadgeBasic,
                          ]}
                        >
                          {purchase.license === 'Exclusive' || purchase.license === 'Premium' ? (
                            <LinearGradient
                              colors={
                                purchase.license === 'Exclusive'
                                  ? [colors.accent, colors.secondary]
                                  : [colors.primary, colors.primaryDark]
                              }
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.licenseBadgeGradient}
                            >
                              <Text style={styles.licenseBadgeText}>{purchase.license}</Text>
                            </LinearGradient>
                          ) : (
                            <Text style={styles.licenseBadgeTextBasic}>{purchase.license}</Text>
                          )}
                        </View>
                      </View>

                      <View style={styles.purchaseMeta}>
                        <Calendar size={12} color={colors.textMuted} />
                        <Text style={styles.purchaseDate}>
                          {new Date(purchase.purchaseDate).toLocaleDateString('fr-FR')}
                        </Text>
                        <Text style={styles.purchaseMetaSeparator}>•</Text>
                        <Text style={styles.purchasePrice}>{purchase.price.toLocaleString()} F</Text>
                      </View>

                      {/* Actions */}
                      <View style={styles.purchaseActions}>
                        <TouchableOpacity
                          onPress={() => onDownload?.(purchase.id)}
                          style={styles.downloadButton}
                          activeOpacity={0.8}
                        >
                          <LinearGradient
                            colors={[colors.primary, colors.primaryDark]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.downloadButtonGradient}
                          >
                            <Download size={16} color={colors.textPrimary} />
                            <Text style={styles.downloadButtonText}>
                              {purchase.downloaded ? 'Retélécharger' : 'Télécharger'}
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => onViewContract?.(purchase.id)}
                          style={styles.contractButton}
                          activeOpacity={0.8}
                        >
                          <FileText size={16} color={colors.textSecondary} />
                          <Text style={styles.contractButtonText}>Contrat</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Review Status */}
                      {!purchase.hasReview && (
                        <View style={styles.reviewBanner}>
                          <Text style={styles.reviewBannerText}>⭐ Laissez un avis sur ce produit</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </AnimatedView>
              ))}
            </View>
          )}
        </AnimatedView>
      </ScrollView>
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
    marginBottom: spacing.md,
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
    paddingBottom: spacing.xxl + spacing.xl, // 80px
  },
  statsSection: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
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
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filtersSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonSelected: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  filterButtonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filterButtonTextSelected: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  purchasesSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  purchasesList: {
    gap: spacing.md,
  },
  purchaseCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  purchaseContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  purchaseCover: {
    width: 80,
    height: 80,
    borderRadius: radii.md,
  },
  purchaseInfo: {
    flex: 1,
    gap: spacing.md - spacing.xs, // 12px
  },
  purchaseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  purchaseTitleContainer: {
    flex: 1,
    gap: spacing.xs,
    marginRight: spacing.sm,
  },
  purchaseTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  purchaseArtist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  licenseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    overflow: 'hidden',
  },
  licenseBadgeExclusive: {
    // Gradient handled by LinearGradient
  },
  licenseBadgePremium: {
    // Gradient handled by LinearGradient
  },
  licenseBadgeBasic: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  licenseBadgeGradient: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  licenseBadgeTextBasic: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  purchaseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md - spacing.xs, // 12px
  },
  purchaseDate: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  purchaseMetaSeparator: {
    color: colors.border,
    fontSize: typography.fontSize.caption,
  },
  purchasePrice: {
    color: colors.primary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  purchaseActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  downloadButton: {
    flex: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md - spacing.xs, // 12px
  },
  downloadButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
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
  contractButtonText: {
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
  reviewBannerText: {
    color: colors.secondary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2, // 48px
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
