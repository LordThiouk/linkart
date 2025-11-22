import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ArtistPlaylistCard } from './ArtistPlaylistCard';
import { type FeaturedArtist, type ArtistCategory } from '../types';
import { colors, spacing, typography } from '@/theme';

export interface FeaturedArtistsListProps {
  artists: FeaturedArtist[];
  activeCategory?: ArtistCategory | 'all';
  onArtistPress?: (artistId: string) => void;
  onPlaylistPress?: (playlistId: string) => void;
  testID?: string;
}

export function FeaturedArtistsList({
  artists,
  activeCategory = 'all',
  onArtistPress,
  onPlaylistPress,
  testID,
}: FeaturedArtistsListProps) {
  // Filtrer les artistes selon la catégorie
  const filteredArtists = artists.filter(artist => {
    if (activeCategory === 'all') return true;
    return artist.category === activeCategory;
  });

  if (filteredArtists.length === 0) {
    return (
      <View style={styles.emptyContainer} testID={testID}>
        <Text style={styles.emptyTitle}>
          {activeCategory === 'all' ? 'Aucun artiste disponible' : `Aucun ${activeCategory} disponible`}
        </Text>
        <Text style={styles.emptyText}>Revenez plus tard pour découvrir de nouveaux talents</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      testID={testID}
      showsVerticalScrollIndicator={false}
    >
      {filteredArtists.map(artist => (
        <ArtistPlaylistCard
          key={artist.id}
          artist={artist}
          onPress={() => onArtistPress?.(artist.id)}
          testID={`artist-${artist.id}`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
});
