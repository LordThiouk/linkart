import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Heart, ShoppingCart, MessageCircle, UserPlus, Sparkles, CheckCheck } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NotificationsScreenProps {
  onBack: () => void;
}

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

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
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
        return <Heart className="w-5 h-5 text-[#EC4899]" />;
      case 'purchase':
        return <ShoppingCart className="w-5 h-5 text-[#F59E0B]" />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-[#06B6D4]" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-[#6366F1]" />;
      case 'system':
        return <Sparkles className="w-5 h-5 text-[#8B5CF6]" />;
    }
  };

  const getIconBg = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'from-[#EC4899]/20 to-[#EC4899]/10';
      case 'purchase':
        return 'from-[#F59E0B]/20 to-[#F59E0B]/10';
      case 'comment':
        return 'from-[#06B6D4]/20 to-[#06B6D4]/10';
      case 'follow':
        return 'from-[#6366F1]/20 to-[#6366F1]/10';
      case 'system':
        return 'from-[#8B5CF6]/20 to-[#8B5CF6]/10';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="p-2 rounded-xl hover:bg-[#1A1A1A] transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-[#D4D4D4]" />
              </motion.button>

              <div>
                <h1 className="text-[#F5F5F5]">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-[#A3A3A3]">
                    {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {unreadCount > 0 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={markAllAsRead}
                className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors flex items-center gap-2"
              >
                <CheckCheck className="w-5 h-5" />
                Tout lire
              </motion.button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                  : 'bg-[#111111] text-[#A3A3A3] hover:text-[#D4D4D4]'
              }`}
            >
              Toutes
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                  : 'bg-[#111111] text-[#A3A3A3] hover:text-[#D4D4D4]'
              }`}
            >
              Non lues
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#EC4899] text-[#F5F5F5]" style={{ fontSize: '11px' }}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 mb-4 rounded-full bg-[#111111] flex items-center justify-center">
              <CheckCheck className="w-10 h-10 text-[#A3A3A3]" />
            </div>
            <h3 className="text-[#F5F5F5] mb-2">Tout est lu !</h3>
            <p className="text-[#A3A3A3] max-w-sm">
              {filter === 'unread' ? "Vous n'avez aucune notification non lue" : "Vous n'avez aucune notification"}
            </p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  notification.read
                    ? 'bg-[#111111] border-[#404040] hover:bg-[#1A1A1A]'
                    : 'bg-[#1A1A1A] border-[#6366F1]/30 hover:bg-[#1F1F1F]'
                }`}
              >
                <div className="flex gap-3">
                  {notification.user ? (
                    <div className="relative">
                      <ImageWithFallback
                        src={notification.user.image}
                        alt={notification.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${getIconBg(notification.type)} flex items-center justify-center border-2 border-[#0A0A0A]`}
                      >
                        {getIcon(notification.type)}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${getIconBg(notification.type)} flex items-center justify-center`}
                    >
                      {getIcon(notification.type)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-[#F5F5F5]">
                        {notification.user && <span className="text-[#D4D4D4]">{notification.user.name} </span>}
                        <span className="text-[#A3A3A3]">{notification.message}</span>
                      </p>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex-shrink-0 mt-2" />
                      )}
                    </div>

                    {notification.metadata?.beatTitle && (
                      <p className="text-[#6366F1] mb-1">"{notification.metadata.beatTitle}"</p>
                    )}

                    <div className="flex items-center gap-2">
                      <p className="text-[#A3A3A3]">{notification.time}</p>
                      {notification.metadata?.amount && (
                        <>
                          <span className="text-[#404040]">•</span>
                          <p className="text-[#F59E0B]">+€{notification.metadata.amount}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
