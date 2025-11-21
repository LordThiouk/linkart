import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet } from 'react-native';
import {
  HomeHeader,
  HomeCategories,
  HomeHeroCarousel,
  HomePlaylistsSection,
  HomeFeaturedSection,
  HomeTrendingSection,
  HomeRecentUploadsSection,
} from '@/features/home/components';
import type { HomeCategory, HomePlaylist, HomeProduct } from '@/features/home/types';
import { Sparkles, Music2, Package, Zap, TrendingUp } from 'lucide-react-native';
import { colors, spacing } from '@/theme';

interface HomeScreenFigmaProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  onMessages?: () => void;
  onProductClick?: (productId: string) => void;
  onPlaylistPress?: (playlistId: string) => void;
}

const featuredProducts: HomeProduct[] = [
  {
    id: '1',
    title: 'Midnight Vibes',
    artist: 'DJ Shadow',
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29000,
    type: 'beat',
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
    type: 'beat',
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
    type: 'kit',
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
    type: 'beat',
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
    type: 'sample',
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
    type: 'kit',
    genre: 'Drill',
    likes: 987,
    downloads: 534,
    rating: 4.9,
    reviewCount: 76,
  },
];

const featuredPlaylists: HomePlaylist[] = [
  {
    id: 'p1',
    title: 'Top Beats Afrobeat',
    description: 'Les meilleurs beats afrobeat du moment',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    type: 'beats',
    itemCount: 24,
    totalPlays: 45000,
  },
  {
    id: 'p2',
    title: 'Drum Kits Essentiels',
    description: 'Collection complète de kits pour producteurs',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    type: 'kits',
    itemCount: 15,
    totalPlays: 28000,
  },
  {
    id: 'p3',
    title: 'Samples Trap Premium',
    description: 'Samples trap haute qualité',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    type: 'samples',
    itemCount: 32,
    totalPlays: 38000,
  },
];

const categories: HomeCategory[] = [
  { id: 'all', label: 'Tout', icon: Sparkles },
  { id: 'beats', label: 'Beats', icon: Music2 },
  { id: 'kits', label: 'Kits', icon: Package },
  { id: 'samples', label: 'Samples', icon: Zap },
  { id: 'trending', label: 'Tendances', icon: TrendingUp },
];

export function HomeScreenFigma({
  onSearch,
  onNotifications,
  onMessages,
  onProductClick,
  onPlaylistPress,
}: HomeScreenFigmaProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingProduct, setPlayingProduct] = useState<string | null>(null);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());

  const filteredProducts = useMemo(() => {
    return featuredProducts.filter(product => {
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'beats') return product.type === 'beat';
      if (selectedCategory === 'kits') return product.type === 'kit';
      if (selectedCategory === 'samples') return product.type === 'sample';
      if (selectedCategory === 'trending') return (product.likes || 0) > 800;
      return true;
    });
  }, [selectedCategory]);

  const handleLike = (productId: string) => {
    setLikedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const handleTogglePlay = (productId: string) => {
    setPlayingProduct(current => (current === productId ? null : productId));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <HomeHeader onSearch={onSearch} onNotifications={onNotifications} onMessages={onMessages} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeCategories categories={categories} selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
        <HomeHeroCarousel />
        <HomePlaylistsSection playlists={featuredPlaylists} onPlaylistPress={onPlaylistPress} />
        <HomeFeaturedSection
          products={featuredProducts.slice(0, 3)}
          playingProductId={playingProduct}
          likedProductIds={likedProducts}
          onProductPress={onProductClick}
          onToggleFavorite={handleLike}
          onTogglePlay={handleTogglePlay}
        />
        <HomeTrendingSection
          products={filteredProducts}
          playingProductId={playingProduct}
          likedProductIds={likedProducts}
          onProductPress={onProductClick}
          onToggleFavorite={handleLike}
          onTogglePlay={handleTogglePlay}
        />
        <HomeRecentUploadsSection
          products={featuredProducts.slice(0, 3)}
          playingProductId={playingProduct}
          onTogglePlay={handleTogglePlay}
          onProductPress={onProductClick}
        />
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
