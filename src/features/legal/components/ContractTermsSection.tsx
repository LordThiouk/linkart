import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Check } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

export interface ContractTermsSectionProps {
  title: string;
  terms: string[];
  testID?: string;
}

export function ContractTermsSection({ title, terms, testID }: ContractTermsSectionProps) {
  return (
    <AnimatedView entering={FadeIn.delay(100)} style={styles.container} testID={testID}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.termsList}>
          {terms.map((term, index) => (
            <View key={index} style={styles.termItem}>
              <LinearGradient
                colors={[colors.cyan, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.termIcon}
              >
                <Check size={12} color={colors.textPrimary} />
              </LinearGradient>
              <Text style={styles.termText}>{term}</Text>
            </View>
          ))}
        </View>
      </View>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md - spacing.xs,
  },
  termsList: {
    gap: spacing.md - spacing.xs,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md - spacing.xs,
  },
  termIcon: {
    width: spacing.xl - spacing.xs,
    height: spacing.xl - spacing.xs,
    borderRadius: spacing.xl / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  termText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    flex: 1,
  },
});
