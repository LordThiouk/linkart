import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { BoostCardFigma } from '@/components/atoms/BoostCardFigma';
import { colors, spacing, typography } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface BoostPlan {
  duration: '24h' | '7j' | '30j';
  price: number;
  views: string;
  isPopular?: boolean;
}

export interface BoostPlansSectionProps {
  plans: BoostPlan[];
  selectedPlan: '24h' | '7j' | '30j' | null;
  onSelectPlan: (duration: '24h' | '7j' | '30j') => void;
  testID?: string;
}

export function BoostPlansSection({ plans, selectedPlan, onSelectPlan, testID }: BoostPlansSectionProps) {
  return (
    <AnimatedView entering={FadeIn.delay(200)} style={styles.container} testID={testID}>
      <Text style={styles.sectionTitle}>Choisissez votre durée</Text>
      <View style={styles.plansContainer}>
        {plans.map((plan, index) => (
          <AnimatedView key={plan.duration} entering={FadeInDown.delay(index * 100)} style={styles.planWrapper}>
            <TouchableOpacity
              onPress={() => onSelectPlan(plan.duration)}
              style={styles.planTouchable}
              activeOpacity={0.9}
              testID={`plan-${plan.duration}`}
            >
              <BoostCardFigma {...plan} onSelect={() => onSelectPlan(plan.duration)} />
              {selectedPlan === plan.duration && (
                <AnimatedView entering={FadeIn} style={styles.selectedBadge}>
                  <LinearGradient
                    colors={[colors.cyan, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.selectedBadgeGradient}
                  >
                    <Check size={20} color={colors.textPrimary} />
                  </LinearGradient>
                </AnimatedView>
              )}
            </TouchableOpacity>
          </AnimatedView>
        ))}
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  plansContainer: {
    gap: spacing.md,
  },
  planWrapper: {
    position: 'relative',
  },
  planTouchable: {
    position: 'relative',
  },
  selectedBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.xl / 2,
    overflow: 'hidden',
    zIndex: 1,
  },
  selectedBadgeGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
