import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

export type LicenseType = 'Basic' | 'Premium' | 'Exclusive';

interface ContractBadgeProps {
  license: LicenseType;
}

export function ContractBadge({ license }: ContractBadgeProps) {
  if (license === 'Exclusive' || license === 'Premium') {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={license === 'Exclusive' ? [colors.accent, colors.secondary] : [colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.text}>{license}</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.basic]}>
      <Text style={styles.basicText}>{license}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
    overflow: 'hidden',
  },
  gradient: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  text: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  basic: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  basicText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
