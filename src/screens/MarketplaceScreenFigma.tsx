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
            <Search size={20} color="#D4D4D4" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={[styles.headerButton, showFilters && styles.headerButtonActive]}
            activeOpacity={0.8}
          >
            {showFilters ? (
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.filterButtonGradient}
              >
                <SlidersHorizontal size={20} color="#F5F5F5" />
              </LinearGradient>
            ) : (
              <SlidersHorizontal size={20} color="#D4D4D4" />
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
              colors={['#6366F1', '#8B5CF6']}
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
              colors={['#6366F1', '#8B5CF6']}
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
                          colors={['#6366F1', '#8B5CF6']}
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
                          colors={['#6366F1', '#8B5CF6']}
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
                        colors={['#6366F1', '#8B5CF6']}
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
                        colors={['#6366F1', '#8B5CF6']}
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
              <Search size={32} color="#404040" />
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
          colors={['#06B6D4', '#8B5CF6']}
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
            colors={['#F59E0B', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionIcon}
          >
            <TrendingUp size={20} color="#F5F5F5" />
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
            { icon: Mic, label: 'Recording', colors: ['#EC4899', '#F59E0B'] },
            { icon: Headphones, label: 'Mixing', colors: ['#06B6D4', '#6366F1'] },
            { icon: Radio, label: 'Mastering', colors: ['#8B5CF6', '#EC4899'] },
            { icon: Music, label: 'Production', colors: ['#F59E0B', '#06B6D4'] },
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
                  <Icon size={24} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48, // pt-12
    paddingBottom: 16, // pb-4
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24, // px-6
    marginBottom: 24, // mb-6
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
  headerButton: {
    padding: 12, // p-3
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
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
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  tabSelector: {
    flexDirection: 'row',
    gap: 8, // gap-2
    paddingHorizontal: 24, // px-6
    marginBottom: 16, // mb-4
  },
  tab: {
    flex: 1,
    paddingVertical: 12, // py-3
    paddingHorizontal: 16, // px-4
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tabText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  filtersPanel: {
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    maxHeight: 400,
  },
  filtersScroll: {
    flex: 1,
  },
  filtersContent: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    gap: 16, // space-y-4
  },
  filterSection: {
    marginBottom: 16,
  },
  filterLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 8,
  },
  filterChips: {
    gap: 8, // gap-2
    paddingBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-1.5
    borderRadius: 8, // rounded-lg
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChipText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  filterChipTextActive: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  priceRangeText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  ratingFilterContainer: {
    flexDirection: 'row',
    gap: 8, // gap-2
    flexWrap: 'wrap',
  },
  ratingFilterChip: {
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-1.5
    borderRadius: 8, // rounded-lg
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingFilterText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  ratingFilterTextActive: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  resetButton: {
    width: '100%',
    paddingVertical: 8, // py-2
    borderRadius: 8, // rounded-lg
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  resetButtonText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // pb-20
  },
  categoriesContainer: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  categoriesScroll: {
    gap: 8, // gap-2
    paddingBottom: 8,
  },
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24, // px-6
    paddingVertical: 8, // py-2
  },
  statsText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  sortLink: {
    color: '#6366F1',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  productsContainer: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    paddingBottom: 32, // pb-8
  },
  productsGrid: {
    gap: 16, // gap-4
  },
  productsRow: {
    gap: 16, // gap-4
  },
  productCard: {
    flex: 1,
    maxWidth: '48%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48, // py-12
  },
  emptyIcon: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16, // mb-4
  },
  emptyTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  servicesBanner: {
    height: 160, // h-40
    borderRadius: 24, // rounded-2xl
    overflow: 'hidden',
    marginHorizontal: 24, // px-6
    marginVertical: 16, // py-4
    position: 'relative',
  },
  servicesBannerGradient: {
    flex: 1,
    padding: 24, // p-6
    justifyContent: 'space-between',
  },
  servicesBannerContent: {
    flex: 1,
  },
  servicesBannerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12, // px-3
    paddingVertical: 4, // py-1
    borderRadius: 999,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    marginBottom: 12, // mb-3
  },
  servicesBannerBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  servicesBannerTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
  },
  servicesBannerSubtitle: {
    color: 'rgba(245, 245, 245, 0.8)',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  servicesBannerGlow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128, // w-32
    height: 128, // h-32
    borderRadius: 64,
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    opacity: 0.3,
  },
  servicesBannerGlow2: {
    position: 'absolute',
    bottom: 0,
    left: '33%',
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 48,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    opacity: 0.3,
  },
  servicesSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    marginBottom: 16, // mb-4
  },
  sectionIcon: {
    padding: 8, // p-2
    borderRadius: 8, // rounded-lg
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  servicesList: {
    gap: 16, // space-y-4
  },
  serviceCard: {
    marginBottom: 16,
  },
  categoriesGridSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    paddingBottom: 32, // pb-8
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12, // gap-3
    marginTop: 16, // mb-4
  },
  categoryCard: {
    width: '48%',
    padding: 24, // p-6
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 12, // rounded-xl
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12, // mb-3
  },
  categoryLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
});
