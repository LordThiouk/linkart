import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, FileText, Music2, Package, Filter, Calendar } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';

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
                <ArrowLeft size={20} color="#D4D4D4" />
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
                      colors={['#6366F1', '#8B5CF6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.filterButtonGradient}
                    >
                      <Icon size={16} color="#F5F5F5" />
                      <Text style={styles.filterButtonTextSelected}>{filter.label}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.filterButtonContent}>
                      <Icon size={16} color="#A3A3A3" />
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
                <Package size={40} color="#404040" />
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
                                purchase.license === 'Exclusive' ? ['#EC4899', '#F59E0B'] : ['#6366F1', '#8B5CF6']
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
                        <Calendar size={12} color="#A3A3A3" />
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
                            colors={['#6366F1', '#8B5CF6']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.downloadButtonGradient}
                          >
                            <Download size={16} color="#F5F5F5" />
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
                          <FileText size={16} color="#D4D4D4" />
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  statsSection: {
    padding: 24,
    paddingBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  filtersSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  filterButtonSelected: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButtonText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  filterButtonTextSelected: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  purchasesSection: {
    padding: 24,
    paddingTop: 16,
  },
  purchasesList: {
    gap: 16,
  },
  purchaseCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  purchaseContent: {
    flexDirection: 'row',
    gap: 16,
  },
  purchaseCover: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  purchaseInfo: {
    flex: 1,
    gap: 12,
  },
  purchaseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  purchaseTitleContainer: {
    flex: 1,
    gap: 4,
    marginRight: 8,
  },
  purchaseTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  purchaseArtist: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  licenseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  licenseBadgeExclusive: {
    // Gradient handled by LinearGradient
  },
  licenseBadgePremium: {
    // Gradient handled by LinearGradient
  },
  licenseBadgeBasic: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
  },
  licenseBadgeGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  licenseBadgeText: {
    color: '#F5F5F5',
    fontSize: 12,
    fontWeight: '600',
  },
  licenseBadgeTextBasic: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '600',
  },
  purchaseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  purchaseDate: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  purchaseMetaSeparator: {
    color: '#404040',
    fontSize: 12,
  },
  purchasePrice: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
  },
  purchaseActions: {
    flexDirection: 'row',
    gap: 8,
  },
  downloadButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  downloadButtonText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  contractButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
  },
  contractButtonText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  reviewBanner: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginTop: 8,
  },
  reviewBannerText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
});
