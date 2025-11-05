import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle, TextInputProps } from 'react-native';

interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}

export function InputField({ label, error, containerStyle, inputStyle, testID, ...props }: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        {...props}
        style={[styles.input, isFocused && styles.inputFocused, error && styles.inputError, inputStyle]}
        placeholderTextColor="#A3A3A3"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        testID={testID}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8, // space-y-2
  },
  label: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    paddingHorizontal: 16, // px-4
    paddingVertical: 16, // py-4
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 24, // rounded-2xl
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  inputFocused: {
    borderColor: '#6366F1',
    // Note: React Native doesn't support box-shadow like web, but we can use elevation on Android
    // For iOS, we might need to use a wrapper View with shadow
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});
