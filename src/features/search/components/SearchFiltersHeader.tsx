import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { Text } from '@/components/atoms/Text';

export interface SearchFiltersHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showFilters: boolean;
  activeFiltersCount: number;
  onToggleFilters: () => void;
  onBack?: () => void;
  testID?: string;
}

export function SearchFiltersHeader({
  searchQuery,
  onSearchChange,
  showFilters,
  activeFiltersCount,
  onToggleFilters,
  onBack,
  testID,
}: SearchFiltersHeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.top}>
          {onBack && (
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8} testID="back-button">
              <ArrowLeft size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          )}

          <View style={styles.searchContainer}>
            <Search size={20} color={colors.textMuted} style={styles.searchIcon} />
            <TextInput
              value={searchQuery}
              onChangeText={onSearchChange}
              placeholder="Rechercher un beat, artiste..."
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
              autoFocus
              testID="search-input"
            />
          </View>

          <TouchableOpacity
            onPress={onToggleFilters}
            style={[styles.filterButton, (showFilters || activeFiltersCount > 0) && styles.filterButtonActive]}
            activeOpacity={0.8}
            testID="filter-button"
          >
            {showFilters || activeFiltersCount > 0 ? (
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.filterButtonGradient}
              >
                <SlidersHorizontal size={20} color={colors.textPrimary} />
                {activeFiltersCount > 0 && (
                  <View style={styles.filterBadge}>
                    <Text variant="caption" style={styles.filterBadgeText}>
                      {activeFiltersCount}
                    </Text>
                  </View>
                )}
              </LinearGradient>
            ) : (
              <View style={styles.filterButtonContent}>
                <SlidersHorizontal size={20} color={colors.textPrimary} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: `rgba(${parseInt(colors.border.slice(1, 3), 16)}, ${parseInt(colors.border.slice(3, 5), 16)}, ${parseInt(colors.border.slice(5, 7), 16)}, 0.5)`,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  content: {
    gap: spacing.md,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs,
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    paddingLeft: spacing.xxl + spacing.md,
    paddingRight: spacing.md,
    paddingVertical: spacing.md - spacing.xs,
    borderRadius: radii.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  filterButtonActive: {
    borderWidth: 0,
  },
  filterButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  filterButtonContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: spacing.md + spacing.xs,
    height: spacing.md + spacing.xs,
    borderRadius: (spacing.md + spacing.xs) / 2,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
});
