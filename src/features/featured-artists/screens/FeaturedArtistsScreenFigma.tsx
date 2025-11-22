import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeaturedArtistsHeader, FeaturedArtistsList } from '../components';
import { type ArtistCategory } from '../types';
import { mockArtists } from '../mockData';
import { colors } from '@/theme';

export interface FeaturedArtistsScreenFigmaProps {
  onBack?: () => void;
  onArtistPress?: (artistId: string) => void;
  onPlaylistPress?: (playlistId: string) => void;
}

export function FeaturedArtistsScreenFigma({
  onBack,
  onArtistPress,
  onPlaylistPress,
}: FeaturedArtistsScreenFigmaProps) {
  const [activeCategory, setActiveCategory] = useState<ArtistCategory | 'all'>('all');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FeaturedArtistsHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        subtitle="Découvrez les meilleurs créateurs et leurs playlists"
      />

      <FeaturedArtistsList
        artists={mockArtists}
        activeCategory={activeCategory}
        onArtistPress={onArtistPress}
        onPlaylistPress={onPlaylistPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
