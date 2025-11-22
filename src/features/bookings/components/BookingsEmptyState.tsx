import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface BookingsEmptyStateProps {
  title?: string;
  subtitle?: string;
}

export function BookingsEmptyState({
  title = 'Aucune réservation',
  subtitle = 'Vos réservations de services apparaîtront ici',
}: BookingsEmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Calendar size={40} color={colors.border} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.xxl * 2 + spacing.xl * 2, // h-64 (256px)
    paddingHorizontal: spacing.lg, // px-6
    gap: spacing.md, // gap-4
  },
  icon: {
    width: spacing.xl * 2, // w-20 (80px)
    height: spacing.xl * 2, // h-20 (80px)
    borderRadius: radii.full, // rounded-full (40px)
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md, // mb-4
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd, // 20px
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm, // mb-2
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
});
