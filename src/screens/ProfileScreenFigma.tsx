import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ColorValue, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Settings,
  Edit,
  Share2,
  Star,
  Music,
  Headphones,
  TrendingUp,
  Award,
  Package,
  Zap,
  Heart,
  Calendar,
} from 'lucide-react-native';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { ProductCardFigma } from '../components/atoms/ProductCardFigma';
import { colors, spacing, typography, radii } from '@/theme';

interface ProfileScreenFigmaProps {
  onMyPurchases?: () => void;
  onBoost?: () => void;
  onFavorites?: () => void;
  onBookings?: () => void;
}

const userBeats = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'Vous',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 24000,
    type: 'beat' as const,
    bpm: 112,
    genre: 'Afrobeat',
    likes: 892,
    downloads: 456,
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: '2',
    title: 'Lagos Nights',
    artist: 'Vous',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 29000,
    type: 'beat' as const,
    bpm: 128,
    genre: 'Afrobeat',
    likes: 1543,
    downloads: 789,
    rating: 4.9,
    reviewCount: 102,
  },
];

const stats = [
  { icon: TrendingUp, label: 'Vues totales', value: '12.4K', colors: [colors.primary, colors.primaryDark] },
  { icon: Music, label: 'Beats publiés', value: '24', colors: [colors.accent, colors.secondary] },
  { icon: Star, label: 'Note moyenne', value: '4.8', colors: [colors.secondary, colors.accent] },
  { icon: Award, label: 'Ventes', value: '47', colors: [colors.cyan, colors.primaryDark] },
];

