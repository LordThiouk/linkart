import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/theme';

export interface WalletHeaderProps {
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
  testID?: string;
}

export function WalletHeader({ title = 'Wallet', subtitle = 'Gérez vos revenus', style, testID }: WalletHeaderProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.content}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: spacing.xl + spacing.lg,
    paddingBottom: spacing.lg,
  },
  content: {
    paddingHorizontal: spacing.xl,
  },
  left: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
