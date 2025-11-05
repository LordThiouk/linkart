import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Search, SlidersHorizontal, X } from 'lucide-react-native';
import { CategoryChipFigma } from '../../components/atoms/CategoryChipFigma';
import { BeatCardFigma } from '../../components/atoms/BeatCardFigma';

const AnimatedView = Animated.createAnimatedComponent(View);

interface SearchFiltersScreenFigmaProps {
  onBack?: () => void;
  onBeatClick?: (beatId: string) => void;
}

const genres = ['Trap', 'Hip-Hop', 'Lo-fi', 'EDM', 'R&B', 'Pop', 'Rock', 'Jazz'];
const priceRanges = ['Gratuit', '< €20', '€20-€50', '> €50'];
const moods = ['Énergique', 'Calme', 'Sombre', 'Joyeux', 'Mélancolique'];
const bpmRanges = ['< 80', '80-120', '120-140', '> 140'];

const searchResults = [
  {
    id: '1',
    title: 'Dark Trap Energy',
    artist: 'BeatKing',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    price: 29.99,
    bpm: 140,
    genre: 'Trap',
    likes: 543,
  },
  {
    id: '2',
    title: 'Chill Vibes Only',
    artist: 'LoFi Master',
    coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    price: 19.99,
    bpm: 85,
    genre: 'Lo-fi',
    likes: 892,
  },
];

export function SearchFiltersScreenFigma({ onBack, onBeatClick }: SearchFiltersScreenFigmaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedBPM, setSelectedBPM] = useState<string | null>(null);

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => (prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]));
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedPrice(null);
    setSelectedMood(null);
    setSelectedBPM(null);
  };

  const activeFiltersCount =
    selectedGenres.length + (selectedPrice ? 1 : 0) + (selectedMood ? 1 : 0) + (selectedBPM ? 1 : 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ArrowLeft size={24} color="#D4D4D4" />
              </TouchableOpacity>
            )}

            <View style={styles.searchContainer}>
              <Search size={20} color="#A3A3A3" style={styles.searchIcon} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Rechercher un beat, artiste..."
                placeholderTextColor="#A3A3A3"
                style={styles.searchInput}
                autoFocus
              />
            </View>

            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              style={[styles.filterButton, (showFilters || activeFiltersCount > 0) && styles.filterButtonActive]}
              activeOpacity={0.8}
            >
              {showFilters || activeFiltersCount > 0 ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterButtonGradient}
                >
                  <SlidersHorizontal size={20} color="#F5F5F5" />
                  {activeFiltersCount > 0 && (
                    <View style={styles.filterBadge}>
                      <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
                    </View>
                  )}
                </LinearGradient>
              ) : (
                <View style={styles.filterButtonContent}>
                  <SlidersHorizontal size={20} color="#F5F5F5" />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <AnimatedView entering={FadeInUp} style={styles.filtersPanel}>
          <ScrollView contentContainerStyle={styles.filtersContent} showsVerticalScrollIndicator={false}>
            {/* Genre Filter */}
            <View style={styles.filterSection}>
              <View style={styles.filterHeader}>
                <Text style={styles.filterLabel}>Genre</Text>
                {selectedGenres.length > 0 && (
                  <TouchableOpacity onPress={() => setSelectedGenres([])}>
                    <Text style={styles.filterClear}>Effacer</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.filterChips}>
                {genres.map(genre => (
                  <CategoryChipFigma
                    key={genre}
                    label={genre}
                    selected={selectedGenres.includes(genre)}
                    onPress={() => toggleGenre(genre)}
                  />
                ))}
              </View>
            </View>

            {/* Price Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Prix</Text>
              <View style={styles.filterChips}>
                {priceRanges.map(price => (
                  <CategoryChipFigma
                    key={price}
                    label={price}
                    selected={selectedPrice === price}
                    onPress={() => setSelectedPrice(selectedPrice === price ? null : price)}
                  />
                ))}
              </View>
            </View>

            {/* BPM Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>BPM</Text>
              <View style={styles.filterChips}>
                {bpmRanges.map(bpm => (
                  <CategoryChipFigma
                    key={bpm}
                    label={bpm}
                    selected={selectedBPM === bpm}
                    onPress={() => setSelectedBPM(selectedBPM === bpm ? null : bpm)}
                  />
                ))}
              </View>
            </View>

            {/* Mood Filter */}
            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Ambiance</Text>
              <View style={styles.filterChips}>
                {moods.map(mood => (
                  <CategoryChipFigma
                    key={mood}
                    label={mood}
                    selected={selectedMood === mood}
                    onPress={() => setSelectedMood(selectedMood === mood ? null : mood)}
                  />
                ))}
              </View>
            </View>

            {/* Clear All */}
            {activeFiltersCount > 0 && (
              <TouchableOpacity onPress={clearFilters} style={styles.clearButton} activeOpacity={0.8}>
                <X size={16} color="#D4D4D4" />
                <Text style={styles.clearButtonText}>Réinitialiser tous les filtres</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </AnimatedView>
      )}

      {/* Results */}
      <ScrollView contentContainerStyle={styles.resultsContent} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {searchQuery
              ? `${searchResults.length} résultats pour "${searchQuery}"`
              : 'Recherchez ou utilisez les filtres'}
          </Text>
        </View>

        {searchQuery && (
          <View style={styles.resultsGrid}>
            {searchResults.map((beat, index) => (
              <AnimatedView key={beat.id} entering={FadeInDown.delay(index * 100)} style={styles.beatCard}>
                <BeatCardFigma
                  id={beat.id}
                  title={beat.title}
                  artist={beat.artist}
                  coverImage={beat.coverImage}
                  price={beat.price}
                  bpm={beat.bpm}
                  genre={beat.genre}
                  likes={beat.likes}
                  onPress={() => onBeatClick?.(beat.id)}
                />
              </AnimatedView>
            ))}
          </View>
        )}

        {!searchQuery && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Search size={40} color="#A3A3A3" />
            </View>
            <Text style={styles.emptyTitle}>Commencez votre recherche</Text>
            <Text style={styles.emptySubtitle}>
              Utilisez la barre de recherche ou les filtres pour trouver le beat parfait
            </Text>
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
    gap: 12,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '400',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  filterButtonActive: {
    borderWidth: 0,
  },
  filterButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterButtonContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#EC4899',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontWeight: '600',
  },
  filtersPanel: {
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
    maxHeight: 400,
  },
  filtersContent: {
    padding: 24,
    gap: 24,
  },
  filterSection: {
    gap: 12,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  filterLabel: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '600',
  },
  filterClear: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '400',
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    marginTop: 8,
  },
  clearButtonText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  resultsContent: {
    padding: 24,
    paddingBottom: 96,
  },
  resultsHeader: {
    marginBottom: 16,
  },
  resultsCount: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  beatCard: {
    width: '47%',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
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
    textAlign: 'center',
    maxWidth: 300,
  },
});
