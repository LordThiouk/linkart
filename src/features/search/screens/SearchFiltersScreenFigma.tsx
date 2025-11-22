import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  SearchFiltersHeader,
  FilterSection,
  ChipFilterGroup,
  ClearFiltersButton,
  SearchResults,
  type SearchResult,
} from '../components';
import { colors, spacing } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface SearchFiltersScreenFigmaProps {
  onBack?: () => void;
  onBeatClick?: (beatId: string) => void;
}

// Mock data - à remplacer par des props ou un hook
const genres = ['Trap', 'Hip-Hop', 'Lo-fi', 'EDM', 'R&B', 'Pop', 'Rock', 'Jazz'];
const priceRanges = ['Gratuit', '< €20', '€20-€50', '> €50'];
const moods = ['Énergique', 'Calme', 'Sombre', 'Joyeux', 'Mélancolique'];
const bpmRanges = ['< 80', '80-120', '120-140', '> 140'];

const mockSearchResults: SearchResult[] = [
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

  const togglePrice = (price: string) => {
    setSelectedPrice(prev => (prev === price ? null : price));
  };

  const toggleMood = (mood: string) => {
    setSelectedMood(prev => (prev === mood ? null : mood));
  };

  const toggleBPM = (bpm: string) => {
    setSelectedBPM(prev => (prev === bpm ? null : bpm));
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedPrice(null);
    setSelectedMood(null);
    setSelectedBPM(null);
  };

  const activeFiltersCount =
    selectedGenres.length + (selectedPrice ? 1 : 0) + (selectedMood ? 1 : 0) + (selectedBPM ? 1 : 0);

  // Filter results based on search query and filters
  const filteredResults = mockSearchResults.filter(beat => {
    if (
      searchQuery &&
      !beat.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !beat.artist.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedGenres.length > 0 && !selectedGenres.includes(beat.genre)) {
      return false;
    }
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <SearchFiltersHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showFilters={showFilters}
        activeFiltersCount={activeFiltersCount}
        onToggleFilters={() => setShowFilters(!showFilters)}
        onBack={onBack}
      />

      {/* Filters Panel */}
      {showFilters && (
        <AnimatedView entering={FadeInUp} style={styles.filtersPanel}>
          <ScrollView contentContainerStyle={styles.filtersContent} showsVerticalScrollIndicator={false}>
            {/* Genre Filter */}
            <FilterSection title="Genre" showClear={selectedGenres.length > 0} onClear={() => setSelectedGenres([])}>
              <ChipFilterGroup
                options={genres}
                selectedValues={selectedGenres}
                onToggle={toggleGenre}
                multiple={true}
              />
            </FilterSection>

            {/* Price Filter */}
            <FilterSection title="Prix">
              <ChipFilterGroup
                options={priceRanges}
                selectedValues={selectedPrice ? [selectedPrice] : []}
                onToggle={togglePrice}
                multiple={false}
              />
            </FilterSection>

            {/* BPM Filter */}
            <FilterSection title="BPM">
              <ChipFilterGroup
                options={bpmRanges}
                selectedValues={selectedBPM ? [selectedBPM] : []}
                onToggle={toggleBPM}
                multiple={false}
              />
            </FilterSection>

            {/* Mood Filter */}
            <FilterSection title="Ambiance">
              <ChipFilterGroup
                options={moods}
                selectedValues={selectedMood ? [selectedMood] : []}
                onToggle={toggleMood}
                multiple={false}
              />
            </FilterSection>

            {/* Clear All */}
            {activeFiltersCount > 0 && <ClearFiltersButton onPress={clearFilters} />}
          </ScrollView>
        </AnimatedView>
      )}

      {/* Results */}
      <ScrollView contentContainerStyle={styles.resultsContent} showsVerticalScrollIndicator={false} bounces={false}>
        <SearchResults query={searchQuery} results={filteredResults} onBeatClick={onBeatClick} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filtersPanel: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    maxHeight: spacing.xxl * 8 + spacing.md,
  },
  filtersContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  resultsContent: {
    flexGrow: 1,
  },
});