export function ProfileScreenFigma({ onMyPurchases, onBoost, onFavorites, onBookings }: ProfileScreenFigmaProps = {}) {
  const [activeTab, setActiveTab] = useState<'beats' | 'services' | 'stats'>('beats');

  // Calculate card width for 2 columns with gap
  const screenWidth = Dimensions.get('window').width;
  const horizontalPadding = spacing.xl * 2; // paddingHorizontal from quickActions
  const gap = spacing.md;
  const cardWidth = (screenWidth - horizontalPadding - gap) / 2;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.9}>
            <View style={styles.headerButtonInner}>
              <Share2 size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.9}>
            <View style={styles.headerButtonInner}>
              <Settings size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=200"
                alt="Profile"
                style={styles.avatar}
              />
              <View style={styles.avatarBadge}>
                <LinearGradient
                  colors={[colors.secondary, colors.accent]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.badgeGradient}
                >
                  <Award size={16} color={colors.textPrimary} />
                </LinearGradient>
              </View>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>DJ Producer Pro</Text>
              <Text style={styles.profileHandle}>@djproducer • Producteur & Beat Maker</Text>
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>892</Text>
                  <Text style={styles.statLabel}>Abonnés</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>234</Text>
                  <Text style={styles.statLabel}>Abonnements</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.profileBio}>Producteur de beats Afrobeat, Amapiano & Trap 🎵{'\n'}📍 Lagos, Nigeria</Text>

          <View style={styles.editButtonContainer}>
            <PrimaryButton style={styles.editButton}>
              <Edit size={20} color={colors.textPrimary} />
              <Text style={styles.editButtonText}>Modifier le profil</Text>
            </PrimaryButton>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={[styles.quickActionCard, { width: cardWidth }]}
              onPress={onMyPurchases}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Package size={20} color={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Mes Achats</Text>
              <Text style={styles.quickActionSubtitle}>Licences & Téléchargements</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { width: cardWidth }]}
              onPress={onFavorites}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.accent, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Heart size={20} color={colors.textPrimary} fill={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Favoris</Text>
              <Text style={styles.quickActionSubtitle}>Beats sauvegardés</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { width: cardWidth }]}
              onPress={onBoost}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.secondary, colors.warning]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Zap size={20} color={colors.textPrimary} fill={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Booster</Text>
              <Text style={styles.quickActionSubtitle}>Augmenter la visibilité</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionCard, { width: cardWidth }]}
              onPress={onBookings}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.cyan, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickActionIcon}
              >
                <Calendar size={20} color={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.quickActionTitle}>Réservations</Text>
              <Text style={styles.quickActionSubtitle}>Services demandés</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <View key={stat.label} style={[styles.statCard, { width: cardWidth }]}>
                  <LinearGradient
                    colors={stat.colors as [ColorValue, ColorValue, ...ColorValue[]]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.statIcon}
                  >
                    <Icon size={20} color={colors.textPrimary} />
                  </LinearGradient>
                  <Text style={styles.statCardValue}>{stat.value}</Text>
                  <Text style={styles.statCardLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsSection}>
          <View style={styles.tabsRow}>
            <TouchableOpacity
              onPress={() => setActiveTab('beats')}
              style={[styles.tab, activeTab === 'beats' && styles.tabActive]}
              activeOpacity={0.9}
            >
              {activeTab === 'beats' ? (
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabGradient}
                >
                  <Text style={styles.tabTextActive}>Beats</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.tabText}>Beats</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('services')}
              style={[styles.tab, activeTab === 'services' && styles.tabActive]}
              activeOpacity={0.9}
            >
              {activeTab === 'services' ? (
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabGradient}
                >
                  <Text style={styles.tabTextActive}>Services</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.tabText}>Services</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('stats')}
              style={[styles.tab, activeTab === 'stats' && styles.tabActive]}
              activeOpacity={0.9}
            >
              {activeTab === 'stats' ? (
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.tabGradient}
                >
                  <Text style={styles.tabTextActive}>Stats</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.tabText}>Stats</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentSection}>
          {activeTab === 'beats' && (
            <FlatList
              data={userBeats}
              numColumns={2}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.beatsGrid}
              columnWrapperStyle={styles.beatsRow}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.beatCard}>
                  <ProductCardFigma {...item} isFavorited={false} onPress={() => {}} onToggleFavorite={() => {}} />
                </View>
              )}
            />
          )}

          {activeTab === 'services' && (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Headphones size={32} color={colors.textMuted} />
              </View>
              <Text style={styles.emptyTitle}>Aucun service</Text>
              <Text style={styles.emptySubtitle}>Vous n'avez pas encore publié de service</Text>
              <PrimaryButton style={styles.emptyButton}>Créer un service</PrimaryButton>
            </View>
          )}

          {activeTab === 'stats' && (
            <View style={styles.statsContent}>
              <View style={styles.statsCard}>
                <Text style={styles.statsCardTitle}>Performances ce mois</Text>
                <View style={styles.statsList}>
                  {[
                    { label: 'Revenus', value: '342 500 F', change: '+12%', positive: true },
                    { label: 'Vues', value: '3.2K', change: '+24%', positive: true },
                    { label: 'Ventes', value: '12', change: '+8', positive: true },
                    { label: 'Taux de conversion', value: '3.7%', change: '-0.3%', positive: false },
                  ].map(item => (
                    <View key={item.label} style={styles.statsItem}>
                      <Text style={styles.statsItemLabel}>{item.label}</Text>
                      <View style={styles.statsItemRight}>
                        <Text style={styles.statsItemValue}>{item.value}</Text>
                        <Text
                          style={[
                            styles.statsItemChange,
                            item.positive ? styles.statsItemChangePositive : styles.statsItemChangeNegative,
                          ]}
                        >
                          {item.change}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </View>
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
    backgroundColor: 'rgba(10, 10, 10, 0.95)', // Semi-transparent background for backdrop blur effect
    paddingTop: spacing.xl + spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  headerButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl * 5,
  },
  profileSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
    marginBottom: spacing.xl + spacing.sm,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: spacing.xl * 4,
    height: spacing.xl * 4,
    borderRadius: radii.xxl,
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -spacing.sm,
    right: -spacing.sm,
    width: spacing.xl * 2,
    height: spacing.xl * 2,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.background,
    overflow: 'hidden',
  },
  badgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  profileHandle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.md,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs - 2,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.inter.regular,
  },
  profileBio: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  editButtonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  editButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  quickActions: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  quickActionCard: {
    padding: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIcon: {
    width: 40, // w-10 (40px) in Figma
    height: 40, // h-10 (40px) in Figma
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  quickActionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  quickActionSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    marginTop: spacing.xs,
  },
  statsSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statIcon: {
    width: 40, // w-10 (40px) in Figma
    height: 40, // h-10 (40px) in Figma
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  statCardValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  statCardLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.inter.regular,
  },
  tabsSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tabActive: {
    borderWidth: 0,
  },
  tabGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    textAlign: 'center',
  },
  tabTextActive: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    textAlign: 'center',
  },
  contentSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl * 2,
  },
  beatsGrid: {
    gap: spacing.lg,
  },
  beatsRow: {
    gap: spacing.lg,
  },
  beatCard: {
    flex: 1,
    maxWidth: '48%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 4,
  },
  emptyIcon: {
    width: spacing.xl * 4,
    height: spacing.xl * 4,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.lg,
  },
  emptyButton: {
    alignSelf: 'center',
  },
  statsContent: {
    gap: spacing.lg,
  },
  statsCard: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsCardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.lg,
  },
  statsList: {
    gap: spacing.md,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItemLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statsItemValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  statsItemChange: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  statsItemChangePositive: {
    color: colors.success,
  },
  statsItemChangeNegative: {
    color: colors.error,
  },
});
