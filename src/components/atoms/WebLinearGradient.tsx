import React from 'react';
import { View, Platform, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface WebLinearGradientProps {
  colors: string[];
  style?: ViewStyle;
  children?: React.ReactNode;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  [key: string]: unknown;
}

// Wrapper qui utilise CSS gradient sur web, expo-linear-gradient sur native
export const WebLinearGradient: React.FC<WebLinearGradientProps> = ({
  colors,
  style,
  children,
  start,
  end,
  locations,
  ...props
}) => {
  if (Platform.OS === 'web') {
    // Utiliser CSS gradient natif pour Web
    const gradientDirection = start && end ? `to ${end.x * 100}% ${end.y * 100}%` : '135deg';

    const gradientColors = colors.join(', ');

    return (
      <View
        style={[
          style,
          {
            // @ts-ignore - CSS property for web
            background: `linear-gradient(${gradientDirection}, ${gradientColors})`,
          },
        ]}
        {...props}
      >
        {children}
      </View>
    );
  }

  // Utiliser expo-linear-gradient pour Native
  return (
    <LinearGradient
      colors={colors as [string, string, ...string[]]}
      style={style}
      start={start}
      end={end}
      locations={locations as [number, number, ...number[]] | undefined}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};
