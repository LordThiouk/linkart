import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Info } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface BoostInfoBannerProps {
  title: string;
  message: string;
  testID?: string;
}

export function BoostInfoBanner({ title, message, testID }: BoostInfoBannerProps) {
  return (
    <AnimatedView entering={FadeIn.delay(100)} style={styles.container} testID={testID}>
      <View style={styles.content}>
        <Info size={20} color={colors.cyan} />
        <View style={styles.text}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  content: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: hexToRgba(colors.cyan, 0.1),
    borderWidth: 1,
    borderColor: hexToRgba(colors.cyan, 0.3),
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.cyan,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  message: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
