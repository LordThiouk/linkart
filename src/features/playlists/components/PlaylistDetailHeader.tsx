import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Play, Shuffle } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

export interface PlaylistDetailHeaderProps {
  coverImage?: string;
  title: string;
  description?: string;
  beatCount: number;
  duration?: string;
  typebeat?: string;
  ambiance?: string;
  onBack?: () => void;
  onPlayAll?: () => void;
  onShuffle?: () => void;
  onShare?: () => void;
  testID?: string;
}

export function PlaylistDetailHeader({
  coverImage,
  title,
  description,
  beatCount,
  duration,
  typebeat,
  ambiance,
  onBack,
  onPlayAll,
  onShuffle,
  onShare,
  testID,
}: PlaylistDetailHeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      {/* Back button */}
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8} testID="back-button">
          <ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      )}

      {/* Cover Image */}
      <View style={styles.coverContainer}>
        {coverImage ? (
          <ImageWithFallback src={coverImage} alt={title} style={styles.coverImage} />
        ) : (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.coverGradient}
          />
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <View style={styles.meta}>
          {typebeat && <Text style={styles.metaText}>{typebeat}</Text>}
          {ambiance && <Text style={styles.metaText}>• {ambiance}</Text>}
          <Text style={styles.metaText}>• {beatCount} beats</Text>
          {duration && <Text style={styles.metaText}>• {duration}</Text>}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {onPlayAll && (
          <TouchableOpacity onPress={onPlayAll} style={styles.playButton} activeOpacity={0.9} testID="play-all-button">
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.playButtonGradient}
            >
              <Play size={20} color={colors.textPrimary} fill={colors.textPrimary} />
              <Text style={styles.playButtonText}>Tout lire</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {onShuffle && (
          <TouchableOpacity
            onPress={onShuffle}
            style={styles.shuffleButton}
            activeOpacity={0.8}
            testID="shuffle-button"
          >
            <Shuffle size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
        {onShare && (
          <TouchableOpacity onPress={onShare} style={styles.shareButton} activeOpacity={0.8} testID="share-button">
            <Share2 size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  backButton: {
    position: 'absolute',
    top: spacing.lg,
    left: spacing.lg,
    zIndex: 1,
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  coverContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: radii.lg,
    overflow: 'hidden',
    marginTop: spacing.xl,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    width: '100%',
    height: '100%',
  },
  info: {
    gap: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'center',
  },
  playButton: {
    flex: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  playButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  playButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  shuffleButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shareButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
