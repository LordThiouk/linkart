import React, { useRef } from 'react';
import { TouchableOpacity, Animated, ViewStyle } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';
import { useFavoritesStore } from '../../store/favoritesStore';

export interface HeartIconProps {
  productId: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  showAnimation?: boolean;
  testID?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({
  productId,
  size = 'md',
  disabled = false,
  showAnimation = true,
  testID,
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { isFavorite, toggleFavorite, error, clearError } = useFavoritesStore();

  const favorite = isFavorite(productId);

  const handlePress = async () => {
    if (disabled) return;

    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // Animation
    if (showAnimation) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }

    await toggleFavorite(productId);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: error,
        onHide: () => clearError(),
      });
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      default:
        return 20;
    }
  };

  const getIconColor = () => {
    if (disabled) {
      return theme.colors.onSurfaceVariant;
    }
    return favorite ? '#EC4899' : theme.colors.onSurfaceVariant;
  };

  const containerStyle: ViewStyle = {
    padding: 8,
    borderRadius: theme.roundness,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={containerStyle}
      testID={testID}
      accessibilityLabel={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      accessibilityRole="button"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Heart size={getIconSize()} color={getIconColor()} fill={favorite ? getIconColor() : 'transparent'} />
      </Animated.View>
    </TouchableOpacity>
  );
};
