import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Search,
  Bell,
  MessageCircle,
  TrendingUp,
  Flame,
  Music2,
  Package,
  Zap,
  Sparkles,
  ListMusic,
  Play,
  Pause,
} from 'lucide-react-native';
import { Pill } from '../components/atoms/Pill';
import { ProductCardFigma } from '../components/atoms/ProductCardFigma';
import { PlaylistCardFigma } from '../components/molecules/PlaylistCardFigma';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';
const BANNER_WIDTH = 340;

interface HomeScreenFigmaProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  onProductClick?: (productId: string) => void;
  onMessages?: () => void;
}

const featuredProducts = [
  {
    id: '1',
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29000,
    type: 'beat' as const,
    bpm: 140,
    genre: 'Trap',
    likes: 1243,
    downloads: 847,
    rating: 4.8,
    reviewCount: 87,
  },
  {
    id: '2',
    title: 'Summer Dreams',
    artist: 'Melodic Soul',
    artistImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 24000,
    type: 'beat' as const,
    bpm: 128,
    genre: 'Lo-fi',
    likes: 892,
    downloads: 623,
    rating: 4.9,
    reviewCount: 124,
  },
  {
    id: '3',
    title: 'Afro Percussion Kit',
    artist: 'BeatMaker',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 15000,
    type: 'kit' as const,
    genre: 'Afrobeat',
    likes: 654,
    rating: 4.7,
    reviewCount: 56,
  },
  {
    id: '4',
    title: 'Urban Flow',
    artist: 'Beat Architect',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 19000,
    type: 'beat' as const,
    bpm: 95,
    genre: 'Hip-Hop',
    likes: 756,
    downloads: 421,
    rating: 4.6,
    reviewCount: 43,
  },
  {
    id: '5',
    title: 'Vocal Chops Pack',
    artist: 'SampleKing',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 12000,
    type: 'sample' as const,
    genre: 'Pop',
    likes: 432,
    rating: 4.5,
    reviewCount: 29,
  },
  {
    id: '6',
    title: 'Drill Essentials Kit',
    artist: 'DrillPro',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit' as const,
    genre: 'Drill',
    likes: 987,
    downloads: 534,
    rating: 4.9,
    reviewCount: 76,
  },
];

const featuredPlaylists = [
  {
    id: 'p1',
    title: 'Top Beats Afrobeat',
    description: 'Les meilleurs beats afrobeat du moment',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    type: 'beats' as const,
    itemCount: 24,
    totalPlays: 45000,
  },
  {
    id: 'p2',
    title: 'Drum Kits Essentiels',
    description: 'Collection complète de kits pour producteurs',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    type: 'kits' as const,
    itemCount: 15,
    totalPlays: 28000,
  },
  {
    id: 'p3',
    title: 'Samples Trap Premium',
    description: 'Samples trap haute qualité',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    type: 'samples' as const,
    itemCount: 32,
    totalPlays: 38000,
  },
];

const categories = [
  { id: 'all', label: 'Tout', icon: Sparkles },
  { id: 'beats', label: 'Beats', icon: Music2 },
  { id: 'kits', label: 'Kits', icon: Package },
  { id: 'samples', label: 'Samples', icon: Zap },
  { id: 'trending', label: 'Tendances', icon: TrendingUp },
];

