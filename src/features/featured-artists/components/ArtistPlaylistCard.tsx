import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';
import { type FeaturedArtist } from '../types';
import { AutoPlaylistBadge } from './AutoPlaylistBadge';
import { colors, spacing, typography, radii } from '@/theme';

export interface ArtistPlaylistCardProps {
  artist: FeaturedArtist;
  onPress?: () => void;
  testID?: string;
}

export function ArtistPlaylistCard({ artist, onPress, testID }: ArtistPlaylistCardProps) {
  const getCategoryLabel = () => {
    switch (artist.category) {
      case 'beatmaker':
        return 'Beatmaker';
      case 'mixer':
        return 'Mixeur';
      case 'producer':
        return 'Producteur';
      case 'studio':
        return 'Studio';
      case 'artist':
        return 'Artiste';
      default:
        return 'Artiste';
    }
  };

  const getStatsLabel = () => {
    const parts: string[] = [];
    if (artist.stats.sales) {
      parts.push(`${artist.stats.sales} ventes`);
    }
    if (artist.stats.bookings) {
      parts.push(`${artist.stats.bookings} réservations`);
    }
    return parts.join(' • ') || 'Aucune activité';
  };

  return (
    <Pressable onPress={onPress} style={styles.container} testID={testID}>
      <LinearGradient
        colors={[colors.surface, colors.surfaceElevated]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.badges}>
            {artist.isBoosted && <AutoPlaylistBadge type="boosted" />}
            {artist.isTop && <AutoPlaylistBadge type="top" />}
            {artist.isNewTalent && <AutoPlaylistBadge type="new" />}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.artistInfo}>
            {artist.avatar && <Image source={{ uri: artist.avatar }} style={styles.avatar} />}
            <View style={styles.artistDetails}>
              <Text style={styles.artistName}>{artist.artistName || artist.name}</Text>
              <Text style={styles.category}>{getCategoryLabel()}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            {artist.stats.rating && (
              <View style={styles.rating}>
                <Star size={14} color={colors.secondary} fill={colors.secondary} />
                <Text style={styles.ratingText}>{artist.stats.rating.toFixed(1)}</Text>
              </View>
            )}
            <Text style={styles.statsText}>{getStatsLabel()}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  gradient: {
    padding: spacing.md,
    borderRadius: radii.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: spacing.sm,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  content: {
    gap: spacing.sm,
  },
  artistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
  },
  artistDetails: {
    flex: 1,
  },
  artistName: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
  },
  category: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textMuted,
    marginTop: 2,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
  },
  statsText: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textSecondary,
  },
});
