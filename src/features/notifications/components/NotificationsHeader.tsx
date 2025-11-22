import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, CheckCheck } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';
import { NotificationTabs } from './NotificationTabs';

interface NotificationsHeaderProps {
  onBack?: () => void;
  unreadCount: number;
  filter: 'all' | 'unread';
  onFilterChange: (filter: 'all' | 'unread') => void;
  onMarkAllAsRead: () => void;
}

export function NotificationsHeader({
  onBack,
  unreadCount,
  filter,
  onFilterChange,
  onMarkAllAsRead,
}: NotificationsHeaderProps) {
  return (
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
            <TouchableOpacity onPress={onMarkAllAsRead} style={styles.markAllButton} activeOpacity={0.8}>
              <CheckCheck size={20} color={colors.primary} />
              <Text style={styles.markAllText}>Tout lire</Text>
            </TouchableOpacity>
          )}
        </View>

        <NotificationTabs filter={filter} unreadCount={unreadCount} onChange={onFilterChange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
