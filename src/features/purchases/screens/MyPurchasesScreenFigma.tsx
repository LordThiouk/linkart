import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  PurchaseHeader,
  PurchaseFilters,
  PurchaseStats,
  PurchaseEmptyState,
  PurchaseCard,
  type PurchaseFilterType,
  type LicenseType,
} from '@/features/purchases/components';
import { colors, spacing } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface MyPurchasesScreenFigmaProps {
  onBack?: () => void;
  onDownload?: (purchaseId: string) => void;
  onViewContract?: (purchaseId: string) => void;
}

const purchasesData: {
  id: string;
  type: 'beat' | 'kit' | 'sample';
  title: string;
  artist: string;
  coverImage: string;
  license: LicenseType;
  purchaseDate: string;
  price: number;
  downloaded: boolean;
  hasReview: boolean;
  contractUrl: string;
}[] = [
  {
    id: 'p1',
    type: 'beat' as const,
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    license: 'Premium' as LicenseType,
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
    license: 'Basic' as LicenseType,
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
    license: 'Exclusive' as LicenseType,
    purchaseDate: '2024-10-15',
    price: 299000,
    downloaded: true,
    hasReview: true,
    contractUrl: '/contracts/p3.pdf',
  },
];

export function MyPurchasesScreenFigma({ onBack, onDownload, onViewContract }: MyPurchasesScreenFigmaProps) {
  const [selectedFilter, setSelectedFilter] = useState<PurchaseFilterType>('all');

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

  return (
    <SafeAreaView style={styles.container}>
      <PurchaseHeader
        subtitle={`${purchasesData.length} produit${purchasesData.length > 1 ? 's' : ''} acheté${purchasesData.length > 1 ? 's' : ''}`}
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Stats */}
        <AnimatedView entering={FadeIn} style={styles.statsSection}>
          <PurchaseStats stats={stats} />
        </AnimatedView>

        {/* Filters */}
        <AnimatedView entering={FadeIn.delay(200)} style={styles.filtersSection}>
          <PurchaseFilters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </AnimatedView>

        {/* Purchases List */}
        <AnimatedView entering={FadeIn.delay(300)} style={styles.purchasesSection}>
          {filteredPurchases.length === 0 ? (
            <PurchaseEmptyState />
          ) : (
            <View style={styles.purchasesList}>
              {filteredPurchases.map((purchase, index) => (
                <PurchaseCard
                  key={purchase.id}
                  id={purchase.id}
                  type={purchase.type}
                  title={purchase.title}
                  artist={purchase.artist}
                  coverImage={purchase.coverImage}
                  license={purchase.license}
                  purchaseDate={purchase.purchaseDate}
                  price={purchase.price}
                  downloaded={purchase.downloaded}
                  hasReview={purchase.hasReview}
                  contractUrl={purchase.contractUrl}
                  onDownload={onDownload}
                  onViewContract={onViewContract}
                  delay={index * 100}
                />
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
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl, // 80px
  },
  statsSection: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  filtersSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  purchasesSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  purchasesList: {
    gap: spacing.md,
  },
});
