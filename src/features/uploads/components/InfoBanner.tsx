import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

interface InfoBannerProps {
  message: string;
  gradientColors?: [string, string];
  accentColor?: string;
}

export function InfoBanner({
  message,
  gradientColors = ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)'],
  accentColor,
}: InfoBannerProps) {
  return (
    <View style={styles.infoCard}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.infoCardGradient}
      >
        <Text style={[styles.infoCardText, accentColor && { color: accentColor }]}>{message}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: radii.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  infoCardGradient: {
    padding: spacing.md,
  },
  infoCardText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: typography.fontSize.label * 1.5,
  },
});
