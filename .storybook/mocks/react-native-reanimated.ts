// Mock pour react-native-reanimated dans Storybook
// Les worklets ne fonctionnent pas dans le contexte web, donc on fournit des alternatives web-compatibles

import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useState } from 'react';

// Mock pour useSharedValue
export function useSharedValue<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const sharedValue = {
    value,
    setValue,
    // Ajouter les méthodes manquantes pour compatibilité
    addListener: () => {},
    removeListener: () => {},
    removeAllListeners: () => {},
  };
  // Surcharger la propriété value pour permettre .value = ...
  Object.defineProperty(sharedValue, 'value', {
    get: () => value,
    set: (newValue: T) => setValue(newValue),
    enumerable: true,
    configurable: true,
  });
  return sharedValue;
}

// Mock pour useAnimatedStyle
export function useAnimatedStyle(styleFn: () => ViewStyle, dependencies?: any[]): ViewStyle {
  // Dans Storybook, on retourne simplement le style calculé sans animation
  try {
    const style = styleFn();
    // S'assurer que le style est toujours un objet valide
    if (!style || typeof style !== 'object') {
      return {};
    }
    return style;
  } catch (error) {
    console.warn('[Storybook Reanimated Mock] useAnimatedStyle error:', error);
    return {};
  }
}

// Mock pour withTiming
export function withTiming(toValue: number, config?: { duration?: number; easing?: any }) {
  return toValue;
}

// Mock pour withSpring
export function withSpring(toValue: number, config?: any) {
  return toValue;
}

// Mock pour withRepeat
export function withRepeat(animation: any, iterations?: number, reverse?: boolean) {
  return animation;
}

// Mock pour withSequence
export function withSequence(...animations: any[]) {
  return animations[animations.length - 1];
}

// Mock pour withDelay
export function withDelay(delay: number, animation: any) {
  // Dans Storybook, on retourne simplement l'animation sans délai
  return animation;
}

// Mock pour Easing
export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t * (2 - t),
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  poly: (n: number) => (t: number) => Math.pow(t, n),
  sin: (t: number) => 1 - Math.cos((t * Math.PI) / 2),
  circle: (t: number) => 1 - Math.sqrt(1 - t * t),
  exp: (t: number) => Math.pow(2, 10 * (t - 1)),
  elastic: (bounciness: number) => (t: number) => {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1;
  },
  back: (s: number) => (t: number) => {
    return t * t * ((s + 1) * t - s);
  },
  bounce: (t: number) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }
  },
  in: (easing: any) => easing,
  out: (easing: any) => (t: number) => 1 - easing(1 - t),
  inOut: (easing: any) => (t: number) => {
    if (t < 0.5) {
      return easing(2 * t) / 2;
    } else {
      return 1 - easing(2 * (1 - t)) / 2;
    }
  },
};

// Mock pour Animated - DOIT être exporté comme default ET comme named export
// Les composants peuvent faire "import Animated" (default) ou "import { Animated }" (named)
const AnimatedComponents = {
  View: View,
  Text: Text,
  Image: require('react-native').Image,
  ScrollView: require('react-native').ScrollView,
  FlatList: require('react-native').FlatList,
  SectionList: require('react-native').SectionList,
  createAnimatedComponent: (Component: any) => {
    // S'assurer que createAnimatedComponent retourne toujours un composant valide
    if (!Component) {
      console.warn('[Storybook Reanimated Mock] createAnimatedComponent called with undefined component');
      return View;
    }
    return Component;
  },
};

// Export Animated comme named export
export const Animated = AnimatedComponents;

// Mock pour les hooks d'entrée/sortie
export function FadeIn(duration = 300) {
  return { opacity: 1 };
}

// Mock pour FadeIn avec delay
FadeIn.delay = (delay: number) => ({
  opacity: 1,
});

export function FadeOut(duration = 300) {
  return { opacity: 0 };
}

// Mock pour FadeOut avec delay
FadeOut.delay = (delay: number) => ({
  opacity: 0,
});

export function SlideInDown(duration = 300) {
  return { transform: [{ translateY: 0 }] };
}

export function SlideOutUp(duration = 300) {
  return { transform: [{ translateY: -100 }] };
}

export function SlideInUp(duration = 300) {
  return { transform: [{ translateY: 0 }] };
}

export function SlideOutDown(duration = 300) {
  return { transform: [{ translateY: 100 }] };
}

export function SlideInLeft(duration = 300) {
  return { transform: [{ translateX: 0 }] };
}

export function SlideOutRight(duration = 300) {
  return { transform: [{ translateX: 100 }] };
}

