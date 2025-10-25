import React from 'react';
import { ViewStyle } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export interface TabBarProps {
  navigationState: {
    index: number;
    routes: {
      key: string;
      title: string;
      icon: string;
      badge?: string;
    }[];
  };
  onTabPress: (route: { key: string; title: string; icon: string }) => void;
  style?: ViewStyle;
  testID?: string;
}

export const TabBar: React.FC<TabBarProps> = ({ navigationState, onTabPress, style, testID }) => {
  const theme = useTheme();

  const renderScene = ({ route }: { route: any }) => {
    return null; // Les scènes sont gérées par le parent
  };

  const renderIcon = ({ route, focused, color }: { route: any; focused: boolean; color: string }) => {
    return null; // L'icône est gérée par BottomNavigation
  };

  return (
    <BottomNavigation
      navigationState={navigationState}
      onIndexChange={index => {
        const route = navigationState.routes[index];
        onTabPress(route);
      }}
      renderScene={renderScene}
      renderIcon={renderIcon}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      barStyle={{
        backgroundColor: theme.colors.surface,
        elevation: 8,
      }}
      style={style}
      testID={testID}
    />
  );
};
