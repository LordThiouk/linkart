import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, CheckCircle } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
  features: string[];
  popular?: boolean;
}

export interface PricingTiersProps {
  tiers: PricingTier[];
  selectedTierId: string;
  onSelectTier: (tierId: string) => void;
  testID?: string;
}

export function PricingTiers({ tiers, selectedTierId, onSelectTier, testID }: PricingTiersProps) {
  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.sectionTitle}>Packages disponibles</Text>
      <View style={styles.list}>
        {tiers.map((tier, index) => (
          <AnimatedTouchableOpacity
            key={tier.id}
            entering={FadeInDown.delay(300 + index * 50)}
            onPress={() => onSelectTier(tier.id)}
            style={[styles.card, selectedTierId === tier.id && styles.cardSelected]}
            activeOpacity={0.9}
            testID={`tier-${tier.id}`}
          >
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <View style={styles.titleRow}>
                  <Text style={styles.name}>{tier.name}</Text>
                  {tier.popular && (
                    <LinearGradient
                      colors={[colors.secondary, colors.accent]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.popularBadge}
                    >
                      <Text style={styles.popularBadgeText}>POPULAIRE</Text>
                    </LinearGradient>
                  )}
                </View>
                <View style={styles.delivery}>
                  <Clock size={12} color={colors.textMuted} />
                  <Text style={styles.deliveryText}>Livraison en {tier.deliveryTime}</Text>
                </View>
              </View>
              <Text style={styles.price}>€{tier.price.toFixed(2)}</Text>
            </View>
            <View style={styles.features}>
              {tier.features.map((feature, idx) => (
                <View key={idx} style={styles.feature}>
                  <CheckCircle size={16} color={colors.success} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </AnimatedTouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headerLeft: {
    flex: 1,
    gap: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  name: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  popularBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 2,
    borderRadius: radii.md,
  },
  popularBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption - 1,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  delivery: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  deliveryText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  price: {
    color: colors.secondary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  features: {
    gap: spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    flex: 1,
  },
});
