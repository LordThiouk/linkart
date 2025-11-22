import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';
import { type FeaturedService } from '../types';
import { AutoPlaylistBadge } from '../../featured-artists/components/AutoPlaylistBadge';
import { colors, spacing, typography, radii } from '@/theme';

export interface ServicePlaylistCardProps {
  service: FeaturedService;
  onPress?: () => void;
  testID?: string;
}

export function ServicePlaylistCard({ service, onPress, testID }: ServicePlaylistCardProps) {
  const getCategoryLabel = () => {
    switch (service.category) {
      case 'mixing':
        return 'Mixing';
      case 'mastering':
        return 'Mastering';
      case 'recording':
        return 'Recording';
      case 'production':
        return 'Production';
      case 'coaching':
        return 'Coaching';
      case 'sound_design':
        return 'Sound Design';
      default:
        return 'Service';
    }
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
            {service.isBoosted && <AutoPlaylistBadge type="boosted" />}
            {service.isTop && <AutoPlaylistBadge type="top" />}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.providerInfo}>
            {service.provider.avatar && <Image source={{ uri: service.provider.avatar }} style={styles.avatar} />}
            <View style={styles.providerDetails}>
              <Text style={styles.providerName}>{service.provider.name}</Text>
              <Text style={styles.category}>{getCategoryLabel()}</Text>
            </View>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {service.title}
          </Text>

          <View style={styles.stats}>
            {service.stats.rating && (
              <View style={styles.rating}>
                <Star size={14} color={colors.secondary} fill={colors.secondary} />
                <Text style={styles.ratingText}>{service.stats.rating.toFixed(1)}</Text>
              </View>
            )}
            <Text style={styles.statsText}>{service.stats.bookings} réservations</Text>
            {service.stats.price && <Text style={styles.price}>{service.stats.price.toLocaleString()} FCFA</Text>}
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
  providerInfo: {
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
  providerDetails: {
    flex: 1,
  },
  providerName: {
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
  title: {
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
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
  price: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.primary,
    marginLeft: 'auto',
  },
});
