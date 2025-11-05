import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Zap, TrendingUp, Eye, Star } from 'lucide-react-native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface BoostCardFigmaProps {
  duration: '24h' | '7j' | '30j';
  price: number;
  views: string;
  isPopular?: boolean;
  onSelect: () => void;
  style?: ViewStyle;
  testID?: string;
}

const durationConfig = {
  '24h': { label: '24 heures', colors: ['#06B6D4', '#8B5CF6'] as [string, string] },
  '7j': { label: '7 jours', colors: ['#6366F1', '#8B5CF6'] as [string, string] },
  '30j': { label: '30 jours', colors: ['#EC4899', '#F59E0B'] as [string, string] },
};

export function BoostCardFigma({
  duration,
  price,
  views,
  isPopular = false,
  onSelect,
  style,
  testID,
}: BoostCardFigmaProps) {
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

  const config = durationConfig[duration];

  const formatPrice = (amount: number) => {
    return amount.toLocaleString();
  };

  return (
    <AnimatedTouchableOpacity
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, styles.container, isPopular && styles.popular, style]}
      activeOpacity={0.9}
      testID={testID}
    >
      {isPopular && (
        <View style={styles.popularBadge}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.popularBadgeGradient}
          >
            <Star size={12} color="#F5F5F5" fill="#F5F5F5" />
            <Text style={styles.popularBadgeText}>Populaire</Text>
          </LinearGradient>
        </View>
      )}

      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={config.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconGradient}
          >
            <Zap size={32} color="#F5F5F5" fill="#F5F5F5" />
          </LinearGradient>
        </View>

        {/* Duration */}
        <Text style={styles.duration}>{config.label}</Text>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          <Text style={styles.priceUnit}> F CFA</Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Eye size={16} color="#06B6D4" />
            <Text style={styles.featureText}>{views} vues estimées</Text>
          </View>
          <View style={styles.feature}>
            <TrendingUp size={16} color="#EC4899" />
            <Text style={styles.featureText}>Top résultats</Text>
          </View>
        </View>

        {/* CTA */}
        <LinearGradient colors={config.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.cta}>
          <Text style={styles.ctaText}>Booster maintenant</Text>
        </LinearGradient>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: '#111111',
    marginBottom: 16,
    position: 'relative',
  },
  popular: {
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    marginLeft: -50,
    borderRadius: 999,
    overflow: 'hidden',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  popularBadgeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  duration: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  price: {
    color: '#F5F5F5',
    fontSize: 32,
    fontWeight: '700',
  },
  priceUnit: {
    color: '#A3A3A3',
    fontSize: 14,
    marginLeft: 4,
  },
  features: {
    gap: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  cta: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
});
