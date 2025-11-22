import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PlaylistBeatItem } from './PlaylistBeatItem';
import { colors, spacing, typography } from '@/theme';

export interface Beat {
  id: string;
  position: number;
  title: string;
  artist: string;
  coverImage?: string;
  duration: string;
  price: number;
  isPurchased?: boolean;
  isFavorite?: boolean;
}

export interface PlaylistBeatListProps {
  beats: Beat[];
  currentBeatId?: string;
  isPlaying?: boolean;
  onBeatPress: (beatId: string) => void;
  onToggleFavorite?: (beatId: string) => void;
  onBuy?: (beatId: string) => void;
  testID?: string;
}

export function PlaylistBeatList({
  beats,
  currentBeatId,
  isPlaying = false,
  onBeatPress,
  onToggleFavorite,
  onBuy,
  testID,
}: PlaylistBeatListProps) {
  const renderBeat = ({ item }: { item: Beat }) => {
    const isCurrentBeat = item.id === currentBeatId;
    return (
      <PlaylistBeatItem
        position={item.position}
        title={item.title}
        artist={item.artist}
        coverImage={item.coverImage}
        duration={item.duration}
        price={item.price}
        isPurchased={item.isPurchased}
        isFavorite={item.isFavorite}
        isCurrentBeat={isCurrentBeat}
        isPlaying={isCurrentBeat && isPlaying}
        onPress={() => onBeatPress(item.id)}
        onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(item.id) : undefined}
        onBuy={onBuy ? () => onBuy(item.id) : undefined}
        testID={`beat-${item.id}`}
      />
    );
  };

  if (beats.length === 0) {
    return (
      <View style={styles.emptyContainer} testID={testID}>
        <Text style={styles.emptyText}>Aucun beat dans cette playlist</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.sectionTitle}>Beats ({beats.length})</Text>
      <FlatList
        data={beats}
        renderItem={renderBeat}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        testID="beats-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
