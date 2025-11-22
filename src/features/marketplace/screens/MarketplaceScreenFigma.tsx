import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Music, Radio, Package, Zap, Mic, Headphones } from 'lucide-react-native';
import {
  MarketplaceHeader,
  MarketplaceTabSelector,
  MarketplaceCategoryPills,
  MarketplaceStatsBar,
  MarketplaceProductsGrid,
  MarketplaceServicesBanner,
  MarketplaceServicesSection,
  MarketplaceCategoriesGrid,
  MarketplaceFiltersPanel,
  type MarketplaceProduct,
  type MarketplaceService,
  type MarketplaceCategoryItem,
} from '@/features/marketplace/components';
import { colors, spacing } from '@/theme';

interface MarketplaceScreenFigmaProps {
  onProductClick?: (productId: string) => void;
  onServiceClick?: (serviceId: string) => void;
  onSearch?: () => void;
}

const allProducts: MarketplaceProduct[] = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'KofiBeats',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 24000,
    type: 'beat',
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
    artist: 'NaijaVibes',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 29000,
    type: 'beat',
    bpm: 128,
    genre: 'Afrobeat',
    likes: 1543,
    downloads: 789,
    rating: 4.9,
    reviewCount: 102,
  },
  {
    id: '3',
    title: 'Amapiano Drum Kit',
    artist: 'SouthBeats',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit',
    genre: 'Amapiano',
    likes: 2104,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: '4',
    title: 'Trap 808 Pack',
    artist: 'AfroTrap Pro',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 15000,
    type: 'sample',
    genre: 'Trap',
    likes: 654,
    rating: 4.6,
    reviewCount: 45,
  },
  {
    id: '5',
    title: 'Drill Essential Kit',
    artist: 'DrillKing',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 22000,
    type: 'kit',
    genre: 'Drill',
    likes: 987,
    rating: 4.9,
    reviewCount: 76,
  },
  {
    id: '6',
    title: 'Vocal Chops Sample',
    artist: 'VocalPro',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 12000,
    type: 'sample',
    genre: 'Pop',
    likes: 432,
    rating: 4.5,
    reviewCount: 34,
  },
];

const featuredServices: MarketplaceService[] = [
  {
    id: '1',
    title: 'Professional Mixing & Mastering',
    provider: 'Audio Engineer Pro',
    providerImage: 'https://images.unsplash.com/photo-1729709606104-32dbcf34c189?w=100',
    coverImage: 'https://images.unsplash.com/photo-1648780693381-12daeb6fe374?w=400',
    price: 49000,
    rating: 4.9,
    reviewCount: 127,
    deliveryTime: '3 jours',
    category: 'Mixing',
    isPro: true,
  },
  {
    id: '2',
    title: 'Vocal Recording & Production',
    provider: 'Studio Master',
    providerImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    price: 39000,
    rating: 4.8,
    reviewCount: 89,
    deliveryTime: '2 jours',
    category: 'Recording',
    isPro: true,
  },
];

const productCategories = [
  { id: 'all', label: 'Tout', icon: Music },
  { id: 'beats', label: 'Beats', icon: Radio },
  { id: 'kits', label: 'Kits', icon: Package },
  { id: 'samples', label: 'Samples', icon: Zap },
];

const serviceCategoryItems: MarketplaceCategoryItem[] = [
  { id: 'recording', label: 'Recording', icon: Mic, colors: [colors.accent, colors.secondary] },
  { id: 'mixing', label: 'Mixing', icon: Headphones, colors: [colors.cyan, colors.primary] },
  { id: 'mastering', label: 'Mastering', icon: Radio, colors: [colors.primaryDark, colors.accent] },
  { id: 'production', label: 'Production', icon: Music, colors: [colors.secondary, colors.cyan] },
];

const genreFilters = ['Tout', 'Afrobeat', 'Amapiano', 'Trap', 'Drill', 'Hip-Hop', 'R&B', 'Lo-fi'];
const locationFilters = ['Toutes', 'Dakar', 'Abidjan', 'Lagos', 'Accra', 'Douala', 'Bamako', 'Lomé', 'Cotonou'];
const serviceCategoryFilters = [
  'Tous',
  'Mixing',
  'Mastering',
  'Recording',
  'Production',
  'Vocal Tuning',
  'Beat Making',
];

export function MarketplaceScreenFigma({ onProductClick, onServiceClick, onSearch }: MarketplaceScreenFigmaProps) {
  const [selectedTab, setSelectedTab] = useState<'products' | 'services'>('products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('Tout');
  const [selectedLocation, setSelectedLocation] = useState('Toutes');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('Tous');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [playingProduct, setPlayingProduct] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const handleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      if (selectedCategory !== 'all' && product.type !== selectedCategory.slice(0, -1)) return false;
      if (selectedGenre !== 'Tout' && product.genre !== selectedGenre) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (product.rating && product.rating < minRating) return false;
      return true;
    });
  }, [selectedCategory, selectedGenre, priceRange, minRating]);

  const handleResetFilters = () => {
    setSelectedGenre('Tout');
    setSelectedServiceCategory('Tous');
    setSelectedLocation('Toutes');
    setPriceRange([0, 50000]);
    setMinRating(0);
  };

  const handleTogglePlay = (productId: string) => {
    setPlayingProduct(current => (current === productId ? null : productId));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <MarketplaceHeader
        subtitle={selectedTab === 'products' ? 'Beats, kits & samples' : 'Services professionnels'}
        showFilters={showFilters}
        onSearch={onSearch}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />
      <MarketplaceTabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />

      {showFilters && (
        <MarketplaceFiltersPanel
          selectedTab={selectedTab}
          genreFilters={genreFilters}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
          serviceCategories={serviceCategoryFilters}
          selectedServiceCategory={selectedServiceCategory}
          onServiceCategorySelect={setSelectedServiceCategory}
          locationFilters={locationFilters}
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          onReset={handleResetFilters}
        />
      )}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedTab === 'products' ? (
          <>
            <MarketplaceCategoryPills
              categories={productCategories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <MarketplaceStatsBar count={filteredProducts.length} label="produit" onSort={() => {}} />
            <MarketplaceProductsGrid
              products={filteredProducts}
              playingProductId={playingProduct}
              likedProductIds={likedProducts}
              onProductPress={onProductClick}
              onTogglePlay={handleTogglePlay}
              onToggleFavorite={handleLike}
              emptyTitle="Aucun produit trouvé"
              emptySubtitle="Essayez de modifier vos filtres"
            />
          </>
        ) : (
          <>
            <MarketplaceServicesBanner />
            <MarketplaceServicesSection services={featuredServices} onServicePress={onServiceClick} />
            <MarketplaceCategoriesGrid
              categories={serviceCategoryItems}
              onCategoryPress={id => console.log('Category:', id)}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl,
  },
});
