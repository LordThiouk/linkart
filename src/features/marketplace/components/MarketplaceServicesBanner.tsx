import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

interface MarketplaceServicesBannerProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export function MarketplaceServicesBanner({
  title = 'Services Professionnels',
  subtitle = 'Engagez des experts certifiés',
  badgeText = '✨ Vérifié',
  onPress,
  style,
  testID,
}: MarketplaceServicesBannerProps) {
  const content = (
    <LinearGradient
      colors={[colors.cyan, colors.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeText}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.glow1} />
      <View style={styles.glow2} />
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={[styles.container, style]} testID={testID}>
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.container, style]} testID={testID}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    borderRadius: radii.xxl,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    position: 'relative',
  },
  gradient: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    backgroundColor: 'rgba(245, 245, 245, 0.2)',
    marginBottom: spacing.md,
  },
  badgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: 'rgba(245, 245, 245, 0.8)',
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  glow1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 128,
    height: 128,
    borderRadius: radii.full,
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    opacity: 0.3,
  },
  glow2: {
    position: 'absolute',
    bottom: 0,
    left: '33%',
    width: 96,
    height: 96,
    borderRadius: radii.full,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    opacity: 0.3,
  },
});
