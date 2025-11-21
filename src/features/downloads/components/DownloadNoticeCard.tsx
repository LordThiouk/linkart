import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

interface DownloadNoticeCardProps {
  title?: string;
  message: string;
  iconColor?: string;
}

export function DownloadNoticeCard({
  title = '⚠️ Important',
  message,
  iconColor = colors.accent,
}: DownloadNoticeCardProps) {
  return (
    <View
      style={[
        styles.noticeCard,
        { backgroundColor: hexToRgba(iconColor, 0.1), borderColor: hexToRgba(iconColor, 0.3) },
      ]}
    >
      <AlertCircle size={20} color={iconColor} />
      <View style={styles.noticeText}>
        <Text style={[styles.noticeTitle, { color: iconColor }]}>{title}</Text>
        <Text style={styles.noticeMessage}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noticeCard: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
  },
  noticeText: {
    flex: 1,
    gap: spacing.xs,
  },
  noticeTitle: {
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  noticeMessage: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
