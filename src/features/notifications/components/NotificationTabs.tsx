import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

export type NotificationFilter = 'all' | 'unread';

interface NotificationTabsProps {
  filter: NotificationFilter;
  unreadCount: number;
  onChange: (filter: NotificationFilter) => void;
}

export function NotificationTabs({ filter, unreadCount, onChange }: NotificationTabsProps) {
  return (
    <View style={styles.container}>
      <TabButton active={filter === 'all'} label="Toutes" onPress={() => onChange('all')} badge={0} />
      <TabButton active={filter === 'unread'} label="Non lues" onPress={() => onChange('unread')} badge={unreadCount} />
    </View>
  );
}

interface TabButtonProps {
  active: boolean;
  label: string;
  badge: number;
  onPress: () => void;
}

const TabButton = ({ active, label, badge, onPress }: TabButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, active && styles.buttonActive]} onPress={onPress} activeOpacity={0.85}>
      {active ? (
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.activeLabel}>{label}</Text>
          {badge > 0 && (
            <View style={styles.badgeActive}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </LinearGradient>
      ) : (
        <View style={styles.inactiveContent}>
          <Text style={styles.inactiveLabel}>{label}</Text>
          {badge > 0 && (
            <View style={styles.badgeInactive}>
              <Text style={styles.badgeInactiveText}>{badge}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const BADGE_PADDING = spacing.xs / 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    borderRadius: radii.lg,
  },
  buttonActive: {
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  gradient: {
    borderRadius: radii.lg,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  inactiveContent: {
    borderRadius: radii.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
  },
  activeLabel: {
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.poppins.semibold,
    fontSize: typography.fontSize.label,
  },
  inactiveLabel: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.poppins.medium,
    fontSize: typography.fontSize.label,
  },
  badgeActive: {
    marginTop: spacing.xs / 2,
    minWidth: 22,
    paddingHorizontal: spacing.xs,
    paddingVertical: BADGE_PADDING / 2,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.primary,
    fontFamily: typography.fontFamily.inter.medium,
    fontSize: typography.fontSize.caption,
  },
  badgeInactive: {
    minWidth: 22,
    paddingHorizontal: spacing.xs,
    paddingVertical: BADGE_PADDING / 2,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeInactiveText: {
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.inter.medium,
    fontSize: typography.fontSize.caption,
  },
});
