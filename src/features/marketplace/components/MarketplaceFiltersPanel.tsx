import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import Slider from '@/components/atoms/Slider';
import { colors, spacing, typography, radii } from '@/theme';

interface MarketplaceFiltersPanelProps {
  selectedTab: 'products' | 'services';
  genreFilters?: string[];
  selectedGenre?: string;
  onGenreSelect?: (genre: string) => void;
  serviceCategories?: string[];
  selectedServiceCategory?: string;
  onServiceCategorySelect?: (category: string) => void;
  locationFilters?: string[];
  selectedLocation?: string;
  onLocationSelect?: (location: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange?: (range: [number, number]) => void;
  minRating?: number;
  onMinRatingChange?: (rating: number) => void;
  onReset?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceFiltersPanel({
  selectedTab,
  genreFilters = [],
  selectedGenre,
  onGenreSelect,
  serviceCategories = [],
  selectedServiceCategory,
  onServiceCategorySelect,
  locationFilters = [],
  selectedLocation,
  onLocationSelect,
  priceRange = [0, 50000],
  onPriceRangeChange,
  minRating = 0,
  onMinRatingChange,
  onReset,
  style,
  testID,
}: MarketplaceFiltersPanelProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Products Filters */}
          {selectedTab === 'products' && genreFilters.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Genre</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                {genreFilters.map(genre => (
                  <CategoryChipFigma
                    key={`genre-${genre}`}
                    label={genre}
                    selected={selectedGenre === genre}
                    onPress={() => onGenreSelect?.(genre)}
                    testID={`filter-genre-${genre}`}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Services Filters */}
          {selectedTab === 'services' && serviceCategories.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>Catégorie de service</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                {serviceCategories.map(category => (
                  <CategoryChipFigma
                    key={`service-${category}`}
                    label={category}
                    selected={selectedServiceCategory === category}
                    onPress={() => onServiceCategorySelect?.(category)}
                    testID={`filter-service-${category}`}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Location Filter */}
          {locationFilters.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.label}>📍 Localité</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                {locationFilters.map(location => (
                  <CategoryChipFigma
                    key={`location-${location}`}
                    label={location}
                    selected={selectedLocation === location}
                    onPress={() => onLocationSelect?.(location)}
                    testID={`filter-location-${location}`}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Prix: {priceRange[0].toLocaleString()} F - {priceRange[1].toLocaleString()} F
            </Text>
            <View style={styles.priceRangeSliders}>
              <View style={styles.sliderContainer}>
                <Slider
                  label="Minimum"
                  value={priceRange[0]}
                  min={0}
                  max={50000}
                  step={1000}
                  showValue
                  onValueChange={value => {
                    const newMin = Math.min(value, priceRange[1] - 1000);
                    onPriceRangeChange?.([newMin, priceRange[1]]);
                  }}
                />
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  label="Maximum"
                  value={priceRange[1]}
                  min={0}
                  max={50000}
                  step={1000}
                  showValue
                  variant="secondary"
                  onValueChange={value => {
                    const newMax = Math.max(value, priceRange[0] + 1000);
                    onPriceRangeChange?.([priceRange[0], newMax]);
                  }}
                />
              </View>
            </View>
          </View>

          {/* Rating Filter */}
          <View style={styles.section}>
            <Text style={styles.label}>Note minimum</Text>
            <View style={styles.ratingContainer}>
              {[0, 3, 4, 4.5].map(rating => (
                <CategoryChipFigma
                  key={`rating-${rating}`}
                  label={rating === 0 ? 'Toutes' : `${rating}+ ⭐`}
                  selected={minRating === rating}
                  onPress={() => onMinRatingChange?.(rating)}
                  testID={`filter-rating-${rating}`}
                />
              ))}
            </View>
          </View>

          {/* Reset Button */}
          {onReset && (
            <TouchableOpacity onPress={onReset} style={styles.resetButton} activeOpacity={0.8}>
              <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    maxHeight: 400,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  chips: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  priceRangeSliders: {
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  sliderContainer: {
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
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
});
