import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, ShoppingCart, MessageCircle, UserPlus, Sparkles } from 'lucide-react-native';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

export type NotificationType = 'like' | 'purchase' | 'comment' | 'follow' | 'system';

const TYPE_CONFIG: Record<NotificationType, { icon: React.ReactNode; gradient: [string, string]; accent: string }> = {
  like: {
    icon: <Heart size={18} color={colors.accent} />,
    gradient: [hexToRgba(colors.accent, 0.25), hexToRgba(colors.accent, 0.1)],
    accent: colors.accent,
  },
  purchase: {
    icon: <ShoppingCart size={18} color={colors.secondary} />,
    gradient: [hexToRgba(colors.secondary, 0.25), hexToRgba(colors.secondary, 0.1)],
    accent: colors.secondary,
  },
  comment: {
    icon: <MessageCircle size={18} color={colors.cyan} />,
    gradient: [hexToRgba(colors.cyan, 0.25), hexToRgba(colors.cyan, 0.1)],
    accent: colors.cyan,
  },
  follow: {
    icon: <UserPlus size={18} color={colors.primary} />,
    gradient: [hexToRgba(colors.primary, 0.25), hexToRgba(colors.primary, 0.1)],
    accent: colors.primary,
  },
  system: {
    icon: <Sparkles size={18} color={colors.primaryDark} />,
    gradient: [hexToRgba(colors.primaryDark, 0.25), hexToRgba(colors.primaryDark, 0.1)],
    accent: colors.primaryDark,
  },
};

export interface NotificationItemProps {
  type: NotificationType;
  message: string;
  time: string;
  read?: boolean;
  userName?: string;
  userImage?: string;
  beatTitle?: string;
  amount?: number;
}

export function NotificationItem({
  type,
  message,
  time,
  read = false,
  userName,
  userImage,
  beatTitle,
  amount,
}: NotificationItemProps) {
  const config = TYPE_CONFIG[type];

  return (
    <View style={[styles.card, read ? styles.cardRead : styles.cardUnread]}>
      <View style={styles.leading}>
        {userImage ? (
          <View style={styles.avatarWrapper}>
            <ImageWithFallback src={userImage} alt={userName ?? 'user'} style={styles.avatar} />
            <LinearGradient
              colors={config.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconBadge}
            >
              {config.icon}
            </LinearGradient>
          </View>
        ) : (
          <LinearGradient colors={config.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.iconOnly}>
            {config.icon}
          </LinearGradient>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.messageRow}>
          <Text style={styles.message} numberOfLines={2}>
            {userName && <Text style={styles.userName}>{userName} </Text>}
            <Text style={styles.messageText}>{message}</Text>
          </Text>
          {!read && (
            <LinearGradient
              colors={[colors.primary, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.unreadDot}
            />
          )}
        </View>

        {beatTitle && <Text style={styles.beatTitle}>"{beatTitle}"</Text>}

        <View style={styles.footer}>
          <Text style={styles.time}>{time}</Text>
          {amount !== undefined && (
            <View style={styles.amountBadge}>
              <Text style={[styles.amountText, { color: config.accent }]}>+{amount.toLocaleString()} FCFA</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardUnread: {
    backgroundColor: hexToRgba(colors.primary, 0.06),
  },
  cardRead: {
    backgroundColor: colors.surface,
  },
  leading: {
    width: 56,
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: radii.full,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: radii.full,
  },
  iconBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  iconOnly: {
    width: 56,
    height: 56,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  messageRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  message: {
    flex: 1,
    color: colors.textPrimary,
  },
  userName: {
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  messageText: {
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textPrimary,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: radii.full,
  },
  beatTitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  time: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
  },
  amountBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
  },
  amountText: {
    fontFamily: typography.fontFamily.inter.medium,
    fontSize: typography.fontSize.label,
  },
});
