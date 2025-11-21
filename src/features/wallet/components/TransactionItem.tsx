import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export type TransactionType = 'income' | 'withdraw';
export type TransactionStatus = 'completed' | 'pending';

export interface TransactionItemProps {
  id: string;
  type: TransactionType;
  title: string;
  amount: number;
  date: string;
  status: TransactionStatus;
  style?: ViewStyle;
  testID?: string;
}

export function TransactionItem({ id, type, title, amount, date, status, style, testID }: TransactionItemProps) {
  const Icon = type === 'income' ? ArrowDownLeft : ArrowUpRight;
  const iconColor = type === 'income' ? colors.success : colors.secondary;
  const amountColor = amount > 0 ? colors.success : colors.textPrimary;
  const statusBg = status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)';
  const statusTextColor = status === 'completed' ? colors.success : colors.secondary;
  const iconBg = type === 'income' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)';

  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.row}>
        <View style={[styles.icon, { backgroundColor: iconBg }]}>
          <Icon size={20} color={iconColor} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.right}>
          <Text style={[styles.amount, { color: amountColor }]}>
            {amount > 0 ? '+' : ''}
            {Math.abs(amount).toLocaleString()} F
          </Text>
          <View style={[styles.status, { backgroundColor: statusBg }]}>
            <Text style={[styles.statusText, { color: statusTextColor }]}>
              {status === 'completed' ? 'Terminé' : 'En attente'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  icon: {
    width: spacing.xl * 1.5,
    height: spacing.xl * 1.5,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  date: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  status: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 2,
    borderRadius: radii.full,
  },
  statusText: {
    fontSize: typography.fontSize.caption - 2,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
