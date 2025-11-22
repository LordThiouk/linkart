import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Pause, Heart } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

export interface PlaylistBeatItemProps {
  position: number;
  title: string;
  artist: string;
  coverImage?: string;
  duration: string;
  price: number;
  isPurchased?: boolean;
  isFavorite?: boolean;
  isCurrentBeat?: boolean;
  isPlaying?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
  onBuy?: () => void;
  testID?: string;
}

export function PlaylistBeatItem({
  position,
  title,
  artist,
  coverImage,
  duration,
  price,
  isPurchased = false,
  isFavorite = false,
  isCurrentBeat = false,
  isPlaying = false,
  onPress,
  onToggleFavorite,
  onBuy,
  testID,
}: PlaylistBeatItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isCurrentBeat && styles.currentBeat]}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      <View style={styles.position}>
        {isCurrentBeat && isPlaying ? (
          <Pause size={16} color={colors.primary} />
        ) : (
          <Text style={[styles.positionText, isCurrentBeat && styles.positionTextActive]}>{position}</Text>
        )}
      </View>

      {coverImage ? (
        <ImageWithFallback src={coverImage} alt={title} style={styles.artwork} />
      ) : (
        <View style={styles.artworkPlaceholder} />
      )}

      <View style={styles.info}>
        <Text style={[styles.title, isCurrentBeat && styles.titleActive]} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist}
        </Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>

      <View style={styles.actions}>
        {onToggleFavorite && (
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            style={styles.heartButton}
            activeOpacity={0.8}
            testID="favorite-button"
          >
            <Heart
              size={20}
              color={isFavorite ? colors.accent : colors.textMuted}
              fill={isFavorite ? colors.accent : 'transparent'}
            />
          </TouchableOpacity>
        )}

        {!isPurchased && onBuy && (
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              onBuy();
            }}
            style={styles.buyButton}
            activeOpacity={0.8}
            testID="buy-button"
          >
            <Text style={styles.buyButtonText}>{price.toLocaleString()} F</Text>
          </TouchableOpacity>
        )}

        {isPurchased && (
          <TouchableOpacity
            onPress={e => {
              e.stopPropagation();
              onPress();
            }}
            style={styles.playButton}
            activeOpacity={0.8}
            testID="play-button"
          >
            {isPlaying ? <Pause size={16} color={colors.textPrimary} /> : <Play size={16} color={colors.textPrimary} />}
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  currentBeat: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.primary,
  },
  position: {
    width: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  positionTextActive: {
    color: colors.primary,
  },
  artwork: {
    width: spacing.xxl * 2,
    height: spacing.xxl * 2,
    borderRadius: radii.md,
  },
  artworkPlaceholder: {
    width: spacing.xxl * 2,
    height: spacing.xxl * 2,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
  },
  info: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  titleActive: {
    color: colors.primary,
  },
  artist: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  duration: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  heartButton: {
    padding: spacing.xs,
  },
  buyButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
  },
  buyButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  playButton: {
    padding: spacing.xs,
    borderRadius: radii.sm,
    backgroundColor: colors.primary,
  },
});
