import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import { Home, ShoppingBag, Upload, Wallet, User, LucideIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface Tab {
  id: 'home' | 'marketplace' | 'upload' | 'wallet' | 'profile';
  icon: LucideIcon;
  label: string;
}

interface BottomNavigationFigmaProps {
  activeTab: 'home' | 'marketplace' | 'upload' | 'wallet' | 'profile';
  onTabChange: (tab: 'home' | 'marketplace' | 'upload' | 'wallet' | 'profile') => void;
  style?: ViewStyle;
  testID?: string;
}

const tabs: Tab[] = [
  { id: 'home', icon: Home, label: 'Accueil' },
  { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { id: 'upload', icon: Upload, label: 'Upload' },
  { id: 'wallet', icon: Wallet, label: 'Wallet' },
  { id: 'profile', icon: User, label: 'Profil' },
];

export function BottomNavigationFigma({ activeTab, onTabChange, style, testID }: BottomNavigationFigmaProps) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
        style,
      ]}
      testID={testID}
    >
      <View style={styles.tabsContainer}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <AnimatedTouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              style={styles.tab}
              activeOpacity={0.9}
            >
              <View style={styles.iconContainer}>
                <Icon size={24} color={isActive ? '#6366F1' : '#A3A3A3'} />
                {isActive && (
                  <Animated.View style={styles.activeIndicator}>
                    <LinearGradient
                      colors={['#6366F1', '#8B5CF6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.activeIndicatorGradient}
                    />
                  </Animated.View>
                )}
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            </AnimatedTouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#404040',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 60,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  activeIndicatorGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  label: {
    color: '#A3A3A3',
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    color: '#F5F5F5',
  },
});
