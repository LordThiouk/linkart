import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
  testID?: string;
}

export function FilterSection({ title, children, onClear, showClear, testID }: FilterSectionProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.label}>{title}</Text>
        {showClear && onClear && (
          <TouchableOpacity onPress={onClear} testID="clear-button">
            <Text style={styles.clear}>Effacer</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md - spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md - spacing.xs,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  clear: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
