import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  PlaylistDetailScreenFigma,
  type PlaylistDetailScreenFigmaProps,
} from '@/features/playlists/screens/PlaylistDetailScreenFigma';

export function PlaylistDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const playlist = route.params?.playlist || {
    id: '',
    title: 'Playlist',
    beatCount: 0,
  };

  const beats = route.params?.beats || [];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleBeatPress: PlaylistDetailScreenFigmaProps['onBeatPress'] = beatId => {
    console.log('Beat pressed:', beatId);
    // Navigate to beat detail or play beat
  };

  const handleToggleFavorite: PlaylistDetailScreenFigmaProps['onToggleFavorite'] = beatId => {
    console.log('Toggle favorite:', beatId);
    // Toggle favorite
  };

  const handleBuy: PlaylistDetailScreenFigmaProps['onBuy'] = beatId => {
    console.log('Buy:', beatId);
    // Navigate to checkout
    navigation.navigate('Checkout', { productId: beatId });
  };

  return (
    <PlaylistDetailScreenFigma
      playlist={playlist}
      beats={beats}
      onBack={handleBack}
      onBeatPress={handleBeatPress}
      onToggleFavorite={handleToggleFavorite}
      onBuy={handleBuy}
      onPlayAll={() => console.log('Play all')}
      onShuffle={() => console.log('Shuffle')}
      onShare={() => console.log('Share')}
    />
  );
}
