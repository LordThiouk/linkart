import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { TransactionItem, TransactionItemProps } from './TransactionItem';
import { colors, spacing, typography } from '@/theme';

export interface TransactionListProps {
  transactions: TransactionItemProps[];
  title?: string;
  showSeeAll?: boolean;
  onSeeAll?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function TransactionList({
  transactions,
  title = 'Transactions récentes',
  showSeeAll = true,
  onSeeAll,
  style,
  testID,
}: TransactionListProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {showSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.8}>
            <Text style={styles.seeAllLink}>Voir tout</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.list}>
        {transactions.map((transaction, index) => (
          <TransactionItem key={transaction.id} {...transaction} testID={`transaction-${index}`} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  seeAllLink: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  list: {
    gap: spacing.md,
  },
});