export function HomeScreenFigma({ onSearch, onNotifications, onProductClick, onMessages }: HomeScreenFigmaProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const filteredProducts = featuredProducts.filter(product => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'beats') return product.type === 'beat';
    if (selectedCategory === 'kits') return product.type === 'kit';
    if (selectedCategory === 'samples') return product.type === 'sample';
    if (selectedCategory === 'trending') return (product.likes || 0) > 800;
    return true;
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Découvrir</Text>
          <Text style={styles.headerSubtitle}>Trouvez votre prochain hit</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onSearch} style={styles.headerButton} activeOpacity={0.8}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          {onMessages && (
            <TouchableOpacity onPress={onMessages} style={styles.headerButton} activeOpacity={0.8}>
              <MessageCircle size={20} color={colors.textSecondary} />
              <View style={styles.badge} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onNotifications} style={styles.headerButton} activeOpacity={0.8}>
            <Bell size={20} color={colors.textSecondary} />
            <View style={[styles.badge, styles.badgeOrange]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
        {categories.map(category => (
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
  );

  const renderHeroBanners = () => (
    <View style={styles.heroBannersContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.heroBannersScroll}
        pagingEnabled={false}
        snapToInterval={BANNER_WIDTH + 16}
        decelerationRate="fast"
      >
        {/* Featured Deal Banner */}
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
              <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9}>
                <Text style={styles.bannerButtonText}>Explorer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerGlow1} />
            <View style={styles.bannerGlow2} />
          </LinearGradient>
        </View>

        {/* New Arrivals Banner */}
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
              <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9}>
                <Text style={[styles.bannerButtonText, { color: colors.cyan }]}>Découvrir</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerGlow1} />
          </LinearGradient>
        </View>

        {/* Boost Banner */}
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
              <TouchableOpacity style={styles.bannerButton} activeOpacity={0.9}>
                <Text style={[styles.bannerButtonText, { color: colors.accent }]}>Essayer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerGlow1} />
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );

  const renderPlaylists = () => (
    <View style={styles.playlistsSection}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderLeft}>
          <LinearGradient
            colors={[colors.cyan, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionIcon}
          >
            <ListMusic size={20} color={colors.textPrimary} />
          </LinearGradient>
          <Text style={styles.sectionTitle}>Playlists sélectionnées</Text>
        </View>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.sectionLink}>Voir tout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.playlistsScroll}>
        {featuredPlaylists.map((playlist, index) => (
          <View key={playlist.id} style={styles.playlistCard}>
            <PlaylistCardFigma
              {...playlist}
              onPress={() => {
                // Navigate to playlist
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderFeaturedProducts = () => (
    <View style={styles.featuredSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>À la une</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.sectionLink}>Voir tout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
        {featuredProducts.slice(0, 3).map((product, index) => (
          <View key={product.id} style={styles.featuredCard}>
            <ProductCardFigma
              {...product}
              isPlaying={playingProduct === product.id}
              isFavorited={likedProducts.has(product.id)}
              onPlay={() => setPlayingProduct(playingProduct === product.id ? null : product.id)}
              onPress={() => onProductClick?.(product.id)}
              onToggleFavorite={() => handleLike(product.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  const renderTrendingProducts = () => (
    <View style={styles.trendingSection}>
      <View style={styles.sectionHeaderLeft}>
        <LinearGradient
          colors={[colors.secondary, colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.sectionIcon}
        >
          <TrendingUp size={20} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.sectionTitle}>Tendances du moment</Text>
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.trendingGrid}
        columnWrapperStyle={styles.trendingRow}
        renderItem={({ item }) => (
          <View style={styles.trendingCard}>
            <ProductCardFigma
              {...item}
              isPlaying={playingProduct === item.id}
              isFavorited={likedProducts.has(item.id)}
              onPlay={
                item.type === 'beat' ? () => setPlayingProduct(playingProduct === item.id ? null : item.id) : undefined
              }
              onPress={() => onProductClick?.(item.id)}
              onToggleFavorite={() => handleLike(item.id)}
            />
          </View>
        )}
      />
    </View>
  );

  const renderRecentUploads = () => (
    <View style={styles.recentSection}>
      <View style={styles.sectionHeaderLeft}>
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

      <View style={styles.recentList}>
        {featuredProducts.slice(0, 3).map((product, index) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => onProductClick?.(product.id)}
            style={styles.recentItem}
            activeOpacity={0.9}
          >
            <ImageWithFallback src={product.coverImage} alt={product.title} style={styles.recentImage} />
            <View style={styles.recentContent}>
              <View style={styles.recentTitleRow}>
                <Text style={styles.recentTitle} numberOfLines={1}>
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
              <Text style={styles.recentArtist} numberOfLines={1}>
                {product.artist}
              </Text>
              <View style={styles.recentMeta}>
                {product.bpm && (
                  <>
                    <Text style={styles.recentBPM}>{product.bpm} BPM</Text>
                    <Text style={styles.recentSeparator}>•</Text>
                  </>
                )}
                <Text style={styles.recentPrice}>{product.price} F</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={e => {
                e.stopPropagation();
                if (product.type === 'beat') {
                  setPlayingProduct(playingProduct === product.id ? null : product.id);
                }
              }}
              style={styles.recentPlayButton}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.recentPlayGradient}
              >
                {playingProduct === product.id && product.type === 'beat' ? (
                  <Pause size={20} color={colors.textPrimary} fill={colors.textPrimary} />
                ) : (
                  <Play size={20} color={colors.textPrimary} fill={colors.textPrimary} />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderCategories()}
        {renderHeroBanners()}
        {renderPlaylists()}
        {renderFeaturedProducts()}
        {renderTrendingProducts()}
        {renderRecentUploads()}
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
    paddingBottom: spacing.xxl + spacing.xl, // pb-20 for bottom navigation (80px)
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
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radii.sm / 2,
    backgroundColor: colors.cyan,
  },
  badgeOrange: {
    backgroundColor: colors.accent,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  categoriesScroll: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  heroBannersContainer: {
    paddingVertical: spacing.md,
  },
  heroBannersScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  banner: {
    width: BANNER_WIDTH,
    height: 192, // h-48 (specific height, not a spacing token)
    borderRadius: radii.xxl,
    overflow: 'hidden',
  },
  bannerGradient: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  banner1: {
    // Gradient already defined in bannerGradient
  },
  banner2: {
    // Gradient already defined in bannerGradient
  },
  banner3: {
    // Gradient already defined in bannerGradient
  },
  bannerContent: {
    flex: 1,
  },
  bannerBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: 'rgba(245, 245, 245, 0.2)', // colors.textPrimary with opacity
    marginBottom: spacing.md,
  },
  bannerBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2, // 20px (between titleMd and headingLg)
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
  },
  bannerSubtitle: {
    color: 'rgba(245, 245, 245, 0.8)', // colors.textPrimary with opacity
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  bannerButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.textPrimary,
  },
  bannerButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  bannerGlow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128, // w-32 (specific size)
    height: 128, // h-32
    borderRadius: radii.full, // 64 = width/2 (circle)
    backgroundColor: 'rgba(245, 245, 245, 0.1)', // colors.textPrimary with opacity
    opacity: 0.3,
  },
  bannerGlow2: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 96, // w-24 (specific size)
    height: 96, // h-24
    borderRadius: radii.full, // 48 = width/2 (circle)
    backgroundColor: 'rgba(236, 72, 153, 0.2)', // colors.accent with opacity
    opacity: 0.3,
  },
  playlistsSection: {
    paddingVertical: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  sectionLink: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  playlistsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  playlistCard: {
    width: 320, // w-80 (specific width)
  },
  featuredSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  featuredScroll: {
    gap: spacing.md,
  },
  featuredCard: {
    width: 288, // w-72 (specific width)
  },
  trendingSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  trendingGrid: {
    gap: spacing.md,
  },
  trendingRow: {
    gap: spacing.md,
  },
  trendingCard: {
    flex: 1,
    maxWidth: '48%',
  },
  recentSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  recentList: {
    gap: spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  recentImage: {
    width: 64, // w-16 (specific size)
    height: 64, // h-16
    borderRadius: radii.sm,
  },
  recentContent: {
    flex: 1,
    minWidth: 0,
  },
  recentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  recentTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.medium,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.sm / 2,
  },
  typeBadgeBeat: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)', // colors.primary with opacity
  },
  typeBadgeKit: {
    backgroundColor: 'rgba(236, 72, 153, 0.2)', // colors.accent with opacity
  },
  typeBadgeSample: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)', // colors.cyan with opacity
  },
  typeBadgeText: {
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  typeBadgeTextBeat: {
    color: colors.primary,
  },
  typeBadgeTextKit: {
    color: colors.accent,
  },
  typeBadgeTextSample: {
    color: colors.cyan,
  },
  recentArtist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  recentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  recentBPM: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  recentSeparator: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
  },
  recentPrice: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  recentPlayButton: {
    width: 40, // specific size
    height: 40,
    borderRadius: radii.full, // 20 = width/2 (circle)
    alignSelf: 'center',
  },
  recentPlayGradient: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full, // 20 = width/2 (circle)
    alignItems: 'center',
    justifyContent: 'center',
  },
});
