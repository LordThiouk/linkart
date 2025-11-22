import { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';

interface OTPFieldProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export function OTPField({ length = 6, value, onChange, error = false, style, testID }: OTPFieldProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newValue = value.split('');
    newValue[index] = val;
    const newValueStr = newValue.join('').slice(0, length);
    onChange(newValueStr);

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, e: any) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(el: TextInput | null) => {
            inputRefs.current[index] = el;
          }}
          style={[styles.input, error && styles.inputError, value[index] && styles.inputFilled]}
          value={value[index] || ''}
          onChangeText={val => handleChange(index, val)}
          onKeyPress={e => handleKeyPress(index, e)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          testID={`${testID}-input-${index}`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12, // gap-3
    justifyContent: 'center',
  },
  input: {
    width: 48, // w-12
    height: 56, // h-14
    textAlign: 'center',
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 12, // rounded-xl
    color: '#F5F5F5',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  inputFilled: {
    borderColor: '#6366F1',
  },
});
