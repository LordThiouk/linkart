import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ProductCardFigma } from '@/components/atoms/ProductCardFigma';
import { colors, spacing } from '@/theme';
import { FavoritesHeader, FavoritesEmptyState } from '@/features/favorites/components';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Product {
  id: string;
  title: string;
  artist: string;
  artistImage: string;
  coverImage: string;
  price: number;
  type: 'beat' | 'kit' | 'sample';
  bpm?: number;
  genre: string;
  likes: number;
  downloads: number;
  rating: number;
  reviewCount: number;
}

export interface FavoritesScreenFigmaProps {
  onBack: () => void;
  onProductClick?: (productId: string) => void;
  accessToken?: string | null;
}

const mockFavorites: Product[] = [
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
    artistImage: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
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
    artistImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit',
    genre: 'Amapiano',
    likes: 2104,
    downloads: 1234,
    rating: 4.8,
    reviewCount: 89,
  },
];

export function FavoritesScreenFigma({ onBack, onProductClick, accessToken }: FavoritesScreenFigmaProps) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set(mockFavorites.map(f => f.id)));

  const loadFavorites = useCallback(async () => {
    if (!accessToken) {
      setLoading(false);
      setFavorites(mockFavorites);
      return;
    }

    try {
      // TODO: Replace with actual API call
      // const { favorites: data } = await api.favorites.list(accessToken);
      // setFavorites(data || []);
      setFavorites(mockFavorites);
    } catch (error) {
      console.error('Load favorites error:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  async function handleToggleFavorite(productId: string) {
    if (!accessToken) {
      // Show error toast
      return;
    }

    try {
      // TODO: Replace with actual API call
      // await api.favorites.toggle(productId, accessToken);
      setLikedProducts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(productId)) {
          newSet.delete(productId);
          setFavorites(prev => prev.filter(f => f.id !== productId));
        } else {
          newSet.add(productId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Toggle favorite error:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <FavoritesHeader onBack={onBack} favoritesCount={favorites.length} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : favorites.length === 0 ? (
          <FavoritesEmptyState />
        ) : (
          <View style={styles.favoritesGrid}>
            <FlatList
              data={favorites}
              numColumns={2}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.favoritesList}
              columnWrapperStyle={styles.favoritesRow}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <AnimatedView entering={FadeInDown.delay(index * 50)} style={styles.favoriteCard}>
                  <ProductCardFigma
                    {...item}
                    isFavorited={likedProducts.has(item.id)}
                    onToggleFavorite={() => handleToggleFavorite(item.id)}
                    onPress={() => onProductClick?.(item.id)}
                  />
                </AnimatedView>
              )}
            />
          </View>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl + spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.xxl * 4 + spacing.xl * 2,
  },
  favoritesGrid: {
    flex: 1,
  },
  favoritesList: {
    gap: spacing.md,
  },
  favoritesRow: {
    gap: spacing.md,
  },
  favoriteCard: {
    flex: 1,
    maxWidth: '48%',
  },
});
