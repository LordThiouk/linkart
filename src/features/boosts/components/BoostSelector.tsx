import React, { useState } from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Card, Title, Button, Divider, Icon } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Text } from '../../../components/atoms';
import { BoostCard } from './BoostCard';
import { useBoosts, BoostOption } from '../hooks/useBoosts';

export interface BoostSelectorProps {
  productId?: string;
  onBoostSelected?: (boostOption: BoostOption) => void;
  onPurchase?: (boostOption: BoostOption) => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const BoostSelector: React.FC<BoostSelectorProps> = ({
  productId,
  onBoostSelected,
  onPurchase,
  loading = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [selectedBoost, setSelectedBoost] = useState<BoostOption | null>(null);
  const { boostOptions, purchaseBoost } = useBoosts({ productId });

  const handleBoostSelect = (boostOption: BoostOption) => {
    setSelectedBoost(boostOption);
    onBoostSelected?.(boostOption);
  };

  const handlePurchase = async (boostOption: BoostOption) => {
    try {
      await purchaseBoost(boostOption, productId);
      onPurchase?.(boostOption);
    } catch (error) {
      console.error("Erreur lors de l'achat du boost:", error);
    }
  };

  return (
    <ScrollView style={[{ flex: 1 }, style]} testID={testID}>
      <View style={{ padding: 16 }}>
        <Card style={{ marginBottom: 16 }}>
          <Card.Content>
            <Title style={{ marginBottom: 16 }}>Options de boost</Title>
            <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
              Améliorez la visibilité de votre {productId ? 'produit' : 'profil'} en achetant un boost. Les produits
              boostés apparaissent en premier dans les résultats de recherche.
            </Text>
          </Card.Content>
        </Card>

        {boostOptions.map(boostOption => (
          <BoostCard
            key={boostOption.id}
            boostOption={boostOption}
            isSelected={selectedBoost?.id === boostOption.id}
            onSelect={handleBoostSelect}
            onPurchase={() => handlePurchase(boostOption)}
            loading={loading}
          />
        ))}

        {selectedBoost && (
          <Card style={{ marginTop: 16 }}>
            <Card.Content>
              <Title style={{ marginBottom: 16 }}>Résumé de la commande</Title>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text variant="body2">{selectedBoost.name}</Text>
                <Text variant="body2">{selectedBoost.duration} jours</Text>
              </View>
              <Divider style={{ marginVertical: 8 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <Text variant="h6" style={{ fontWeight: 'bold' }}>
                  Total
                </Text>
                <Text variant="h6" style={{ fontWeight: 'bold' }}>
                  {selectedBoost.price.toLocaleString()} FCFA
                </Text>
              </View>
              <Button
                mode="contained"
                onPress={() => handlePurchase(selectedBoost)}
                loading={loading}
                disabled={loading}
                style={{ marginTop: 8 }}
              >
                Confirmer l'achat
              </Button>
            </Card.Content>
          </Card>
        )}

        <Card style={{ marginTop: 16 }}>
          <Card.Content>
            <Title style={{ marginBottom: 16 }}>Comment ça marche ?</Title>
            <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
              <Icon source="rocket-launch" size={20} color={theme.colors.primary} />
              <View style={{ flex: 1 }}>
                <Text variant="body2" style={{ fontWeight: '600', marginBottom: 4 }}>
                  Boost Produit
                </Text>
                <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                  Votre produit apparaît en premier dans les résultats de recherche et sur la page d'accueil.
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 12, flexDirection: 'row', alignItems: 'center' }}>
              <Icon source="account" size={20} color={theme.colors.primary} />
              <View style={{ flex: 1 }}>
                <Text variant="body2" style={{ fontWeight: '600', marginBottom: 4 }}>
                  Boost Profil
                </Text>
                <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                  Votre profil est mis en avant dans les suggestions et les résultats de recherche.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon source="clock-outline" size={20} color={theme.colors.primary} />
              <View style={{ flex: 1 }}>
                <Text variant="body2" style={{ fontWeight: '600', marginBottom: 4 }}>
                  Durée
                </Text>
                <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                  Les boosts sont actifs pendant la durée sélectionnée, puis expirent automatiquement.
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};
