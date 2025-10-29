import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { Play, Pause, Shuffle, SkipForward, SkipBack } from 'lucide-react-native';
import { usePlaylistsStore } from '../store/playlistsStore';
import { PlayButton } from '../components/atoms/PlayButton';

interface RouteParams {
  playlistId: string;
}

interface PlaylistDetailScreenProps {
  playlistId?: string; // Pour Storybook
}

export const PlaylistDetailScreen: React.FC<PlaylistDetailScreenProps> = ({ playlistId: propPlaylistId }) => {
  const theme = useTheme();

  // Gestion du contexte de navigation (peut être undefined dans Storybook)
  let routePlaylistId: string | undefined;
  try {
    const route = useRoute();
    routePlaylistId = (route.params as RouteParams)?.playlistId;
  } catch {
    // Dans Storybook, useRoute() peut ne pas être disponible
    routePlaylistId = undefined;
  }

  const playlistId = propPlaylistId || routePlaylistId;

  const {
    currentPlaylist,
    currentBeatIndex,
    loading,
    loadPlaylistDetail,
    setCurrentBeatIndex,
    nextBeat,
    previousBeat,
  } = usePlaylistsStore();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    if (playlistId) {
      loadPlaylistDetail(playlistId);
    }
  }, [playlistId, loadPlaylistDetail]);

  const handlePlayAll = () => {
    setIsPlaying(true);
    // TODO: Démarrer la lecture de tous les beats
    console.log('Play all beats');
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    // TODO: Mélanger l'ordre des beats
    console.log('Shuffle:', !isShuffled);
  };

  const handleBeatPress = (beatId: string) => {
    const beatIndex = currentPlaylist?.beats.findIndex(beat => beat.id === beatId);
    if (beatIndex !== undefined && beatIndex >= 0) {
      setCurrentBeatIndex(beatIndex);
    }
  };

  const handlePlay = (beatId: string) => {
    handleBeatPress(beatId);
    setIsPlaying(true);
    // TODO: Jouer le beat spécifique
    console.log('Play beat:', beatId);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Play/Pause du beat actuel
    console.log('Play/Pause current beat');
  };

  const handleNext = () => {
    nextBeat();
    // TODO: Jouer le beat suivant
    console.log('Next beat');
  };

  const handlePrevious = () => {
    previousBeat();
    // TODO: Jouer le beat précédent
    console.log('Previous beat');
  };

  const renderBeatItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={[
        styles.beatItem,
        {
          backgroundColor: currentBeatIndex === index ? theme.colors.surfaceVariant : theme.colors.surface,
        },
      ]}
      onPress={() => handleBeatPress(item.id)}
    >
      <View style={styles.beatContent}>
        <Image source={{ uri: item.imageUrl }} style={styles.beatImage} />
        <View style={styles.beatInfo}>
          <Text style={[styles.beatTitle, { color: theme.colors.onSurface }]}>{item.title}</Text>
          <Text style={[styles.beatArtist, { color: theme.colors.onSurfaceVariant }]}>{item.artist}</Text>
          <Text style={[styles.beatDuration, { color: theme.colors.onSurfaceVariant }]}>{item.duration}</Text>
        </View>
        <View style={styles.beatActions}>
          <PlayButton
            isPlaying={currentBeatIndex === index && isPlaying}
            size="sm"
            onPress={() => handlePlay(item.id)}
            testID={`beat-play-${item.id}`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.onSurface }}>Chargement...</Text>
      </View>
    );
  }

  if (!currentPlaylist) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.onSurface }}>Playlist non trouvée</Text>
      </View>
    );
  }

  const currentBeat = currentPlaylist.beats[currentBeatIndex];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header avec cover et infos */}
      <View style={styles.header}>
        <Image source={{ uri: currentPlaylist.cover_url }} style={styles.coverImage} />
        <View style={styles.headerInfo}>
          <Text style={[styles.playlistTitle, { color: theme.colors.onSurface }]}>{currentPlaylist.title}</Text>
          <Text style={[styles.playlistDescription, { color: theme.colors.onSurfaceVariant }]}>
            {currentPlaylist.description}
          </Text>
          <View style={styles.metadata}>
            {currentPlaylist.typebeat && (
              <Text style={[styles.metadataText, { color: theme.colors.onSurfaceVariant }]}>
                {currentPlaylist.typebeat}
              </Text>
            )}
            {currentPlaylist.ambiance && (
              <Text style={[styles.metadataText, { color: theme.colors.onSurfaceVariant }]}>
                • {currentPlaylist.ambiance}
              </Text>
            )}
            {currentPlaylist.bpm_range && (
              <Text style={[styles.metadataText, { color: theme.colors.onSurfaceVariant }]}>
                • {currentPlaylist.bpm_range} BPM
              </Text>
            )}
          </View>
          <Text style={[styles.beatCount, { color: theme.colors.onSurfaceVariant }]}>
            {currentPlaylist.beat_count} beats
          </Text>
        </View>
      </View>

      {/* Boutons d'action */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          onPress={handlePlayAll}
        >
          <Play size={20} color={theme.colors.onPrimary} />
          <Text style={[styles.actionButtonText, { color: theme.colors.onPrimary }]}>Play All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: isShuffled ? theme.colors.primary : theme.colors.surfaceVariant,
            },
          ]}
          onPress={handleShuffle}
        >
          <Shuffle size={20} color={isShuffled ? theme.colors.onPrimary : theme.colors.onSurfaceVariant} />
          <Text
            style={[
              styles.actionButtonText,
              {
                color: isShuffled ? theme.colors.onPrimary : theme.colors.onSurfaceVariant,
              },
            ]}
          >
            Shuffle
          </Text>
        </TouchableOpacity>
      </View>

      {/* Liste des beats */}
      <FlatList
        data={currentPlaylist.beats}
        renderItem={renderBeatItem}
        keyExtractor={item => item.id}
        style={styles.beatsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Mini Player sticky */}
      {currentBeat && (
        <View style={[styles.miniPlayer, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.miniPlayerContent}>
            <Image source={{ uri: currentBeat.imageUrl }} style={styles.miniPlayerImage} />
            <View style={styles.miniPlayerInfo}>
              <Text style={[styles.miniPlayerTitle, { color: theme.colors.onSurface }]}>{currentBeat.title}</Text>
              <Text style={[styles.miniPlayerArtist, { color: theme.colors.onSurfaceVariant }]}>
                {currentBeat.artist}
              </Text>
            </View>
            <View style={styles.miniPlayerControls}>
              <TouchableOpacity onPress={handlePrevious} disabled={currentBeatIndex === 0}>
                <SkipBack size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlayPause}>
                {isPlaying ? (
                  <Pause size={24} color={theme.colors.onSurface} />
                ) : (
                  <Play size={24} color={theme.colors.onSurface} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNext} disabled={currentBeatIndex === currentPlaylist.beats.length - 1}>
                <SkipForward size={24} color={theme.colors.onSurface} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  coverImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  playlistTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  playlistDescription: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 18,
  },
  metadata: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  metadataText: {
    fontSize: 12,
  },
  beatCount: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  beatsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  beatItem: {
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
  },
  beatContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  beatImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  beatInfo: {
    flex: 1,
  },
  beatTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  beatArtist: {
    fontSize: 12,
    marginBottom: 2,
  },
  beatDuration: {
    fontSize: 11,
  },
  beatActions: {
    alignItems: 'center',
  },
  miniPlayer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  miniPlayerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  miniPlayerImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  miniPlayerInfo: {
    flex: 1,
  },
  miniPlayerTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  miniPlayerArtist: {
    fontSize: 12,
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
});
