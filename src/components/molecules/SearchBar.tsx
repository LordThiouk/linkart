import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '../../theme';

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
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          borderWidth: 1,
          borderColor: isFocused ? colors.primary : colors.border,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          ...(isFocused ? shadows.md : shadows.sm),
        },
        style,
      ]}
      testID={testID}
    >
      {/* Search Icon */}
      <Search size={20} color={isFocused ? colors.primary : colors.textMuted} style={{ marginRight: spacing.sm }} />

      {/* Text Input */}
      <TextInput
        style={{
          flex: 1,
          fontSize: typography.fontSize.body,
          fontFamily: typography.fontFamily.inter.regular,
          color: colors.textPrimary,
          paddingVertical: spacing.xs,
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
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
            padding: spacing.xs,
            marginLeft: spacing.sm,
          }}
          testID={`${testID}-clear`}
        >
          <X size={18} color={colors.textMuted} />
        </TouchableOpacity>
      )}

      {/* Search Button */}
      {value.length > 0 && (
        <TouchableOpacity
          onPress={handleSearch}
          style={{
            padding: spacing.xs,
            marginLeft: spacing.sm,
            backgroundColor: colors.primary,
            borderRadius: radii.md,
          }}
          testID={`${testID}-search`}
        >
          <Search size={18} color={colors.primaryForeground} />
        </TouchableOpacity>
      )}
    </View>
  );
};
