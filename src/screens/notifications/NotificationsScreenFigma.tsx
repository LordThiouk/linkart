import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ColorValue } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Heart, ShoppingCart, MessageCircle, UserPlus, Sparkles, CheckCheck } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';

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

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart size={20} color="#EC4899" />;
      case 'purchase':
        return <ShoppingCart size={20} color="#F59E0B" />;
      case 'comment':
        return <MessageCircle size={20} color="#06B6D4" />;
      case 'follow':
        return <UserPlus size={20} color="#6366F1" />;
      case 'system':
        return <Sparkles size={20} color="#8B5CF6" />;
    }
  };

  const getIconBg = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return ['rgba(236, 72, 153, 0.2)', 'rgba(236, 72, 153, 0.1)'];
      case 'purchase':
        return ['rgba(245, 158, 11, 0.2)', 'rgba(245, 158, 11, 0.1)'];
      case 'comment':
        return ['rgba(6, 182, 212, 0.2)', 'rgba(6, 182, 212, 0.1)'];
      case 'follow':
        return ['rgba(99, 102, 241, 0.2)', 'rgba(99, 102, 241, 0.1)'];
      case 'system':
        return ['rgba(139, 92, 246, 0.2)', 'rgba(139, 92, 246, 0.1)'];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              {onBack && (
                <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                  <ArrowLeft size={24} color="#D4D4D4" />
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
                <CheckCheck size={20} color="#6366F1" />
                <Text style={styles.markAllText}>Tout lire</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Tabs */}
          <View style={styles.filters}>
            <TouchableOpacity
              onPress={() => setFilter('all')}
              style={[styles.filterButton, filter === 'all' && styles.filterButtonSelected]}
              activeOpacity={0.8}
            >
              {filter === 'all' ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterButtonGradient}
                >
                  <Text style={styles.filterButtonTextSelected}>Toutes</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.filterButtonText}>Toutes</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilter('unread')}
              style={[styles.filterButton, filter === 'unread' && styles.filterButtonSelected]}
              activeOpacity={0.8}
            >
              {filter === 'unread' ? (
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.filterButtonGradient}
                >
                  <Text style={styles.filterButtonTextSelected}>Non lues</Text>
                  {unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                    </View>
                  )}
                </LinearGradient>
              ) : (
                <View style={styles.filterButtonContent}>
                  <Text style={styles.filterButtonText}>Non lues</Text>
                  {unreadCount > 0 && (
                    <View style={styles.unreadBadgeUnselected}>
                      <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                    </View>
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {filteredNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <CheckCheck size={40} color="#A3A3A3" />
            </View>
            <Text style={styles.emptyTitle}>Tout est lu !</Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'unread' ? "Vous n'avez aucune notification non lue" : "Vous n'avez aucune notification"}
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {filteredNotifications.map((notification, index) => (
              <AnimatedView
                key={notification.id}
                entering={FadeInLeft.delay(index * 50)}
                style={[
                  styles.notificationCard,
                  notification.read ? styles.notificationCardRead : styles.notificationCardUnread,
                ]}
              >
                <View style={styles.notificationContent}>
                  {notification.user ? (
                    <View style={styles.notificationAvatarContainer}>
                      <ImageWithFallback
                        src={notification.user.image}
                        alt={notification.user.name}
                        style={styles.notificationAvatar}
                      />
                      <LinearGradient
                        colors={getIconBg(notification.type) as [ColorValue, ColorValue]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.notificationIconBadge}
                      >
                        {getIcon(notification.type)}
                      </LinearGradient>
                    </View>
                  ) : (
                    <LinearGradient
                      colors={getIconBg(notification.type) as [ColorValue, ColorValue, ...ColorValue[]]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.notificationIconContainer}
                    >
                      {getIcon(notification.type)}
                    </LinearGradient>
                  )}

                  <View style={styles.notificationInfo}>
                    <View style={styles.notificationHeader}>
                      <Text style={styles.notificationMessage} numberOfLines={2}>
                        {notification.user && (
                          <Text style={styles.notificationUserName}>{notification.user.name} </Text>
                        )}
                        <Text style={styles.notificationMessageText}>{notification.message}</Text>
                      </Text>
                      {!notification.read && (
                        <LinearGradient
                          colors={['#6366F1', '#8B5CF6']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={styles.unreadDot}
                        />
                      )}
                    </View>

                    {notification.metadata?.beatTitle && (
                      <Text style={styles.notificationBeatTitle}>"{notification.metadata.beatTitle}"</Text>
                    )}

                    <View style={styles.notificationFooter}>
                      <Text style={styles.notificationTime}>{notification.time}</Text>
                      {notification.metadata?.amount && (
                        <>
                          <Text style={styles.notificationSeparator}>•</Text>
                          <Text style={styles.notificationAmount}>+€{notification.metadata.amount}</Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 12,
  },
  markAllText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    overflow: 'hidden',
  },
  filterButtonSelected: {
    borderWidth: 0,
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButtonText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  filterButtonTextSelected: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  unreadBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: '#EC4899',
  },
  unreadBadgeUnselected: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: '#EC4899',
  },
  unreadBadgeText: {
    color: '#F5F5F5',
    fontSize: 11,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  notificationsList: {
    padding: 16,
    gap: 8,
  },
  notificationCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  notificationCardRead: {
    backgroundColor: '#111111',
    borderColor: '#404040',
  },
  notificationCardUnread: {
    backgroundColor: '#1A1A1A',
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  notificationContent: {
    flexDirection: 'row',
    gap: 12,
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
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#0A0A0A',
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
    gap: 8,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 4,
  },
  notificationMessage: {
    flex: 1,
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '400',
  },
  notificationUserName: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '600',
  },
  notificationMessageText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  notificationBeatTitle: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notificationTime: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  notificationSeparator: {
    color: '#404040',
    fontSize: 12,
  },
  notificationAmount: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    maxWidth: 300,
  },
});
