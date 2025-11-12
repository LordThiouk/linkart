import React from 'react';
import { View, ViewStyle } from 'react-native';
import Avatar from '../atoms/Avatar';
import { Text } from '../atoms';
import Badge from '../atoms/Badge';
import { useTheme } from 'react-native-paper';
import { spacing } from '../../theme';

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

  const getAvatarSize = (): 'sm' | 'default' | 'lg' => {
    switch (size) {
      case 'small':
        return 'sm';
      case 'large':
        return 'lg';
      default:
        return 'default';
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
        <Avatar name={name} size={getAvatarSize()} />
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

      <View style={{ marginLeft: spacing.md, flex: 1 }}>
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
            <Badge variant="info" size="sm" style={{ marginLeft: spacing.sm }}>
              ✓
            </Badge>
          )}
        </View>

        {showLocation && location && (
          <Text
            variant="body2"
            style={{
              color: theme.colors.onSurfaceVariant,
              marginTop: spacing.xs,
            }}
          >
            {location}
          </Text>
        )}

        {showRating && rating !== undefined && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs }}>
            <Text
              variant="body2"
              style={{
                color: theme.colors.onSurfaceVariant,
                marginRight: spacing.xs,
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
