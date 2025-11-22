import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

interface FavoritesHeaderProps {
  onBack: () => void;
  favoritesCount: number;
}

export function FavoritesHeader({ onBack, favoritesCount }: FavoritesHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.9}>
          <View style={styles.backButtonInner}>
            <ArrowLeft size={20} color={colors.textSecondary} />
          </View>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <View style={styles.headerTitleRow}>
            <Heart size={24} color={colors.accent} fill={colors.accent} />
            <Text style={styles.headerTitle}>Mes Favoris</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            {favoritesCount} beat{favoritesCount > 1 ? 's' : ''} sauvegardé{favoritesCount > 1 ? 's' : ''}
          </Text>
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
    marginBottom: spacing.md,
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
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginTop: spacing.xs,
  },
});
