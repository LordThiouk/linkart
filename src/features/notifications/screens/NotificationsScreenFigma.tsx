import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';
import { NotificationItem, NotificationEmptyState, NotificationsHeader } from '@/features/notifications/components';

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

export interface NotificationsScreenFigmaProps {
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
      <NotificationsHeader
        onBack={onBack}
        unreadCount={unreadCount}
        filter={filter}
        onFilterChange={setFilter}
        onMarkAllAsRead={markAllAsRead}
      />

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
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl, // 80px
  },
  notificationsList: {
    padding: spacing.md,
    gap: spacing.sm,
  },
});
