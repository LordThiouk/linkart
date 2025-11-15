import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Search, SlidersHorizontal, X } from 'lucide-react-native';
import { CategoryChipFigma } from '../../components/atoms/CategoryChipFigma';
import { BeatCardFigma } from '../../components/atoms/BeatCardFigma';
import { colors, spacing, typography, radii } from '@/theme';

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
                <ArrowLeft size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            )}

            <View style={styles.searchContainer}>
              <Search size={20} color={colors.textMuted} style={styles.searchIcon} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Rechercher un beat, artiste..."
                placeholderTextColor={colors.textMuted}
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
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterButtonGradient}
                >
                  <SlidersHorizontal size={20} color={colors.textPrimary} />
                  {activeFiltersCount > 0 && (
                    <View style={styles.filterBadge}>
                      <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
                    </View>
                  )}
                </LinearGradient>
              ) : (
                <View style={styles.filterButtonContent}>
                  <SlidersHorizontal size={20} color={colors.textPrimary} />
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
                <X size={16} color={colors.textSecondary} />
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
              <Search size={40} color={colors.textMuted} />
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
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: `rgba(${parseInt(colors.border.slice(1, 3), 16)}, ${parseInt(colors.border.slice(3, 5), 16)}, ${parseInt(colors.border.slice(5, 7), 16)}, 0.5)`,
    paddingTop: spacing.xxl, // pt-12
    paddingBottom: spacing.md, // pb-4
    paddingHorizontal: spacing.lg, // px-6
  },
  headerContent: {
    gap: spacing.md, // gap-4
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // gap-3 (12px)
    marginBottom: spacing.md, // mb-4
  },
  backButton: {
    padding: spacing.sm, // p-2
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: spacing.md, // left-4
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: spacing.xxl + spacing.md, // pl-12 (48px)
    paddingRight: spacing.md, // pr-4
    paddingVertical: spacing.md - spacing.xs, // py-3 (12px)
    borderRadius: radii.xl, // rounded-2xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filterButton: {
    width: 44, // Fixed size for button
    height: 44,
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    width: spacing.md + spacing.xs, // w-5 (20px)
    height: spacing.md + spacing.xs, // h-5 (20px)
    borderRadius: (spacing.md + spacing.xs) / 2, // rounded-full (10px)
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption, // 10px would be 12px with caption, but keeping close
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  filtersPanel: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    maxHeight: spacing.xxl * 8 + spacing.md, // max-h-100 (400px)
  },
  filtersContent: {
    padding: spacing.lg, // p-6
    gap: spacing.lg, // gap-6
  },
  filterSection: {
    gap: spacing.md - spacing.xs, // gap-3 (12px)
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md - spacing.xs, // mb-3 (12px)
  },
  filterLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  filterClear: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm, // gap-2
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm, // gap-2
    paddingVertical: spacing.md - spacing.xs, // py-3 (12px)
    paddingHorizontal: spacing.md, // px-4
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surfaceElevated,
    marginTop: spacing.sm, // mt-2
  },
  clearButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  resultsContent: {
    padding: spacing.lg, // p-6
    paddingBottom: spacing.xxl * 2, // pb-24 (96px)
  },
  resultsHeader: {
    marginBottom: spacing.md, // mb-4
  },
  resultsCount: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md, // gap-4
    justifyContent: 'space-between',
  },
  beatCard: {
    width: '47%',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2, // py-16 (64px)
    paddingHorizontal: spacing.lg, // px-6
  },
  emptyIcon: {
    width: spacing.xl * 2.5, // w-20 (80px)
    height: spacing.xl * 2.5, // h-20 (80px)
    borderRadius: radii.full, // rounded-full
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md, // mb-4
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - spacing.xs, // 20px (close to headingLg 24px)
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm, // mb-2
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
    maxWidth: 300, // Specific max width for text readability
  },
});
