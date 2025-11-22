import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  FeaturedArtistsScreenFigma,
  type FeaturedArtistsScreenFigmaProps,
} from '@/features/featured-artists/screens/FeaturedArtistsScreenFigma';

export function FeaturedArtistsScreen() {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleArtistPress: FeaturedArtistsScreenFigmaProps['onArtistPress'] = artistId => {
    console.log('Artist pressed:', artistId);
    // Navigate to artist profile
    // navigation.navigate('Profile', { userId: artistId });
  };

  const handlePlaylistPress: FeaturedArtistsScreenFigmaProps['onPlaylistPress'] = playlistId => {
    console.log('Playlist pressed:', playlistId);
    // Navigate to playlist detail
    navigation.navigate('PlaylistDetail', { playlistId });
  };

  return (
    <FeaturedArtistsScreenFigma
      onBack={handleBack}
      onArtistPress={handleArtistPress}
      onPlaylistPress={handlePlaylistPress}
    />
  );
}
