import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Music2, Package, LucideIcon } from 'lucide-react-native';
import { ImageWithFallback } from '../atoms/ImageWithFallback';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface PlaylistCardFigmaProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  type: 'beats' | 'kits' | 'samples';
  itemCount: number;
  totalPlays?: number;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const typeConfig: Record<'beats' | 'kits' | 'samples', { icon: LucideIcon; label: string; colors: [string, string] }> =
  {
    beats: { icon: Music2, label: 'Beats', colors: ['#6366F1', '#8B5CF6'] },
    kits: { icon: Package, label: 'Kits & Samples', colors: ['#EC4899', '#F59E0B'] },
    samples: { icon: Package, label: 'Samples', colors: ['#06B6D4', '#8B5CF6'] },
  };

export function PlaylistCardFigma({
  id,
  title,
  description,
  coverImage,
  type,
  itemCount,
  totalPlays,
  onPress,
  style,
  testID,
}: PlaylistCardFigmaProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  const formatPlays = (plays: number) => {
    if (plays > 999) {
      return `${(plays / 1000).toFixed(1)}k`;
    }
    return plays.toString();
  };

  return (
    <AnimatedTouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, styles.container, style]}
      activeOpacity={0.9}
      testID={testID}
    >
      <View style={styles.card}>
        <View style={styles.content}>
          {/* Cover */}
          <View style={styles.coverContainer}>
            <ImageWithFallback src={coverImage} alt={title} style={styles.cover} />
            <LinearGradient
              colors={['rgba(10, 10, 10, 0.8)', 'transparent', 'transparent']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={styles.coverGradient}
            />
            {/* Play Button Overlay - would appear on hover in web */}
          </View>

          {/* Content */}
          <View style={styles.textContainer}>
            <View style={styles.typeContainer}>
              <LinearGradient
                colors={config.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.typeIcon}
              >
                <Icon size={14} color="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.typeLabel}>{config.label}</Text>
            </View>

            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>

            <View style={styles.metaContainer}>
              <Text style={styles.itemCount}>{itemCount} sons</Text>
              {totalPlays && (
                <>
                  <Text style={styles.separator}>•</Text>
                  <Text style={styles.plays}>{formatPlays(totalPlays)} lectures</Text>
                </>
              )}
            </View>
          </View>
        </View>

        {/* Hover Effect - simulated with opacity */}
        <LinearGradient
          colors={['rgba(99, 102, 241, 0)', 'rgba(139, 92, 246, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.hoverEffect}
        />
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#111111',
    borderRadius: 24, // rounded-2xl
    borderWidth: 1,
    borderColor: '#404040',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    gap: 16, // gap-4
    padding: 16, // p-4
  },
  coverContainer: {
    width: 96, // w-24
    height: 96, // h-24
    borderRadius: 12, // rounded-xl
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  coverGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  typeIcon: {
    padding: 6, // p-1.5
    borderRadius: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeLabel: {
    color: '#A3A3A3',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 4,
  },
  description: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemCount: {
    color: '#6366F1',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  separator: {
    color: '#404040',
    fontSize: 14,
  },
  plays: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  hoverEffect: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.05,
    pointerEvents: 'none',
  },
});
