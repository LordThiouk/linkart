import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Search } from 'lucide-react-native';
import { BeatCardFigma } from '@/components/atoms/BeatCardFigma';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  price: number;
  bpm: number;
  genre: string;
  likes: number;
}

export interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  onBeatClick?: (beatId: string) => void;
  testID?: string;
}

export function SearchResults({ query, results, onBeatClick, testID }: SearchResultsProps) {
  if (!query) {
    return (
      <View style={styles.emptyState} testID={testID}>
        <View style={styles.emptyIcon}>
          <Search size={40} color={colors.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>Commencez votre recherche</Text>
        <Text style={styles.emptySubtitle}>
          Utilisez la barre de recherche ou les filtres pour trouver le beat parfait
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.count}>
          {results.length} résultat{results.length > 1 ? 's' : ''} pour "{query}"
        </Text>
      </View>

      <View style={styles.grid}>
        {results.map((beat, index) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl * 2,
  },
  header: {
    marginBottom: spacing.md,
  },
  count: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  beatCard: {
    width: '47%',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    width: spacing.xl * 2.5,
    height: spacing.xl * 2.5,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - spacing.xs,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
    maxWidth: 300,
  },
});
