import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { ProductCardFigma } from '../components/atoms/ProductCardFigma';

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

interface FavoritesScreenFigmaProps {
  onBack: () => void;
  onProductClick?: (productId: string) => void;
  accessToken?: string | null;
}

const mockFavorites = [
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
  {
    id: '3',
    title: 'Amapiano Drum Kit',
    artist: 'SouthBeats',
    artistImage: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 18000,
    type: 'kit' as const,
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
      // Use mock data for now
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
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.9}>
            <View style={styles.backButtonInner}>
              <ArrowLeft size={20} color="#D4D4D4" />
            </View>
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View style={styles.headerTitleRow}>
              <Heart size={24} color="#EC4899" fill="#EC4899" />
              <Text style={styles.headerTitle}>Mes Favoris</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              {favorites.length} beat{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366F1" />
          </View>
        ) : favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Heart size={40} color="#404040" />
            </View>
            <Text style={styles.emptyTitle}>Aucun favori</Text>
            <Text style={styles.emptySubtitle}>Ajoutez des beats à vos favoris en appuyant sur le cœur</Text>
          </View>
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
                <Animated.View entering={FadeInDown.delay(index * 50)} style={styles.favoriteCard}>
                  <ProductCardFigma
                    {...item}
                    isFavorited={likedProducts.has(item.id)}
                    onToggleFavorite={() => handleToggleFavorite(item.id)}
                    onPress={() => onProductClick?.(item.id)}
                  />
                </Animated.View>
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
    gap: 16, // gap-4
    paddingHorizontal: 24, // px-6
    marginBottom: 16, // mb-4
  },
  backButton: {
    padding: 8, // p-2
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  backButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    marginBottom: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    paddingBottom: 80, // pb-20
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 256, // h-64
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 256, // h-64
    paddingHorizontal: 24, // px-6
  },
  emptyIcon: {
    width: 80, // w-20
    height: 80, // h-20
    borderRadius: 40,
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
    textAlign: 'center',
  },
  favoritesGrid: {
    flex: 1,
  },
  favoritesList: {
    gap: 16, // gap-4
  },
  favoritesRow: {
    gap: 16, // gap-4
  },
  favoriteCard: {
    flex: 1,
    maxWidth: '48%',
  },
});
