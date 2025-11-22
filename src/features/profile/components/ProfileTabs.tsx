import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { Music, Headphones, TrendingUp } from 'lucide-react-native';
import { spacing } from '@/theme';

export type ProfileTab = 'beats' | 'services' | 'stats';

export interface ProfileTabItem {
  id: ProfileTab;
  label: string;
  icon?: typeof Music;
}

export interface ProfileTabsProps {
  tabs: ProfileTabItem[];
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  style?: ViewStyle;
  testID?: string;
}

const tabIcons: Record<ProfileTab, typeof Music> = {
  beats: Music,
  services: Headphones,
  stats: TrendingUp,
};

export function ProfileTabs({ tabs, activeTab, onTabChange, style, testID }: ProfileTabsProps) {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {tabs.map(tab => {
          const Icon = tab.icon || tabIcons[tab.id];
          return (
            <CategoryChipFigma
              key={tab.id}
              label={tab.label}
              icon={Icon}
              selected={activeTab === tab.id}
              onPress={() => onTabChange(tab.id)}
              testID={`tab-${tab.id}`}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  scrollContent: {
    gap: spacing.sm,
  },
});
