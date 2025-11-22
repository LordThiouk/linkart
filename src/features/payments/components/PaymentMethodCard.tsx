import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ColorValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle2 } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export interface PaymentMethodCardProps {
  id: string;
  name: string;
  description: string;
  colors: [ColorValue, ColorValue];
  icon: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (id: string) => void;
  delay?: number;
}

export function PaymentMethodCard({
  id,
  name,
  description,
  colors: gradient,
  icon,
  selected = false,
  disabled = false,
  onSelect,
  delay = 0,
}: PaymentMethodCardProps) {
  return (
    <AnimatedTouchableOpacity
      entering={FadeInDown.delay(delay)}
      activeOpacity={0.95}
      onPress={() => onSelect?.(id)}
      disabled={disabled}
      style={[
        styles.base,
        selected && styles.selected,
        disabled && styles.disabled,
        selected && { shadowOpacity: 0, elevation: 0 },
      ]}
    >
      {selected ? (
        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.selectedContent}>
          <View style={styles.iconSelected}>{icon}</View>
          <View style={styles.textSelected}>
            <Text style={styles.selectedTitle}>{name}</Text>
            <Text style={styles.selectedDescription}>{description}</Text>
          </View>
          <CheckCircle2 size={24} color={colors.textPrimary} />
        </LinearGradient>
      ) : (
        <View style={styles.content}>
          <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.iconContainer}>
            {icon}
          </LinearGradient>
          <View style={styles.text}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      )}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  selected: {
    borderWidth: 0,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.poppins.semibold,
    fontSize: typography.fontSize.body,
  },
  description: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  selectedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radii.md,
  },
  iconSelected: {
    width: 48,
    height: 48,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSelected: {
    flex: 1,
    gap: spacing.xs,
  },
  selectedTitle: {
    color: colors.textPrimary,
    fontFamily: typography.fontFamily.poppins.semibold,
    fontSize: typography.fontSize.body,
  },
  selectedDescription: {
    color: colors.textPrimary,
    opacity: 0.8,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
