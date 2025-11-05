import React from 'react';
import { ViewStyle, TextStyle } from 'react-native';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';
import { tokens } from '../../theme';

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error = false,
  errorMessage,
  helperText,
  disabled = false,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  textStyle,
  testID,
}) => {
  const theme = useTheme();

  return (
    <PaperTextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      label={label}
      error={error}
      disabled={disabled}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      left={leftIcon ? <PaperTextInput.Icon icon={leftIcon} /> : undefined}
      right={rightIcon ? <PaperTextInput.Icon icon={rightIcon} onPress={onRightIconPress} /> : undefined}
      mode="outlined"
      style={
        [
          {
            backgroundColor: theme.colors.surface,
            borderRadius: tokens.radii.md,
          },
          style,
        ] as unknown as ViewStyle
      }
      contentStyle={[
        {
          fontSize: 16,
          color: theme.colors.onSurface,
        },
        textStyle as TextStyle,
      ]}
      outlineStyle={{
        borderRadius: tokens.radii.md,
        borderColor: error ? theme.colors.error : theme.colors.outline,
      }}
      testID={testID}
    />
  );
};
