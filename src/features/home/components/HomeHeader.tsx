import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, Bell, MessageCircle } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface HomeHeaderProps {
  onSearch?: () => void;
  onNotifications?: () => void;
  onMessages?: () => void;
}

export function HomeHeader({ onSearch, onNotifications, onMessages }: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Découvrir</Text>
          <Text style={styles.headerSubtitle}>Trouvez votre prochain hit</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={onSearch} style={styles.headerButton} activeOpacity={0.8}>
            <Search size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          {onMessages && (
            <TouchableOpacity onPress={onMessages} style={styles.headerButton} activeOpacity={0.8}>
              <MessageCircle size={20} color={colors.textSecondary} />
              <View style={styles.badge} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onNotifications} style={styles.headerButton} activeOpacity={0.8}>
            <Bell size={20} color={colors.textSecondary} />
            <View style={[styles.badge, styles.badgeOrange]} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radii.sm / 2,
    backgroundColor: colors.cyan,
  },
  badgeOrange: {
    backgroundColor: colors.accent,
  },
});
