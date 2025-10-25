import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';

interface RatingContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const RatingContainer: React.FC<RatingContainerProps> = ({ children, style }) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface RatingIconProps {
  children: React.ReactNode;
  style?: TextStyle;
  fontSize?: number;
  marginRight?: number;
}

export const RatingIcon: React.FC<RatingIconProps> = ({ children, style, fontSize = 14, marginRight = 4 }) => {
  return (
    <Text
      style={[
        {
          fontSize,
          marginRight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

interface RatingTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  fontSize?: number;
  color?: string;
}

export const RatingText: React.FC<RatingTextProps> = ({ children, style, fontSize = 14, color = '#6b7280' }) => {
  return (
    <Text
      style={[
        {
          fontSize,
          color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
