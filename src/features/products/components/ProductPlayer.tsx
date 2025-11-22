import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause } from 'lucide-react-native';
import { WaveformVisualizer } from '@/components/molecules/WaveformVisualizer';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProductPlayerProps {
  title: string;
  artist: string;
  artistImage: string;
  isPlaying: boolean;
  duration: string;
  currentTime?: string;
  onTogglePlay: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function ProductPlayer({
  title,
  artist,
  artistImage,
  isPlaying,
  duration,
  currentTime = '0:00',
  onTogglePlay,
  style,
  testID,
}: ProductPlayerProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.titleRow}>
        <TouchableOpacity onPress={onTogglePlay} style={styles.playButton} activeOpacity={0.9} testID="play-button">
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.playButtonGradient}
          >
            {isPlaying ? (
              <Pause size={32} color={colors.textPrimary} fill={colors.textPrimary} />
            ) : (
              <Play size={32} color={colors.textPrimary} fill={colors.textPrimary} />
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.titleContent}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.artistRow}>
            <ImageWithFallback src={artistImage} alt={artist} style={styles.artistImage} />
            <Text style={styles.artist}>{artist}</Text>
          </View>
        </View>
      </View>

      {/* Waveform */}
      <View style={styles.waveformContainer}>
        <WaveformVisualizer isPlaying={isPlaying} bars={80} height={60} />
        <View style={styles.waveformTime}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.timeText}>{duration}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    position: 'relative',
    zIndex: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: radii.full,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: spacing.sm },
    shadowOpacity: 0.5,
    shadowRadius: spacing.md,
    elevation: 12,
  },
  playButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContent: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  artistImage: {
    width: 24,
    height: 24,
    borderRadius: radii.md,
  },
  artist: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  waveformContainer: {
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  waveformTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  timeText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
