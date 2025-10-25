import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Avatar, Text, Badge } from '../atoms';
import { useTheme } from 'react-native-paper';
import { tokens } from '../../theme';

export interface UserProfileProps {
  name: string;
  avatarUri?: string;
  location?: string;
  rating?: number;
  isVerified?: boolean;
  isOnline?: boolean;
  size?: 'small' | 'medium' | 'large';
  showRating?: boolean;
  showLocation?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  avatarUri,
  location,
  rating,
  isVerified = false,
  isOnline = false,
  size = 'medium',
  showRating = true,
  showLocation = true,
  onPress,
  style,
  testID,
}) => {
  const theme = useTheme();

  const getAvatarSize = () => {
    switch (size) {
      case 'small':
        return 32;
      case 'large':
        return 64;
      default:
        return 48;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 14;
      case 'large':
        return 18;
      default:
        return 16;
    }
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
      <View style={{ position: 'relative' }}>
        <Avatar uri={avatarUri} name={name} size={getAvatarSize()} />
        {isOnline && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: '#22C55E',
              borderWidth: 2,
              borderColor: theme.colors.surface,
            }}
          />
        )}
      </View>

      <View style={{ marginLeft: tokens.spacing.md, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: getTextSize(),
              fontWeight: '600',
              color: theme.colors.onSurface,
            }}
          >
            {name}
          </Text>
          {isVerified && (
            <Badge variant="info" size="small" style={{ marginLeft: tokens.spacing.sm }}>
              ✓
            </Badge>
          )}
        </View>

        {showLocation && location && (
          <Text
            variant="body2"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginTop: tokens.spacing.xs,
            }}
          >
            {location}
          </Text>
        )}

        {showRating && rating !== undefined && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: tokens.spacing.xs }}>
            <Text
              variant="body2"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginRight: tokens.spacing.xs,
              }}
            >
              {rating.toFixed(1)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
