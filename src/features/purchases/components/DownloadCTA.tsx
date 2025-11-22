import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Download } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

interface DownloadCTAProps {
  downloaded?: boolean;
  onPress?: () => void;
}

export function DownloadCTA({ downloaded = false, onPress }: DownloadCTAProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.8}>
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Download size={16} color={colors.textPrimary} />
        <Text style={styles.text}>{downloaded ? 'Retélécharger' : 'Télécharger'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md - spacing.xs, // 12px
  },
  text: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
