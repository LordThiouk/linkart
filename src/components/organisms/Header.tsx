import React from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Badge } from '../atoms';

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  showProfile?: boolean;
  userAvatar?: string;
  userName?: string;
  showNotifications?: boolean;
  notificationCount?: number;
  onProfilePress?: () => void;
  onNotificationPress?: () => void;
  rightActions?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  showProfile = false,
  userAvatar,
  userName,
  showNotifications = false,
  notificationCount = 0,
  onProfilePress,
  onNotificationPress,
  rightActions,
  style,
  testID,
}) => {
  const theme = useTheme();

  return (
    <Appbar.Header
      style={[
        {
          backgroundColor: theme.colors.surface,
          elevation: 4,
        },
        style,
      ]}
      testID={testID}
    >
      {showBackButton && <Appbar.BackAction onPress={onBackPress} />}

      {title && <Appbar.Content title={title} />}

      <View style={{ flex: 1 }} />

      {showNotifications && (
        <TouchableOpacity onPress={onNotificationPress} style={{ position: 'relative', marginRight: 8 }}>
          <Appbar.Action icon="bell" onPress={onNotificationPress} />
          {notificationCount > 0 && (
            <Badge
              size="small"
              variant="error"
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                minWidth: 18,
                height: 18,
              }}
            >
              {notificationCount > 99 ? '99+' : notificationCount.toString()}
            </Badge>
          )}
        </TouchableOpacity>
      )}

      {showProfile && (
        <TouchableOpacity onPress={onProfilePress}>
          <Avatar.Image size={32} source={{ uri: userAvatar }} style={{ marginRight: 8 }} />
        </TouchableOpacity>
      )}

      {rightActions}
    </Appbar.Header>
  );
};
