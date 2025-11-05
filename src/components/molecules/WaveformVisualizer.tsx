import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface WaveformVisualizerProps {
  isPlaying?: boolean;
  bars?: number;
  height?: number;
  compact?: boolean;
  style?: ViewStyle;
  testID?: string;
}

function WaveformBar({
  height,
  isPlaying,
  compact,
  index,
}: {
  height: number;
  isPlaying: boolean;
  compact: boolean;
  index: number;
}) {
  const animatedHeight = useSharedValue(height);
  const animatedOpacity = useSharedValue(isPlaying ? 1 : 0.5);

  useEffect(() => {
    animatedHeight.value = withTiming(height, { duration: 100 });
    animatedOpacity.value = withTiming(isPlaying ? 1 : 0.5, { duration: 300 });
  }, [height, isPlaying]);

  const barStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: animatedOpacity.value,
  }));

  return (
    <View style={[styles.barContainer, compact && styles.barCompact]}>
      {isPlaying ? (
        <LinearGradient
          colors={['#6366F1', '#8B5CF6', '#EC4899']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={[styles.bar, { flex: compact ? 0 : 1 }]}
        >
          <Animated.View style={[styles.barFill, barStyle]} />
        </LinearGradient>
      ) : (
        <Animated.View style={[styles.bar, styles.barInactive, { flex: compact ? 0 : 1 }, barStyle]} />
      )}
    </View>
  );
}

export function WaveformVisualizer({
  isPlaying = false,
  bars = 60,
  height = 60,
  compact = false,
  style,
  testID,
}: WaveformVisualizerProps) {
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial random heights
    const heights = Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
    setBarHeights(heights);
  }, [bars]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setBarHeights(prev => prev.map(h => Math.max(0.1, Math.min(1, h + (Math.random() - 0.5) * 0.3))));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, bars]);

  return (
    <View style={[styles.container, { height }, style]} testID={testID}>
      {barHeights.map((h, i) => (
        <WaveformBar key={i} height={h * height} isPlaying={isPlaying} compact={compact} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    width: '100%',
  },
  barContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  barCompact: {
    width: 2,
    flex: 0,
  },
  bar: {
    width: '100%',
    borderRadius: 999,
    minHeight: 4,
  },
  barFill: {
    width: '100%',
    borderRadius: 999,
  },
  barInactive: {
    backgroundColor: '#404040',
  },
});
