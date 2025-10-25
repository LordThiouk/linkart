import React from 'react';
import { View, ViewStyle, TouchableOpacity } from 'react-native';
import { Card, Title, Button, Chip } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Text } from '../../../components/atoms';
import { PriceDisplay } from '../../../components/molecules';
import { BoostOption } from '../hooks/useBoosts';

export interface BoostCardProps {
  boostOption: BoostOption;
  isSelected?: boolean;
  onSelect?: (boostOption: BoostOption) => void;
  onPurchase?: (boostOption: BoostOption) => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const BoostCard: React.FC<BoostCardProps> = ({
  boostOption,
  isSelected = false,
  onSelect,
  onPurchase,
  loading = false,
  disabled = false,
  style,
  testID,
}) => {
  const theme = useTheme();

  const handlePress = () => {
    if (onSelect) {
      onSelect(boostOption);
    }
  };

  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase(boostOption);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled} testID={testID}>
      <Card
        style={[
          {
            marginBottom: 12,
            elevation: isSelected ? 4 : 2,
            backgroundColor: isSelected ? theme.colors.primaryContainer : theme.colors.surface,
            borderWidth: isSelected ? 2 : 0,
            borderColor: isSelected ? theme.colors.primary : 'transparent',
          },
          style,
        ]}
      >
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontSize: 24, marginRight: 12 }}>{boostOption.icon}</Text>
            <View style={{ flex: 1 }}>
              <Title style={{ fontSize: 18, marginBottom: 4 }}>{boostOption.name}</Title>
              <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                {boostOption.description}
              </Text>
            </View>
            <Chip
              mode={isSelected ? 'flat' : 'outlined'}
              style={{
                backgroundColor: isSelected ? theme.colors.primary : 'transparent',
              }}
              textStyle={{
                color: isSelected ? theme.colors.onPrimary : theme.colors.primary,
              }}
            >
              {boostOption.duration}j
            </Chip>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <PriceDisplay amount={boostOption.price} size="large" />
            <Button
              mode={isSelected ? 'contained' : 'outlined'}
              onPress={handlePurchase}
              loading={loading}
              disabled={disabled || loading}
              compact
            >
              {isSelected ? 'Sélectionné' : 'Choisir'}
            </Button>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
