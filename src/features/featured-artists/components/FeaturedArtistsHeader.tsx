import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { Music2, Headphones, Mic, Building2, User } from 'lucide-react-native';
import { type ArtistCategory } from '../types';
import { colors, spacing, typography } from '@/theme';

export interface FeaturedArtistsHeaderProps {
  activeCategory?: ArtistCategory | 'all';
  onCategoryChange?: (category: ArtistCategory | 'all') => void;
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  testID?: string;
}

const categories = [
  { id: 'all' as const, label: 'Tous', icon: User },
  { id: 'beatmaker' as ArtistCategory, label: 'Beatmaker', icon: Music2 },
  { id: 'mixer' as ArtistCategory, label: 'Mixeur', icon: Headphones },
  { id: 'producer' as ArtistCategory, label: 'Producteur', icon: Mic },
  { id: 'studio' as ArtistCategory, label: 'Studio', icon: Building2 },
  { id: 'artist' as ArtistCategory, label: 'Artiste', icon: User },
];

export function FeaturedArtistsHeader({
  activeCategory = 'all',
  onCategoryChange,
  title = 'Artistes en vedette',
  subtitle,
  showFilters = true,
  testID,
}: FeaturedArtistsHeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {showFilters && onCategoryChange && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <CategoryChipFigma
                key={category.id}
                label={category.label}
                icon={Icon}
                selected={activeCategory === category.id}
                onPress={() => onCategoryChange(category.id)}
                testID={`filter-${category.id}`}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
