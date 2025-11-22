import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { spacing } from '@/theme';

export interface ChipFilterGroupProps {
  options: string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  multiple?: boolean;
  testID?: string;
}

export function ChipFilterGroup({ options, selectedValues, onToggle, multiple = false, testID }: ChipFilterGroupProps) {
  const handlePress = (value: string) => {
    if (multiple) {
      onToggle(value);
    } else {
      // Single selection: toggle if already selected, otherwise select
      if (selectedValues.includes(value)) {
        onToggle(value);
      } else {
        // Clear previous selection and select new one
        if (selectedValues.length > 0) {
          onToggle(selectedValues[0]);
        }
        onToggle(value);
      }
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      {options.map(option => (
        <CategoryChipFigma
          key={option}
          label={option}
          selected={selectedValues.includes(option)}
          onPress={() => handlePress(option)}
          testID={`chip-${option}`}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
