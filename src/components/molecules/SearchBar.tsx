import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Search, X } from 'lucide-react-native';

export interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch?: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: ViewStyle;
  testID?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Rechercher beats, artistes, services...',
  value,
  onChangeText,
  onSearch,
  onFocus,
  onBlur,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleSearch = () => {
    if (value.trim()) {
      onSearch?.(value.trim());
    }
  };

  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
          borderRadius: theme.roundness,
          borderWidth: 1,
          borderColor: isFocused ? theme.colors.primary : theme.colors.outline,
          paddingHorizontal: 16,
          paddingVertical: 8,
          elevation: isFocused ? 4 : 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: isFocused ? 2 : 1 },
          shadowOpacity: isFocused ? 0.25 : 0.1,
          shadowRadius: isFocused ? 4 : 1,
        },
        style,
      ]}
      testID={testID}
    >
      {/* Search Icon */}
      <Search
        size={20}
        color={isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant}
        style={{ marginRight: 8 }}
      />

      {/* Text Input */}
      <TextInput
        style={{
          flex: 1,
          fontSize: theme.fonts.bodyMedium.fontSize,
          fontFamily: theme.fonts.bodyMedium.fontFamily,
          color: theme.colors.onSurface,
          paddingVertical: 4,
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        testID={`${testID}-input`}
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={{
            padding: 4,
            marginLeft: 8,
          }}
          testID={`${testID}-clear`}
        >
          <X size={18} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
      )}

      {/* Search Button */}
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            padding: 4,
            marginLeft: 8,
            backgroundColor: theme.colors.primary,
            borderRadius: theme.roundness / 2,
          }}
          testID={`${testID}-search`}
        >
          <Search size={18} color={theme.colors.onPrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
};
