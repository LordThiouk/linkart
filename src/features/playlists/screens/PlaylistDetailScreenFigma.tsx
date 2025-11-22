import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PlaylistDetailHeader, PlaylistBeatList, PlaylistPlayer, type Beat } from '../components';
import { colors, spacing } from '@/theme';

export interface PlaylistDetailScreenFigmaProps {
  playlist: {
    id: string;
    title: string;
    description?: string;
    coverImage?: string;
    beatCount: number;
    duration?: string;
    typebeat?: string;
    ambiance?: string;
  };
  beats: Beat[];
  onBack?: () => void;
  onBeatPress?: (beatId: string) => void;
  onToggleFavorite?: (beatId: string) => void;
  onBuy?: (beatId: string) => void;
  onPlayAll?: () => void;
  onShuffle?: () => void;
  onShare?: () => void;
}

export function PlaylistDetailScreenFigma({
  playlist,
  beats,
  onBack,
  onBeatPress,
  onToggleFavorite,
  onBuy,
  onPlayAll,
  onShuffle,
  onShare,
}: PlaylistDetailScreenFigmaProps) {
  const [currentBeatId, setCurrentBeatId] = useState<string | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');

  const currentBeat = currentBeatId ? beats.find(b => b.id === currentBeatId) : undefined;

  const handleBeatPress = (beatId: string) => {
    setCurrentBeatId(beatId);
    setIsPlaying(true);
    onBeatPress?.(beatId);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (!currentBeatId) return;
    const currentIndex = beats.findIndex(b => b.id === currentBeatId);
    const nextIndex = isShuffled ? Math.floor(Math.random() * beats.length) : (currentIndex + 1) % beats.length;
    setCurrentBeatId(beats[nextIndex]?.id);
  };

  const handlePrevious = () => {
    if (!currentBeatId) return;
    const currentIndex = beats.findIndex(b => b.id === currentBeatId);
    const prevIndex = isShuffled
      ? Math.floor(Math.random() * beats.length)
      : (currentIndex - 1 + beats.length) % beats.length;
    setCurrentBeatId(beats[prevIndex]?.id);
  };

  const handlePlayAll = () => {
    if (beats.length > 0) {
      setCurrentBeatId(beats[0].id);
      setIsPlaying(true);
      onPlayAll?.();
    }
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
    onShuffle?.();
  };

  const handleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <PlaylistDetailHeader
          coverImage={playlist.coverImage}
          title={playlist.title}
          description={playlist.description}
          beatCount={playlist.beatCount}
          duration={playlist.duration}
          typebeat={playlist.typebeat}
          ambiance={playlist.ambiance}
          onBack={onBack}
          onPlayAll={handlePlayAll}
          onShuffle={handleShuffle}
          onShare={onShare}
        />

        <PlaylistBeatList
          beats={beats}
          currentBeatId={currentBeatId}
          isPlaying={isPlaying}
          onBeatPress={handleBeatPress}
          onToggleFavorite={onToggleFavorite}
          onBuy={onBuy}
        />
      </ScrollView>

      {currentBeat && (
        <PlaylistPlayer
          currentBeat={{
            id: currentBeat.id,
            title: currentBeat.title,
            artist: currentBeat.artist,
            coverImage: currentBeat.coverImage,
          }}
          isPlaying={isPlaying}
          progress={0.35}
          duration={currentBeat.duration}
          currentTime="1:12"
          isShuffled={isShuffled}
          repeatMode={repeatMode}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onShuffle={handleShuffle}
          onRepeat={handleRepeat}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl,
  },
});
