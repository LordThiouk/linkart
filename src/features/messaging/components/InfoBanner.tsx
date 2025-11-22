import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { colors, spacing, typography } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

interface InfoBannerProps {
  message: string;
  iconColor?: string;
}

export function InfoBanner({ message, iconColor = colors.cyan }: InfoBannerProps) {
  return (
    <View
      style={[
        styles.infoBanner,
        { backgroundColor: hexToRgba(iconColor, 0.1), borderBottomColor: hexToRgba(iconColor, 0.3) },
      ]}
    >
      <View style={styles.infoBannerContent}>
        <AlertCircle size={16} color={iconColor} />
        <Text style={[styles.infoBannerText, { color: iconColor }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBanner: {
    borderBottomWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md - spacing.xs,
  },
  infoBannerContent: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  infoBannerText: {
    flex: 1,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
