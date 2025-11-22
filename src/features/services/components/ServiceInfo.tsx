import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, CheckCircle, Clock, Award } from 'lucide-react-native';
import { ProviderCard, ProviderCardProps } from './ProviderCard';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface ServiceInfoProps {
  title: string;
  isPro?: boolean;
  provider: ProviderCardProps;
  rating: number;
  reviewCount: number;
  completedOrders: number;
  responseTime: string;
  onContact?: () => void;
  testID?: string;
}

export function ServiceInfo({
  title,
  isPro,
  provider,
  rating,
  reviewCount,
  completedOrders,
  responseTime,
  onContact,
  testID,
}: ServiceInfoProps) {
  return (
    <AnimatedView entering={FadeInDown.delay(100)} style={styles.container} testID={testID}>
      {/* Title & Pro Badge */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {isPro && (
          <LinearGradient
            colors={[colors.secondary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.proBadge}
          >
            <Award size={12} color={colors.textPrimary} />
            <Text style={styles.proBadgeText}>PRO</Text>
          </LinearGradient>
        )}
      </View>

      {/* Provider Card */}
      <ProviderCard {...provider} onContact={onContact} />

      {/* Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Star size={16} color={colors.secondary} fill={colors.secondary} />
          <Text style={styles.statText}>
            {rating} <Text style={styles.statTextMuted}>({reviewCount})</Text>
          </Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statItem}>
          <CheckCircle size={16} color={colors.textMuted} />
          <Text style={styles.statText}>{completedOrders} commandes</Text>
        </View>
        <View style={styles.statDot} />
        <View style={styles.statItem}>
          <Clock size={16} color={colors.textMuted} />
          <Text style={styles.statText}>Répond en {responseTime}</Text>
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - 4,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  proBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  statTextMuted: {
    color: colors.textMuted,
  },
  statDot: {
    width: spacing.xs,
    height: spacing.xs,
    borderRadius: radii.sm / 2,
    backgroundColor: colors.border,
  },
});
