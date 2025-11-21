import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Zap, LucideIcon } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

export interface QuickAction {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  colors: [string, string];
  onPress: () => void;
}

export interface ProfileQuickActionsProps {
  title?: string;
  actions: QuickAction[];
  style?: ViewStyle;
  testID?: string;
}

export function ProfileQuickActions({ title = 'Actions rapides', actions, style, testID }: ProfileQuickActionsProps) {
  // Calculate card width for 2 columns using FlatList approach
  const { width: screenWidth } = useWindowDimensions();
  const horizontalPadding = spacing.xl * 2;
  const gap = spacing.md;
  const cardWidth = (screenWidth - horizontalPadding - gap) / 2;

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.grid}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <TouchableOpacity
              key={action.id}
              style={[styles.card, { width: cardWidth }]}
              onPress={action.onPress}
              activeOpacity={0.9}
              testID={`action-${action.id}`}
            >
              <LinearGradient colors={action.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.icon}>
                <Icon
                  size={20}
                  color="#FFFFFF"
                  fill={Icon === Heart || Icon === Zap ? '#FFFFFF' : 'transparent'}
                  strokeWidth={2.5}
                />
              </LinearGradient>
              <Text style={styles.title}>{action.title}</Text>
              <Text style={styles.subtitle}>{action.subtitle}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    textAlign: 'center',
  },
});
