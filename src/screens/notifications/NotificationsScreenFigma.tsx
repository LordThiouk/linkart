import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CheckCheck } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';
import { NotificationTabs, NotificationEmptyState, NotificationItem } from '@/features/notifications/components';

const AnimatedView = Animated.createAnimatedComponent(View);

interface Notification {
  id: string;
  type: 'like' | 'purchase' | 'comment' | 'follow' | 'system';
  user?: {
    name: string;
    image: string;
  };
  message: string;
  time: string;
  read: boolean;
  metadata?: {
    beatTitle?: string;
    amount?: number;
  };
}

interface NotificationsScreenFigmaProps {
  onBack?: () => void;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'purchase',
    user: {
      name: 'Marcus Johnson',
      image: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    },
    message: 'a acheté votre beat',
    time: 'Il y a 5 min',
    read: false,
    metadata: {
      beatTitle: 'Midnight Vibes',
      amount: 29.99,
    },
  },
  {
    id: '2',
    type: 'like',
    user: {
      name: 'Sarah Miller',
      image: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    },
    message: 'a aimé votre beat',
    time: 'Il y a 15 min',
    read: false,
    metadata: {
      beatTitle: 'Summer Dreams',
    },
  },
  {
    id: '3',
    type: 'follow',
    user: {
      name: 'DJ Alex',
      image: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    },
    message: 'a commencé à vous suivre',
    time: 'Il y a 1 heure',
    read: false,
  },
  {
    id: '4',
    type: 'comment',
    user: {
      name: 'BeatMaker Pro',
      image: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    },
    message: 'a commenté: "Fire beat! 🔥"',
    time: 'Il y a 2 heures',
    read: true,
    metadata: {
      beatTitle: 'Dark Energy',
    },
  },
  {
    id: '5',
    type: 'system',
    message: 'Votre beat "Midnight Vibes" a atteint 1000 écoutes!',
    time: 'Il y a 3 heures',
    read: true,
  },
  {
    id: '6',
    type: 'like',
    user: {
      name: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1692176548571-86138128e36c?w=100',
    },
    message: 'et 12 autres ont aimé votre beat',
    time: 'Hier',
    read: true,
    metadata: {
      beatTitle: 'Urban Flow',
    },
  },
  {
    id: '7',
    type: 'purchase',
    user: {
      name: 'Chris Davis',
      image: 'https://images.unsplash.com/photo-1621976498727-9e5d56476276?w=100',
    },
    message: 'a acheté la licence Premium',
    time: 'Hier',
    read: true,
    metadata: {
      beatTitle: 'Electric Wave',
      amount: 49.99,
    },
  },
];

export function NotificationsScreenFigma({ onBack }: NotificationsScreenFigmaProps) {
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = filter === 'unread' ? notificationsList.filter(n => !n.read) : notificationsList;

  const unreadCount = notificationsList.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                  <ArrowLeft size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Notifications</Text>
                {unreadCount > 0 && (
                  <Text style={styles.headerSubtitle}>
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </Text>
                )}
              </View>
            </View>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton} activeOpacity={0.8}>
                <CheckCheck size={20} color={colors.primary} />
                <Text style={styles.markAllText}>Tout lire</Text>
              </TouchableOpacity>
            )}
          </View>

          <NotificationTabs filter={filter} unreadCount={unreadCount} onChange={setFilter} />
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {filteredNotifications.length === 0 ? (
          <NotificationEmptyState filter={filter} />
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification, index) => (
              <AnimatedView key={notification.id} entering={FadeInLeft.delay(index * 50)}>
                <NotificationItem
                  type={notification.type}
                  userName={notification.user?.name}
                  userImage={notification.user?.image}
                  message={notification.message}
                  time={notification.time}
                  read={notification.read}
                  beatTitle={notification.metadata?.beatTitle}
                  amount={
                    notification.metadata?.amount !== undefined
                      ? Math.round(notification.metadata.amount * 1000)
                      : undefined
                  }
                />
              </AnimatedView>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl + spacing.lg, // 48px
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4, // 28px
    fontFamily: typography.fontFamily.poppins.bold,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radii.md,
  },
  markAllText: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  filterButtonSelected: {
    borderWidth: 0,
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  filterButtonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filterButtonTextSelected: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  unreadBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.md,
    backgroundColor: colors.accent,
  },
  unreadBadgeUnselected: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radii.md,
    backgroundColor: colors.accent,
  },
  unreadBadgeText: {
    color: colors.textPrimary,
    fontSize: 11,
    fontFamily: typography.fontFamily.inter.medium,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl, // 80px
  },
  notificationsList: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  notificationCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
  },
  notificationCardRead: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  notificationCardUnread: {
    backgroundColor: colors.surfaceElevated,
    borderColor: hexToRgba(colors.primary, 0.3),
  },
  notificationContent: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs, // 12px
  },
  notificationAvatarContainer: {
    position: 'relative',
  },
  notificationAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  notificationIconBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: spacing.lg / 2, // 12px (half of width/height for perfect circle)
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  notificationMessage: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  notificationUserName: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  notificationMessageText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  unreadDot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: spacing.sm / 2, // 4px (half of width/height for perfect circle)
    marginTop: spacing.xs,
  },
  notificationBeatTitle: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  notificationTime: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  notificationSeparator: {
    color: colors.border,
    fontSize: typography.fontSize.caption,
  },
  notificationAmount: {
    color: colors.secondary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl * 2 + spacing.xl, // 64px
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
    maxWidth: 300,
  },
});
