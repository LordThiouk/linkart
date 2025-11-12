/**
 * Mock de react-native-reanimated pour Storybook Web
 * Version: 1.0
 */

import React from 'react';
import { View, ViewProps } from 'react-native';

// Mock useSharedValue
export const useSharedValue = (initialValue: any) => {
  return { value: initialValue };
};

// Mock useAnimatedStyle
export const useAnimatedStyle = (callback: () => any) => {
  return callback();
};

// Mock withTiming
export const withTiming = (toValue: any, config?: any, callback?: any) => {
  return toValue;
};

// Mock withSequence
export const withSequence = (...animations: any[]) => {
  return animations[animations.length - 1];
};

// Mock withDelay
export const withDelay = (delay: number, animation: any) => {
  return animation;
};

// Mock withRepeat
export const withRepeat = (animation: any, numberOfReps?: number, reverse?: boolean) => {
  return animation;
};

// Mock withSpring
export const withSpring = (toValue: any, config?: any, callback?: any) => {
  return toValue;
};

// Mock Easing
export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => t,
  in: (easing: (t: number) => number) => easing,
  out: (easing: (t: number) => number) => easing,
  inOut: (easing: (t: number) => number) => easing,
};

// Mock animations d'entrée
export const FadeIn = {
  duration: (ms: number) => FadeIn,
  delay: (ms: number) => FadeIn,
};

export const FadeInDown = {
  duration: (ms: number) => FadeInDown,
  delay: (ms: number) => FadeInDown,
};

export const FadeInLeft = {
  duration: (ms: number) => FadeInLeft,
  delay: (ms: number) => FadeInLeft,
};

export const FadeInUp = {
  duration: (ms: number) => FadeInUp,
  delay: (ms: number) => FadeInUp,
};

// Mock useDerivedValue
export const useDerivedValue = (callback: () => any) => {
  return { value: callback() };
};

// Mock runOnJS
export const runOnJS = (fn: (...args: any[]) => void) => {
  return (...args: any[]) => fn(...args);
};

// Mock runOnUI
export const runOnUI = (fn: (...args: any[]) => void) => {
  return (...args: any[]) => fn(...args);
};

// Mock cancelAnimation
export const cancelAnimation = (animatedValue: any) => {
  // No-op for web
};

// Mock interpolate
export const interpolate = (value: number, inputRange: number[], outputRange: number[], extrapolate?: any) => {
  return value;
};

// Mock Extrapolation
export const Extrapolation = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
};

// Mock useAnimatedReaction
export const useAnimatedReaction = (
  prepare: () => any,
  react: (prepareResult: any, preparePreviousResult: any) => void
) => {
  // No-op for web
};

// Mock useAnimatedScrollHandler
export const useAnimatedScrollHandler = (handlers: any) => {
  return () => {};
};

// Mock useAnimatedGestureHandler
export const useAnimatedGestureHandler = (handlers: any) => {
  return () => {};
};

// Mock useEvent (pour les gestes)
export const useEvent = (handler: any, deps?: any[]) => {
  return handler;
};

// Mock useHandler (pour les gestes)
export const useHandler = (handlers: any, deps?: any[]) => {
  return () => {};
};

// Mock useAnimatedProps
export const useAnimatedProps = (callback: () => any) => {
  return callback();
};

// Mock useWorkletCallback
export const useWorkletCallback = (callback: any, deps?: any[]) => {
  return callback;
};

// Mock useFrameCallback
export const useFrameCallback = (callback: any) => {
  // No-op for web
};

// Mock useAnimatedRef
export const useAnimatedRef = () => {
  return React.useRef(null);
};

// Mock measure
export const measure = (animatedRef: any) => {
  return null;
};

// Mock scrollTo
export const scrollTo = (ref: any, x: number, y: number, animated: boolean) => {
  // No-op for web
};

// Mock Gesture
export const Gesture = {
  Tap: () => ({
    onBegin: () => Gesture.Tap(),
    onStart: () => Gesture.Tap(),
    onEnd: () => Gesture.Tap(),
    onFinalize: () => Gesture.Tap(),
    enabled: () => Gesture.Tap(),
  }),
  Pan: () => ({
    onBegin: () => Gesture.Pan(),
    onStart: () => Gesture.Pan(),
    onUpdate: () => Gesture.Pan(),
    onEnd: () => Gesture.Pan(),
    onFinalize: () => Gesture.Pan(),
    enabled: () => Gesture.Pan(),
    activeOffsetX: () => Gesture.Pan(),
    activeOffsetY: () => Gesture.Pan(),
    runOnJS: () => Gesture.Pan(), // Support pour .runOnJS(true)
  }),
  Pinch: () => ({
    onBegin: () => Gesture.Pinch(),
    onStart: () => Gesture.Pinch(),
    onUpdate: () => Gesture.Pinch(),
    onEnd: () => Gesture.Pinch(),
    onFinalize: () => Gesture.Pinch(),
    enabled: () => Gesture.Pinch(),
  }),
  Rotation: () => ({
    onBegin: () => Gesture.Rotation(),
    onStart: () => Gesture.Rotation(),
    onUpdate: () => Gesture.Rotation(),
    onEnd: () => Gesture.Rotation(),
    onFinalize: () => Gesture.Rotation(),
    enabled: () => Gesture.Rotation(),
  }),
  Fling: () => ({
    direction: () => Gesture.Fling(),
    enabled: () => Gesture.Fling(),
  }),
  LongPress: () => ({
    onBegin: () => Gesture.LongPress(),
    onStart: () => Gesture.LongPress(),
    onEnd: () => Gesture.LongPress(),
    onFinalize: () => Gesture.LongPress(),
    enabled: () => Gesture.LongPress(),
    minDuration: () => Gesture.LongPress(),
  }),
  Simultaneous: (...gestures: any[]) => ({
    enabled: () => Gesture.Simultaneous(...gestures),
  }),
  Exclusive: (...gestures: any[]) => ({
    enabled: () => Gesture.Exclusive(...gestures),
  }),
  Race: (...gestures: any[]) => ({
    enabled: () => Gesture.Race(...gestures),
  }),
};

// Mock GestureDetector
export const GestureDetector: React.FC<{ gesture: any; children: React.ReactNode }> = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};

// Mock GestureHandlerRootView
export const GestureHandlerRootView: React.FC<ViewProps & { children: React.ReactNode }> = ({ children, ...props }) => {
  return React.createElement(View, props, children);
};

// Mock Directions pour les gestes
export const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

// Mock State pour les gestes
export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

// Mock Animated components
const createAnimatedComponent = (Component: any) => {
  return React.forwardRef((props: any, ref: any) => {
    return React.createElement(Component, { ...props, ref });
  });
};

// Export par défaut
const Animated = {
  View: createAnimatedComponent(View),
  Text: createAnimatedComponent(View),
  ScrollView: createAnimatedComponent(View),
  Image: createAnimatedComponent(View),
  FlatList: createAnimatedComponent(View),
  createAnimatedComponent,
};

export default Animated;
