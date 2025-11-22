import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, ShoppingCart } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

interface CheckoutHeaderProps {
  onBack: () => void;
}

export function CheckoutHeader({ onBack }: CheckoutHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.9}>
          <View style={styles.backButtonInner}>
            <ArrowLeft size={20} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <ShoppingCart size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>Finaliser l'achat</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: hexToRgba(colors.background, 0.95),
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
  },
});
