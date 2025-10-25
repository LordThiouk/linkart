import React from 'react';
import { ViewStyle } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export interface ToastProps {
  visible: boolean;
  message: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  duration?: number;
  onDismiss: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  action,
  duration = 4000,
  onDismiss,
  style,
  testID,
}) => {
  const theme = useTheme();

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={duration}
      action={action}
      style={[
        {
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}
      testID={testID}
    >
      {message}
    </Snackbar>
  );
};
