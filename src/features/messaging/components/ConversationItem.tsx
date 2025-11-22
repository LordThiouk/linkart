import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageWithFallback } from '@/components/atoms/ImageWithFallback';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ConversationItemProps {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  onPress?: () => void;
  index?: number;
}

export function ConversationItem({
  id,
  name,
  image,
  lastMessage,
  time,
  unread,
  online,
  onPress,
  index = 0,
}: ConversationItemProps) {
  return (
    <AnimatedTouchableOpacity
      entering={FadeInLeft.delay(index * 50)}
      onPress={onPress}
      style={styles.conversationCard}
      activeOpacity={0.9}
    >
      <View style={styles.conversationContent}>
        <View style={styles.conversationAvatarContainer}>
          <ImageWithFallback src={image} alt={name} style={styles.conversationAvatar} />
          {online && <View style={styles.onlineIndicator} />}
        </View>
        <View style={styles.conversationInfo}>
          <View style={styles.conversationHeader}>
            <Text style={styles.conversationName} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.conversationTime}>{time}</Text>
          </View>
          <View style={styles.conversationFooter}>
            <Text style={styles.conversationLastMessage} numberOfLines={1}>
              {lastMessage}
            </Text>
            {unread > 0 && (
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.unreadBadge}
              >
                <Text style={styles.unreadBadgeText}>{unread}</Text>
              </LinearGradient>
            )}
          </View>
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  conversationCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  conversationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs,
  },
  conversationAvatarContainer: {
    position: 'relative',
  },
  conversationAvatar: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: spacing.md - spacing.xs,
    height: spacing.md - spacing.xs,
    backgroundColor: colors.success,
    borderRadius: spacing.md / 2,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  conversationInfo: {
    flex: 1,
    gap: spacing.sm,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  conversationName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    flex: 1,
  },
  conversationTime: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  conversationFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  conversationLastMessage: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    flex: 1,
  },
  unreadBadge: {
    width: spacing.xl - spacing.xs,
    height: spacing.xl - spacing.xs,
    borderRadius: spacing.xl / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  unreadBadgeText: {
    color: colors.textPrimary,
    fontSize: 10,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
