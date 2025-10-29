import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ProductCard } from '../components/atoms/ProductCard';
import { useFavoritesStore, MOCK_FAVORITE_PRODUCTS } from '../store/favoritesStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 colonnes avec marges

interface FavoriteProduct {
  id: string;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
  viewCount: number;
  downloadCount: number;
  likeCount: number;
}

type SortOption = 'date' | 'title' | 'artist';

export const FavoritesScreen: React.FC = () => {
  const theme = useTheme();
  const { favorites, loadFavorites } = useFavoritesStore();
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [refreshing, setRefreshing] = useState(false);

  // Filtrer les produits favoris depuis les mock data
  const favoriteProducts: FavoriteProduct[] = MOCK_FAVORITE_PRODUCTS.filter(product => favorites.has(product.id));

  // Trier les produits selon l'option sélectionnée
  const sortedProducts = [...favoriteProducts].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'artist':
        return a.artist.localeCompare(b.artist);
      case 'date':
      default:
        // Pour l'instant, utiliser l'ordre des mock data
        return 0;
    }
  });

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  };

  const handleProductPress = (id: string) => {
    // TODO: Navigation vers ProductDetailScreen
    console.log('Navigate to product:', id);
  };

  const handlePlay = (id: string) => {
    // TODO: Jouer le preview
    console.log('Play product:', id);
  };

  const handleExplorePress = () => {
    // TODO: Navigation vers MarketplaceScreen
    console.log('Navigate to marketplace');
  };

  const renderProduct = ({ item }: { item: FavoriteProduct }) => (
    <View style={{ width: CARD_WIDTH }}>
      <ProductCard
        id={item.id}
        title={item.title}
        artist={item.artist}
        price={item.price}
        imageUrl={item.imageUrl}
        viewCount={item.viewCount}
        downloadCount={item.downloadCount}
        likeCount={item.likeCount}
        onPress={handleProductPress}
        onPlay={handlePlay}
        testID={`favorite-product-${item.id}`}
      />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>Aucun favori</Text>
      <Text style={[styles.emptySubtitle, { color: theme.colors.onSurfaceVariant }]}>
        Explorez la marketplace et ajoutez vos beats préférés
      </Text>
      <TouchableOpacity
        style={[styles.exploreButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleExplorePress}
      >
        <Text style={[styles.exploreButtonText, { color: theme.colors.onPrimary }]}>Explorer</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSortDropdown = () => (
    <View style={styles.sortContainer}>
      <Text style={[styles.sortLabel, { color: theme.colors.onSurfaceVariant }]}>Trier par:</Text>
      <View style={styles.sortButtons}>
        {(['date', 'title', 'artist'] as SortOption[]).map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.sortButton,
              {
                backgroundColor: sortBy === option ? theme.colors.primary : theme.colors.surfaceVariant,
              },
            ]}
            onPress={() => setSortBy(option)}
          >
            <Text
              style={[
                styles.sortButtonText,
                {
                  color: sortBy === option ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
                },
              ]}
            >
              {option === 'date' ? 'Date' : option === 'title' ? 'Titre' : 'Artiste'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>Mes Favoris</Text>
        {favoriteProducts.length > 0 && renderSortDropdown()}
      </View>

      {/* Content */}
      {favoriteProducts.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={sortedProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sortLabel: {
    fontSize: 14,
    marginRight: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  exploreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
