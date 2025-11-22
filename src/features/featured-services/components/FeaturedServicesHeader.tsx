import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { Headphones, Radio, Mic, Music2, GraduationCap, Waves, Grid3x3 } from 'lucide-react-native';
import { type ServiceCategory } from '../types';
import { colors, spacing, typography } from '@/theme';

export interface FeaturedServicesHeaderProps {
  activeCategory: ServiceCategory | 'all';
  onCategoryChange: (category: ServiceCategory | 'all') => void;
  title?: string;
  subtitle?: string;
  testID?: string;
}

const categories = [
  { id: 'all' as const, label: 'Tous', icon: Grid3x3 },
  { id: 'mixing' as ServiceCategory, label: 'Mixing', icon: Headphones },
  { id: 'mastering' as ServiceCategory, label: 'Mastering', icon: Radio },
  { id: 'recording' as ServiceCategory, label: 'Recording', icon: Mic },
  { id: 'production' as ServiceCategory, label: 'Production', icon: Music2 },
  { id: 'coaching' as ServiceCategory, label: 'Coaching', icon: GraduationCap },
  { id: 'sound_design' as ServiceCategory, label: 'Sound Design', icon: Waves },
];

export function FeaturedServicesHeader({
  activeCategory,
  onCategoryChange,
  title = 'Services en vedette',
  subtitle,
  testID,
}: FeaturedServicesHeaderProps) {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <CategoryChipFigma
              key={category.id}
              label={category.label}
              icon={Icon}
              selected={activeCategory === category.id}
              onPress={() => onCategoryChange(category.id)}
              testID={`tab-${category.id}`}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
    color: colors.textSecondary,
  },
  tabs: {
    gap: spacing.sm,
  },
});
