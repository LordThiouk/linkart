import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface MarketplaceHeaderProps {
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  onSearch?: () => void;
  onToggleFilters?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceHeader({
  title = 'Marketplace',
  subtitle,
  showFilters = false,
  onSearch,
  onToggleFilters,
  style,
  testID,
}: MarketplaceHeaderProps) {
  return (
    <View style={[styles.header, style]} testID={testID}>
      <View style={styles.headerContent}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        </View>

        <View style={styles.headerRight}>
          {onSearch && (
            <TouchableOpacity onPress={onSearch} style={styles.headerButton} activeOpacity={0.8}>
              <Search size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}

          {onToggleFilters && (
            <TouchableOpacity
              onPress={onToggleFilters}
              style={[styles.headerButton, showFilters && styles.headerButtonActive]}
              activeOpacity={0.8}
            >
              {showFilters ? (
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.filterButtonGradient}
                >
                  <SlidersHorizontal size={20} color={colors.textPrimary} />
                </LinearGradient>
              ) : (
                <SlidersHorizontal size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          )}
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
  },
  headerButtonActive: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  filterButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
});
