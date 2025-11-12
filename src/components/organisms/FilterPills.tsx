import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Badge from '../atoms/Badge';

export interface FilterPill {
  id: string;
  label: string;
  icon?: string;
  active?: boolean;
}

export interface FilterPillsProps {
  filters: FilterPill[];
  onFilterPress: (filterId: string) => void;
  onFilterRemove?: (filterId: string) => void;
  showRemoveButton?: boolean;
  testID?: string;
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  filters,
  onFilterPress,
  onFilterRemove,
  showRemoveButton = false,
  testID,
}) => {
  // const theme = useTheme(); // Commenté car non utilisé

  const handleFilterPress = (filterId: string) => {
    onFilterPress(filterId);
  };

  const handleFilterRemove = (filterId: string) => {
    if (onFilterRemove) {
      onFilterRemove(filterId);
    }
  };

  const renderFilterPill = (filter: FilterPill) => {
    const isActive = filter.active || false;

    return (
      <View key={filter.id} style={styles.pillContainer}>
        <TouchableOpacity onPress={() => handleFilterPress(filter.id)}>
          <Badge variant={isActive ? 'default' : 'default'} size="sm" testID={`${testID}-pill-${filter.id}`}>
            {filter.label}
          </Badge>
        </TouchableOpacity>

        {showRemoveButton && isActive && onFilterRemove && (
          <TouchableOpacity onPress={() => handleFilterRemove(filter.id)}>
            <Badge variant="destructive" size="sm" style={styles.removeButton} testID={`${testID}-remove-${filter.id}`}>
              ×
            </Badge>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
      testID={testID}
    >
      {filters.map(renderFilterPill)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  removeButton: {
    marginLeft: 4,
  },
});
