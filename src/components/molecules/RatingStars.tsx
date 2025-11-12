import React from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { spacing } from '../../theme';

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  color,
  onRatingChange,
  readonly = true, // Par défaut, les étoiles sont en lecture seule
  style,
  testID,
}) => {
  const theme = useTheme();
  const starColor = color || theme.colors.primary;
  const starEmptyColor = theme.colors.outline;

  const handleStarPress = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const renderStar = (index: number) => {
    const isFilled = index < rating;
    const StarComponent = readonly ? View : TouchableOpacity;

    return (
      <StarComponent
        key={index}
        onPress={() => handleStarPress(index + 1)}
        style={{ marginRight: spacing.xs }}
        testID={`star-${index + 1}`}
      >
        <Icon source={isFilled ? 'star' : 'star-outline'} size={size} color={isFilled ? starColor : starEmptyColor} />
      </StarComponent>
    );
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
      testID={testID}
    >
      {Array.from({ length: maxRating }, (_, index) => renderStar(index))}
    </View>
  );
};
