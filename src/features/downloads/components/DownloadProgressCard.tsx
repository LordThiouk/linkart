import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface DownloadProgressCardProps {
  downloadedCount: number;
  totalCount: number;
}

export function DownloadProgressCard({ downloadedCount, totalCount }: DownloadProgressCardProps) {
  const progressPercentage = (downloadedCount / totalCount) * 100;

  return (
    <View style={styles.statsCard}>
      <View style={styles.statsHeader}>
        <Text style={styles.statsLabel}>Progression</Text>
        <Text style={styles.statsValue}>
          {downloadedCount}/{totalCount} fichiers
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <AnimatedView
          style={[
            styles.progressBar,
            {
              width: `${progressPercentage}%`,
            },
          ]}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.progressBarGradient}
          />
        </AnimatedView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  statsLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statsValue: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  progressBarContainer: {
    height: spacing.sm,
    backgroundColor: colors.surfaceElevated,
    borderRadius: spacing.xs,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  progressBarGradient: {
    width: '100%',
    height: '100%',
  },
});
