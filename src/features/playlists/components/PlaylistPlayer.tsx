import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

export interface PlaylistPlayerProps {
  currentBeat?: {
    id: string;
    title: string;
    artist: string;
    coverImage?: string;
  };
  isPlaying: boolean;
  progress?: number;
  duration?: string;
  currentTime?: string;
  isShuffled?: boolean;
  repeatMode?: 'off' | 'one' | 'all';
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  onSeek?: (position: number) => void;
  testID?: string;
}

export function PlaylistPlayer({
  currentBeat,
  isPlaying,
  progress = 0,
  duration = '0:00',
  currentTime = '0:00',
  isShuffled = false,
  repeatMode = 'off',
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  testID,
}: PlaylistPlayerProps) {
  if (!currentBeat) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      <LinearGradient
        colors={[colors.surface, colors.surfaceElevated]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Current Beat Info */}
          <View style={styles.beatInfo}>
            {currentBeat.coverImage ? (
              <ImageWithFallback src={currentBeat.coverImage} alt={currentBeat.title} style={styles.artwork} />
            ) : (
              <View style={styles.artworkPlaceholder} />
            )}
            <View style={styles.textInfo}>
              <Text style={styles.title} numberOfLines={1}>
                {currentBeat.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {currentBeat.artist}
              </Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <View style={styles.mainControls}>
              {onShuffle && (
                <TouchableOpacity
                  onPress={onShuffle}
                  style={[styles.controlButton, isShuffled && styles.controlButtonActive]}
                  activeOpacity={0.8}
                  testID="shuffle-button"
                >
                  <Shuffle size={18} color={isShuffled ? colors.primary : colors.textMuted} />
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={onPrevious}
                style={styles.controlButton}
                activeOpacity={0.8}
                testID="previous-button"
              >
                <SkipBack size={20} color={colors.textPrimary} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onPlayPause}
                style={styles.playButton}
                activeOpacity={0.9}
                testID="play-pause-button"
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.playButtonGradient}
                >
                  {isPlaying ? (
                    <Pause size={24} color={colors.textPrimary} fill={colors.textPrimary} />
                  ) : (
                    <Play size={24} color={colors.textPrimary} fill={colors.textPrimary} />
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={onNext} style={styles.controlButton} activeOpacity={0.8} testID="next-button">
                <SkipForward size={20} color={colors.textPrimary} />
              </TouchableOpacity>

              {onRepeat && (
                <TouchableOpacity
                  onPress={onRepeat}
                  style={[styles.controlButton, repeatMode !== 'off' && styles.controlButtonActive]}
                  activeOpacity={0.8}
                  testID="repeat-button"
                >
                  <Repeat size={18} color={repeatMode !== 'off' ? colors.primary : colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <Text style={styles.timeText}>{currentTime}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <Text style={styles.timeText}>{duration}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  gradient: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  content: {
    gap: spacing.md,
  },
  beatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
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
  textInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  artist: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  controls: {
    gap: spacing.md,
  },
  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  controlButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
  },
  controlButtonActive: {
    backgroundColor: colors.surface,
  },
  playButton: {
    borderRadius: radii.full,
    overflow: 'hidden',
  },
  playButtonGradient: {
    width: spacing.xxl * 2,
    height: spacing.xxl * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  timeText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    minWidth: 40,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceElevated,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
