import React from 'react';
import { ViewStyle } from 'react-native';
import { Avatar as PaperAvatar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  testID?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ uri, name, size = 40, backgroundColor, textColor, style, testID }) => {
  const theme = useTheme();

  const getInitials = (fullName?: string): string => {
    if (!fullName) return '?';
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarColor = backgroundColor || theme.colors.primary;
  const textColorFinal = textColor || theme.colors.onPrimary;

  if (uri) {
    return <PaperAvatar.Image size={size} source={{ uri }} style={style} testID={testID} />;
  }

  return (
    <PaperAvatar.Text
      size={size}
      label={getInitials(name)}
      style={[
        {
          backgroundColor: avatarColor,
        },
        style,
      ]}
      labelStyle={{
        color: textColorFinal,
        fontSize: size * 0.4,
        fontWeight: 'bold',
      }}
      testID={testID}
    />
  );
};