export function SlideInRight(duration = 300) {
  return { transform: [{ translateX: 0 }] };
}

export function SlideOutLeft(duration = 300) {
  return { transform: [{ translateX: -100 }] };
}

export function ZoomIn(duration = 300) {
  return { transform: [{ scale: 1 }] };
}

export function ZoomOut(duration = 300) {
  return { transform: [{ scale: 0 }] };
}

// Mock pour FadeInDown (utilisé dans FavoritesScreenFigma)
export function FadeInDown(duration = 300) {
  return {
    opacity: 1,
    transform: [{ translateY: 0 }],
  };
}

// Mock pour FadeInDown avec delay
FadeInDown.delay = (delay: number) => ({
  opacity: 1,
  transform: [{ translateY: 0 }],
});

// Mock pour FadeInLeft (utilisé dans plusieurs écrans)
export function FadeInLeft(duration = 300) {
  return {
    opacity: 1,
    transform: [{ translateX: 0 }],
  };
}

// Mock pour FadeInLeft avec delay
FadeInLeft.delay = (delay: number) => ({
  opacity: 1,
  transform: [{ translateX: 0 }],
});

// Mock pour FadeInUp (utilisé dans SearchFiltersScreenFigma)
export function FadeInUp(duration = 300) {
  return {
    opacity: 1,
    transform: [{ translateY: 0 }],
  };
}

// Mock pour FadeInUp avec delay
FadeInUp.delay = (delay: number) => ({
  opacity: 1,
  transform: [{ translateY: 0 }],
});

// Mock pour useDerivedValue (utilisé dans certains composants)
export function useDerivedValue<T>(processor: () => T, dependencies?: any[]): { value: T } {
  try {
    const value = processor();
    return { value };
  } catch {
    return { value: null as any };
  }
}

// Mock pour runOnJS (pour compatibilité)
export function runOnJS<A extends any[], R>(fn: (...args: A) => R) {
  return fn;
}

// Mock pour runOnUI (pour compatibilité)
export function runOnUI<A extends any[], R>(fn: (...args: A) => R) {
  return fn;
}

// Mock pour cancelAnimation (pour compatibilité)
export function cancelAnimation(sharedValue: any) {
  // No-op dans Storybook
}

// Mock pour interpolate (pour compatibilité)
export function interpolate(value: number, inputRange: number[], outputRange: number[], options?: any): number {
  if (inputRange.length !== outputRange.length || inputRange.length < 2) {
    return outputRange[0] || 0;
  }
  // Interpolation linéaire simple
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (value >= inputRange[i] && value <= inputRange[i + 1]) {
      const ratio = (value - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
      return outputRange[i] + ratio * (outputRange[i + 1] - outputRange[i]);
    }
  }
  return value < inputRange[0] ? outputRange[0] : outputRange[outputRange.length - 1];
}

// Mock pour Extrapolation (pour compatibilité)
export const Extrapolation = {
  IDENTITY: 'identity',
  CLAMP: 'clamp',
  EXTEND: 'extend',
};

// Mock pour useAnimatedReaction (pour compatibilité)
export function useAnimatedReaction<T>(
  prepare: () => T,
  react: (prepared: T, previous: T | null) => void,
  dependencies?: any[]
) {
  // No-op dans Storybook
}

// Mock pour useAnimatedScrollHandler (pour compatibilité)
export function useAnimatedScrollHandler(handlers: any, dependencies?: any[]): (event: any) => void {
  return () => {}; // No-op handler
}

// Mock pour useAnimatedGestureHandler (pour compatibilité)
export function useAnimatedGestureHandler(handlers: any, deps?: any[]) {
  return () => {}; // No-op handler
}

// Mock pour Gesture (pour compatibilité avec react-native-gesture-handler)
export const Gesture = {
  Tap: () => ({
    onStart: () => ({}),
    onEnd: () => ({}),
  }),
  Pan: () => ({
    onStart: () => ({}),
    onUpdate: () => ({}),
    onEnd: () => ({}),
  }),
  LongPress: () => ({
    onStart: () => ({}),
    onEnd: () => ({}),
  }),
};

// Mock pour GestureDetector (pour compatibilité)
export function GestureDetector({ gesture, children }: { gesture: any; children: any }) {
  return children;
}

// Export par défaut - DOIT être Animated pour compatibilité avec "import Animated from 'react-native-reanimated'"
// Tous les exports nommés sont déjà définis au-dessus avec "export function" ou "export const"
export default Animated;

// Export de createAnimatedComponent depuis Animated pour compatibilité
export const createAnimatedComponent = Animated.createAnimatedComponent;
