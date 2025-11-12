/**
 * Slider Component
 * Version: 2.0 - Design System avec Tokens
 *
 * Composant Slider réutilisable avec animations
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useHandler, runOnJS, withSpring } from 'react-native-reanimated';
import { colors, spacing, radii, typography } from '../../theme';

export interface SliderProps {
  /** Valeur actuelle */
  value?: number;
  /** Valeur minimale */
  min?: number;
  /** Valeur maximale */
  max?: number;
  /** Step */
  step?: number;
  /** Fonction appelée au changement */
  onValueChange?: (value: number) => void;
  /** Label */
  label?: string;
  /** Afficher la valeur */
  showValue?: boolean;
  /** État désactivé */
  disabled?: boolean;
  /** Variant de couleur */
  variant?: 'primary' | 'secondary' | 'success';
}

export default function Slider({
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  label,
  showValue = false,
  disabled = false,
  variant = 'primary',
}: SliderProps) {
  const [sliderWidth, setSliderWidth] = useState(0);
  const translateX = useSharedValue(((value - min) / (max - min)) * sliderWidth);

  const updateValue = useCallback(
    (newValue: number) => {
      const snappedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, snappedValue));
      onValueChange?.(clampedValue);
    },
    [min, max, step, onValueChange]
  );

  const gestureHandler = useHandler({
    onStart: (_: any, ctx: any) => {
      ctx.startX = translateX.value;
    },
    onActive: (event: any, ctx: any) => {
      if (disabled) return;
      const newX = Math.max(0, Math.min(sliderWidth, ctx.startX + event.translationX));
      translateX.value = newX;

      const newValue = min + (newX / sliderWidth) * (max - min);
      runOnJS(updateValue)(newValue);
    },
    onEnd: () => {
      if (disabled) return;
      const percentage = translateX.value / sliderWidth;
      const exactValue = min + percentage * (max - min);
      const snappedValue = Math.round(exactValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, snappedValue));

      translateX.value = withSpring(((clampedValue - min) / (max - min)) * sliderWidth);
    },
  });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }));

  // Update translateX when value changes externally
  React.useEffect(() => {
    if (sliderWidth > 0) {
      translateX.value = withSpring(((value - min) / (max - min)) * sliderWidth);
    }
  }, [value, min, max, sliderWidth, translateX]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {(label || showValue) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && <Text style={styles.valueText}>{value}</Text>}
        </View>
      )}

      <View
        style={[styles.track, disabled && styles.track_disabled]}
        onLayout={e => setSliderWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View style={[styles.fill, styles[`fill_${variant}`], fillStyle]} />

        <PanGestureHandler onGestureEvent={gestureHandler as any}>
          <Animated.View
            style={[styles.thumb, styles[`thumb_${variant}`], disabled && styles.thumb_disabled, thumbStyle]}
          />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}

Slider.displayName = 'Slider';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  label: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    color: colors.textPrimary,
  },

  valueText: {
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary,
  },

  track: {
    height: 4,
    backgroundColor: colors.muted,
    borderRadius: radii.full,
    position: 'relative',
    justifyContent: 'center',
  },

  track_disabled: {
    opacity: 0.5,
  },

  fill: {
    position: 'absolute',
    left: 0,
    height: '100%',
    borderRadius: radii.full,
  },

  fill_primary: {
    backgroundColor: colors.primary,
  },
  fill_secondary: {
    backgroundColor: colors.secondary,
  },
  fill_success: {
    backgroundColor: colors.success,
  },

  thumb: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    borderWidth: 2,
    backgroundColor: colors.white,
    position: 'absolute',
    top: -8,
  },

  thumb_primary: {
    borderColor: colors.primary,
  },
  thumb_secondary: {
    borderColor: colors.secondary,
  },
  thumb_success: {
    borderColor: colors.success,
  },

  thumb_disabled: {
    opacity: 0.5,
  },
});
