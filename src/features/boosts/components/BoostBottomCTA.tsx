import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface BoostBottomCTAProps {
  selectedPlan: '24h' | '7j' | '30j';
  price: number;
  onPurchase: () => void;
  testID?: string;
}

export function BoostBottomCTA({ selectedPlan, price, onPurchase, testID }: BoostBottomCTAProps) {
  return (
    <AnimatedView entering={FadeIn} style={styles.container} testID={testID}>
      <LinearGradient
        colors={[colors.transparent, colors.background, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <PrimaryButton onPress={onPurchase} fullWidth testID="purchase-button">
            <View style={styles.buttonContent}>
              <Zap size={20} color={colors.textPrimary} fill={colors.textPrimary} />
              <Text style={styles.buttonText}>
                Acheter le boost {selectedPlan} - {price.toLocaleString()} F
              </Text>
            </View>
          </PrimaryButton>
        </View>
      </LinearGradient>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: hexToRgba(colors.border, 0.5),
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.xl,
  },
  gradient: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  content: {
    maxWidth: 375,
    alignSelf: 'center',
    width: '100%',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
