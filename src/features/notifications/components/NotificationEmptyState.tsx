import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCheck } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface NotificationEmptyStateProps {
  filter: 'all' | 'unread';
}

export function NotificationEmptyState({ filter }: NotificationEmptyStateProps) {
  const title = filter === 'unread' ? 'Tout est lu !' : 'Aucune notification';
  const subtitle =
    filter === 'unread'
      ? "Vous n'avez aucune notification non lue"
      : "Vous n'avez pas encore de notification. Continuez à créer et collaborer !";

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <CheckCheck size={40} color={colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
});
