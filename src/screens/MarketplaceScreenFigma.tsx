import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ColorValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  SlidersHorizontal,
  Music,
  Headphones,
  Mic,
  Radio,
  Package,
  Zap,
  TrendingUp,
} from 'lucide-react-native';
import { Pill } from '../components/atoms/Pill';
import { ProductCardFigma } from '../components/atoms/ProductCardFigma';
import { ServiceCardFigma } from '../components/molecules/ServiceCardFigma';
import { colors, spacing, typography, radii } from '@/theme';

interface MarketplaceScreenFigmaProps {
  onProductClick?: (productId: string) => void;
  onServiceClick?: (serviceId: string) => void;
  onSearch?: () => void;
}

const allProducts = [
  {
    id: '1',
    title: 'Afrobeat Summer',
    artist: 'KofiBeats',
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
    artist: 'NaijaVibes',
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
  {
    id: '3',
    title: 'Amapiano Drum Kit',
    artist: 'SouthBeats',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit' as const,
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
    type: 'sample' as const,
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
    type: 'kit' as const,
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
    type: 'sample' as const,
    genre: 'Pop',
    likes: 432,
    rating: 4.5,
    reviewCount: 34,
  },
];

const featuredServices = [
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

const genreFilters = ['Tout', 'Afrobeat', 'Amapiano', 'Trap', 'Drill', 'Hip-Hop', 'R&B', 'Lo-fi'];
const locationFilters = ['Toutes', 'Dakar', 'Abidjan', 'Lagos', 'Accra', 'Douala', 'Bamako', 'Lomé', 'Cotonou'];
const serviceCategories = ['Tous', 'Mixing', 'Mastering', 'Recording', 'Production', 'Vocal Tuning', 'Beat Making'];

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

  const filteredProducts = allProducts.filter(product => {
    if (selectedCategory !== 'all' && product.type !== selectedCategory.slice(0, -1)) return false;
    if (selectedGenre !== 'Tout' && product.genre !== selectedGenre) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (product.rating && product.rating < minRating) return false;
    return true;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <Text style={styles.headerSubtitle}>
            {selectedTab === 'products' ? 'Beats, kits & samples' : 'Services professionnels'}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onSearch} style={styles.headerButton} activeOpacity={0.8}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={[styles.headerButton, showFilters && styles.headerButtonActive]}
            activeOpacity={0.8}
          >
            {showFilters ? (
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.filterButtonGradient}
              >
                <SlidersHorizontal size={20} color={colors.textPrimary} />
              </LinearGradient>
            ) : (
              <SlidersHorizontal size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabSelector}>
        <TouchableOpacity
          onPress={() => setSelectedTab('products')}
          style={[styles.tab, selectedTab === 'products' && styles.tabActive]}
          activeOpacity={0.9}
        >
          {selectedTab === 'products' ? (
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tabGradient}
            >
              <Text style={styles.tabTextActive}>Produits</Text>
            </LinearGradient>
          ) : (
            <Text style={styles.tabText}>Produits</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSelectedTab('services')}
          style={[styles.tab, selectedTab === 'services' && styles.tabActive]}
          activeOpacity={0.9}
        >
          {selectedTab === 'services' ? (
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
      </View>
    </View>
  );

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <View style={styles.filtersPanel}>
        <ScrollView style={styles.filtersScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.filtersContent}>
            {/* Products Filters */}
            {selectedTab === 'products' && (
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Genre</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterChips}
                >
                  {genreFilters.map(genre => (
                    <TouchableOpacity
                      key={genre}
                      onPress={() => setSelectedGenre(genre)}
                      style={[styles.filterChip, selectedGenre === genre && styles.filterChipActive]}
                      activeOpacity={0.8}
                    >
                      {selectedGenre === genre ? (
                        <LinearGradient
                          colors={[colors.primary, colors.primaryDark]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.filterChipGradient}
                        >
                          <Text style={styles.filterChipTextActive}>{genre}</Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.filterChipText}>{genre}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Services Filters */}
            {selectedTab === 'services' && (
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Catégorie de service</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.filterChips}
                >
                  {serviceCategories.map(category => (
                    <TouchableOpacity
                      key={category}
                      onPress={() => setSelectedServiceCategory(category)}
                      style={[styles.filterChip, selectedServiceCategory === category && styles.filterChipActive]}
                      activeOpacity={0.8}
                    >
                      {selectedServiceCategory === category ? (
                        <LinearGradient
                          colors={[colors.primary, colors.primaryDark]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.filterChipGradient}
                        >
                          <Text style={styles.filterChipTextActive}>{category}</Text>
                        </LinearGradient>
                      ) : (
                        <Text style={styles.filterChipText}>{category}</Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Location Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>📍 Localité</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterChips}>
                {locationFilters.map(location => (
                  <TouchableOpacity
                    key={location}
                    onPress={() => setSelectedLocation(location)}
                    style={[styles.filterChip, selectedLocation === location && styles.filterChipActive]}
                    activeOpacity={0.8}
                  >
                    {selectedLocation === location ? (
                      <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.filterChipGradient}
                      >
                        <Text style={styles.filterChipTextActive}>{location}</Text>
                      </LinearGradient>
                    ) : (
                      <Text style={styles.filterChipText}>{location}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>
                Prix: {priceRange[0]} F - {priceRange[1]} F
              </Text>
              {/* Note: React Native Slider would be needed here for range selection */}
              <View style={styles.priceRangeContainer}>
                <Text style={styles.priceRangeText}>Min: {priceRange[0]} F</Text>
                <Text style={styles.priceRangeText}>Max: {priceRange[1]} F</Text>
              </View>
            </View>

            {/* Rating Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Note minimum</Text>
              <View style={styles.ratingFilterContainer}>
                {[0, 3, 4, 4.5].map(rating => (
                  <TouchableOpacity
                    key={rating}
                    onPress={() => setMinRating(rating)}
                    style={[styles.ratingFilterChip, minRating === rating && styles.ratingFilterChipActive]}
                    activeOpacity={0.8}
                  >
                    {minRating === rating ? (
                      <LinearGradient
                        colors={[colors.primary, colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.ratingFilterGradient}
                      >
                        <Text style={styles.ratingFilterTextActive}>{rating === 0 ? 'Toutes' : `${rating}+ ⭐`}</Text>
                      </LinearGradient>
                    ) : (
                      <Text style={styles.ratingFilterText}>{rating === 0 ? 'Toutes' : `${rating}+ ⭐`}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={() => {
                setSelectedGenre('Tout');
                setSelectedServiceCategory('Tous');
                setSelectedLocation('Toutes');
                setPriceRange([0, 50000]);
                setMinRating(0);
              }}
              style={styles.resetButton}
              activeOpacity={0.8}
            >
              <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderProducts = () => (
    <>
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {productCategories.map(category => (
            <Pill
              key={category.id}
              label={category.label}
              icon={category.icon}
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(category.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <Text style={styles.statsText}>
          {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé
          {filteredProducts.length > 1 ? 's' : ''}
        </Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.sortLink}>Trier par popularité</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <View style={styles.productsContainer}>
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            numColumns={2}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.productsGrid}
            columnWrapperStyle={styles.productsRow}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <ProductCardFigma
                  {...item}
                  isPlaying={playingProduct === item.id}
                  isFavorited={likedProducts.has(item.id)}
                  onPlay={
                    item.type === 'beat'
                      ? () => setPlayingProduct(playingProduct === item.id ? null : item.id)
                      : undefined
                  }
                  onPress={() => onProductClick?.(item.id)}
                  onToggleFavorite={() => handleLike(item.id)}
                />
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Search size={32} color={colors.border} />
            </View>
            <Text style={styles.emptyTitle}>Aucun produit trouvé</Text>
            <Text style={styles.emptySubtitle}>Essayez de modifier vos filtres</Text>
          </View>
        )}
      </View>
    </>
  );

  const renderServices = () => (
    <>
      {/* Featured Services Banner */}
      <View style={styles.servicesBanner}>
        <LinearGradient
          colors={[colors.cyan, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.servicesBannerGradient}
        >
          <View style={styles.servicesBannerContent}>
            <View style={styles.servicesBannerBadge}>
              <Text style={styles.servicesBannerBadgeText}>✨ Vérifié</Text>
            </View>
            <Text style={styles.servicesBannerTitle}>Services Professionnels</Text>
            <Text style={styles.servicesBannerSubtitle}>Engagez des experts certifiés</Text>
          </View>
          <View style={styles.servicesBannerGlow1} />
          <View style={styles.servicesBannerGlow2} />
        </LinearGradient>
      </View>

      {/* Top Rated Services */}
      <View style={styles.servicesSection}>
        <View style={styles.sectionHeaderLeft}>
          <LinearGradient
            colors={[colors.secondary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionIcon}
          >
            <TrendingUp size={20} color={colors.textPrimary} />
          </LinearGradient>
          <Text style={styles.sectionTitle}>Services populaires</Text>
        </View>
        <View style={styles.servicesList}>
          {featuredServices.map((service, index) => (
            <View key={service.id} style={styles.serviceCard}>
              <ServiceCardFigma {...service} onPress={() => onServiceClick?.(service.id)} />
            </View>
          ))}
        </View>
      </View>

      {/* Categories Grid */}
      <View style={styles.categoriesGridSection}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <View style={styles.categoriesGrid}>
          {[
            { icon: Mic, label: 'Recording', colors: [colors.accent, colors.secondary] },
            { icon: Headphones, label: 'Mixing', colors: [colors.cyan, colors.primary] },
            { icon: Radio, label: 'Mastering', colors: [colors.primaryDark, colors.accent] },
            { icon: Music, label: 'Production', colors: [colors.secondary, colors.cyan] },
          ].map((cat, index) => {
            const Icon = cat.icon;
            return (
              <TouchableOpacity key={cat.label} style={styles.categoryCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={cat.colors as [ColorValue, ColorValue, ...ColorValue[]]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryIcon}
                >
                  <Icon size={24} color={colors.textPrimary} />
                </LinearGradient>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      {renderFilters()}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {selectedTab === 'products' ? renderProducts() : renderServices()}
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
    backgroundColor: 'rgba(10, 10, 10, 0.95)', // colors.background with opacity
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonActive: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  filterButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  tabSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
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
  filtersPanel: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
    maxHeight: 400,
  },
  filtersScroll: {
    flex: 1,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  filterSection: {
    marginBottom: spacing.md,
  },
  filterLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  filterChips: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2, // 6px (between xs and sm)
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  filterChipActive: {
    borderWidth: 0,
  },
  filterChipGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2, // 6px
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filterChipTextActive: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  priceRangeText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  ratingFilterContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  ratingFilterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2, // 6px (between xs and sm)
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  ratingFilterChipActive: {
    borderWidth: 0,
  },
  ratingFilterGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2, // 6px
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingFilterText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  ratingFilterTextActive: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  resetButton: {
    width: '100%',
    paddingVertical: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  resetButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl, // pb-20 (80px)
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  categoriesScroll: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  statsText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  sortLink: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  productsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  productsGrid: {
    gap: spacing.md,
  },
  productsRow: {
    gap: spacing.md,
  },
  productCard: {
    flex: 1,
    maxWidth: '48%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    width: 64, // w-16 (specific size)
    height: 64, // h-16
    borderRadius: radii.full, // 32 = width/2 (circle)
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
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
  },
  servicesBanner: {
    height: 160, // h-40 (specific height)
    borderRadius: radii.xxl,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    position: 'relative',
  },
  servicesBannerGradient: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  servicesBannerContent: {
    flex: 1,
  },
  servicesBannerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: 'rgba(245, 245, 245, 0.2)', // colors.textPrimary with opacity
    marginBottom: spacing.md,
  },
  servicesBannerBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  servicesBannerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2, // 20px
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
  },
  servicesBannerSubtitle: {
    color: 'rgba(245, 245, 245, 0.8)', // colors.textPrimary with opacity
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  servicesBannerGlow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128, // w-32 (specific size)
    height: 128, // h-32
    borderRadius: radii.full, // 64 = width/2 (circle)
    backgroundColor: 'rgba(245, 245, 245, 0.1)', // colors.textPrimary with opacity
    opacity: 0.3,
  },
  servicesBannerGlow2: {
    position: 'absolute',
    bottom: 0,
    left: '33%',
    width: 96, // w-24 (specific size)
    height: 96, // h-24
    borderRadius: radii.full, // 48 = width/2 (circle)
    backgroundColor: 'rgba(139, 92, 246, 0.2)', // colors.primaryDark with opacity
    opacity: 0.3,
  },
  servicesSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionIcon: {
    padding: spacing.sm,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  servicesList: {
    gap: spacing.md,
  },
  serviceCard: {
    marginBottom: spacing.md,
  },
  categoriesGridSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  categoryCard: {
    width: '48%',
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 48, // w-12 (specific size)
    height: 48, // h-12
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  categoryLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
