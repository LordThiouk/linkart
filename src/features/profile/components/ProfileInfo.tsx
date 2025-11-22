import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Edit, LucideIcon } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

export interface ProfileStats {
  followers: number;
  following: number;
}

export interface ProfileInfoProps {
  avatarUrl: string;
  name: string;
  handle: string;
  bio?: string;
  location?: string;
  stats: ProfileStats;
  badgeIcon?: LucideIcon;
  badgeLabel?: string;
  onEdit?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function ProfileInfo({
  avatarUrl,
  name,
  handle,
  bio,
  location,
  stats,
  badgeIcon: BadgeIcon,
  onEdit,
  style,
  testID,
}: ProfileInfoProps) {
  const fullBio = [bio, location].filter(Boolean).join('\n');

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.profileRow}>
        <View style={styles.avatarContainer}>
          <ImageWithFallback src={avatarUrl} alt={name} style={styles.avatar} />
          {BadgeIcon && (
            <View style={styles.avatarBadge}>
              <LinearGradient
                colors={[colors.secondary, colors.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.badgeGradient}
              >
                <BadgeIcon size={16} color={colors.textPrimary} />
              </LinearGradient>
            </View>
          )}
        </View>

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.handle}>{handle}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Abonnés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.following.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Abonnements</Text>
            </View>
          </View>
        </View>
      </View>

      {fullBio && <Text style={styles.bio}>{fullBio}</Text>}

      {onEdit && (
        <View style={styles.editButtonContainer}>
          <PrimaryButton style={styles.editButton} onPress={onEdit}>
            <Edit size={20} color={colors.textPrimary} />
            <Text style={styles.editButtonText}>Modifier le profil</Text>
          </PrimaryButton>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: radii.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.background,
  },
  badgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  handle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  statItem: {
    alignItems: 'flex-start',
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  bio: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  editButtonContainer: {
    marginTop: spacing.sm,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  editButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
