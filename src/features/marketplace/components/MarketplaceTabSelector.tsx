import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

type TabType = 'products' | 'services';

interface MarketplaceTabSelectorProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
  productsLabel?: string;
  servicesLabel?: string;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceTabSelector({
  selectedTab,
  onTabChange,
  productsLabel = 'Produits',
  servicesLabel = 'Services',
  style,
  testID,
}: MarketplaceTabSelectorProps) {
  return (
    <View style={[styles.tabSelector, style]} testID={testID}>
      <TouchableOpacity
        onPress={() => onTabChange('products')}
        style={[styles.tab, selectedTab === 'products' && styles.tabActive]}
        activeOpacity={0.9}
        testID="tab-products"
      >
        {selectedTab === 'products' ? (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tabGradient}
          >
            <Text style={styles.tabTextActive}>{productsLabel}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.tabText}>{productsLabel}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onTabChange('services')}
        style={[styles.tab, selectedTab === 'services' && styles.tabActive]}
        activeOpacity={0.9}
        testID="tab-services"
      >
        {selectedTab === 'services' ? (
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tabGradient}
          >
            <Text style={styles.tabTextActive}>{servicesLabel}</Text>
          </LinearGradient>
        ) : (
          <Text style={styles.tabText}>{servicesLabel}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabSelector: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  tabActive: {
    borderWidth: 0,
  },
  tabGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  tabText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    textAlign: 'center',
  },
  tabTextActive: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    textAlign: 'center',
  },
});
