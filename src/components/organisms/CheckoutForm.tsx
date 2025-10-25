import React, { useState } from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Title, RadioButton, Divider } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Input, Text, SectionCard, Button } from '../atoms';
import { PriceDisplay } from '../molecules';
import { PaymentMethod } from '../../services';
import { tokens } from '../../theme';

export interface CheckoutFormProps {
  productName: string;
  price: number;
  currency?: string;
  commission?: number;
  paymentMethods: PaymentMethod[];
  selectedPaymentMethod?: string;
  onPaymentMethodChange: (methodId: string) => void;
  onSubmit: () => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  productName,
  price,
  currency = 'FCFA',
  commission = 0.05, // 5%
  paymentMethods,
  selectedPaymentMethod,
  onPaymentMethodChange,
  onSubmit,
  loading = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [notes, setNotes] = useState('');

  const commissionAmount = price * commission;
  const totalAmount = price + commissionAmount;

  return (
    <ScrollView style={[{ flex: 1 }, style]} testID={testID}>
      <View style={{ padding: tokens.spacing.md }}>
        {/* Résumé de la commande */}
        <SectionCard style={{ marginBottom: tokens.spacing.md }}>
          <Title style={{ marginBottom: tokens.spacing.md }}>Résumé de la commande</Title>

          <View style={{ marginBottom: tokens.spacing.sm }}>
            <Text>{productName}</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
            <Text variant="body2">Prix du produit</Text>
            <PriceDisplay amount={price} currency={currency} size="small" />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: tokens.spacing.sm }}>
            <Text variant="body2">Commission (5%)</Text>
            <PriceDisplay amount={commissionAmount} currency={currency} size="small" />
          </View>

          <Divider style={{ marginVertical: tokens.spacing.sm }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="h6" style={{ fontWeight: 'bold' }}>
              Total
            </Text>
            <PriceDisplay amount={totalAmount} currency={currency} size="medium" />
          </View>
        </SectionCard>

        {/* Méthodes de paiement */}
        <SectionCard style={{ marginBottom: tokens.spacing.md }}>
          <Title style={{ marginBottom: tokens.spacing.md }}>Méthode de paiement</Title>

          {paymentMethods.map(method => (
            <View key={method.id} style={{ marginBottom: tokens.spacing.sm }}>
              <RadioButton.Group onValueChange={onPaymentMethodChange} value={selectedPaymentMethod || ''}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value={method.id} />
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: tokens.spacing.sm, fontSize: 18 }}>{method.icon}</Text>
                    <Text style={{ marginLeft: tokens.spacing.sm, flex: 1 }}>{method.name}</Text>
                    {method.fee && (
                      <Text variant="body2" style={{ color: theme.colors.onSurfaceVariant }}>
                        +{method.fee} FCFA
                      </Text>
                    )}
                  </View>
                </View>
              </RadioButton.Group>
            </View>
          ))}
        </SectionCard>

        {/* Notes optionnelles */}
        <SectionCard style={{ marginBottom: tokens.spacing.md }}>
          <Title style={{ marginBottom: tokens.spacing.md }}>Notes (optionnel)</Title>
          <Input
            label="Message pour le vendeur"
            placeholder="Ajoutez un message..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </SectionCard>

        {/* Bouton de confirmation */}
        <Button
          variant="primary"
          onPress={onSubmit}
          loading={loading}
          disabled={!selectedPaymentMethod || loading}
          style={{ marginTop: tokens.spacing.md }}
        >
          Confirmer le paiement
        </Button>
      </View>
    </ScrollView>
  );
};
