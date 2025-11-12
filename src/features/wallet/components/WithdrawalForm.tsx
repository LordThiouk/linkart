import React, { useState } from 'react';
import { View, ViewStyle, ScrollView } from 'react-native';
import { Title, RadioButton } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { Input, Text, SectionCard, Button } from '../../../components/atoms';
import { PriceDisplay } from '../../../components/molecules';
import { spacing } from '../../../theme';

export interface WithdrawalFormProps {
  balance: number;
  onSubmit: (data: WithdrawalFormData) => void;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export interface WithdrawalFormData {
  amount: number;
  method: 'wave' | 'orange_money';
  accountDetails: string;
}

const PAYMENT_METHODS = [
  {
    id: 'wave',
    name: 'Wave',
    icon: 'wave',
    description: 'Paiement mobile Wave',
  },
  {
    id: 'orange_money',
    name: 'Orange Money',
    icon: 'cellphone',
    description: 'Paiement mobile Orange',
  },
];

export const WithdrawalForm: React.FC<WithdrawalFormProps> = ({
  balance,
  onSubmit,
  loading = false,
  style,
  testID,
}) => {
  const theme = useTheme();
  const [formData, setFormData] = useState<Partial<WithdrawalFormData>>({
    amount: 0,
    method: 'wave',
    accountDetails: '',
  });

  const handleInputChange = (field: keyof WithdrawalFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.amount && formData.method && formData.accountDetails) {
      onSubmit(formData as WithdrawalFormData);
    }
  };

  const isFormValid = formData.amount && formData.method && formData.accountDetails;
  const canWithdraw = formData.amount && formData.amount <= balance;

  return (
    <ScrollView style={[{ flex: 1 }, style]} testID={testID}>
      <View style={{ padding: spacing.md }}>
        {/* Solde disponible */}
        <SectionCard style={{ marginBottom: spacing.md }}>
          <Title style={{ marginBottom: spacing.md }}>Solde disponible</Title>
          <View style={{ alignItems: 'center' }}>
            <PriceDisplay amount={balance} size="large" />
            <Text style={{ color: theme.colors.onSurfaceVariant, marginTop: spacing.sm }}>
              Montant maximum que vous pouvez retirer
            </Text>
          </View>
        </SectionCard>

        {/* Montant */}
        <SectionCard style={{ marginBottom: spacing.md }}>
          <Title style={{ marginBottom: spacing.md }}>Montant à retirer</Title>
          <Input
            label="Montant (FCFA)"
            placeholder="0"
            value={formData.amount?.toString() || ''}
            onChangeText={text => handleInputChange('amount', parseInt(text) || 0)}
            keyboardType="numeric"
            error={formData.amount && formData.amount > balance ? 'Montant supérieur au solde' : undefined}
            helperText={`Minimum: 1 000 FCFA`}
          />
        </SectionCard>

        {/* Méthode de paiement */}
        <SectionCard style={{ marginBottom: spacing.md }}>
          <Title style={{ marginBottom: spacing.md }}>Méthode de retrait</Title>
          <RadioButton.Group onValueChange={value => handleInputChange('method', value)} value={formData.method || ''}>
            {PAYMENT_METHODS.map(method => (
              <View key={method.id} style={{ marginBottom: spacing.sm }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value={method.id} />
                  <View style={{ flex: 1, marginLeft: spacing.sm }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 20, marginRight: spacing.sm }}>{method.icon}</Text>
                      <Text style={{ fontWeight: '600' }}>{method.name}</Text>
                    </View>
                    <Text style={{ color: theme.colors.onSurfaceVariant }}>{method.description}</Text>
                  </View>
                </View>
              </View>
            ))}
          </RadioButton.Group>
        </SectionCard>

        {/* Détails du compte */}
        <SectionCard style={{ marginBottom: spacing.md }}>
          <Title style={{ marginBottom: spacing.md }}>Détails du compte</Title>
          <Input
            label="Numéro de téléphone"
            placeholder="+221 77 123 45 67"
            value={formData.accountDetails || ''}
            onChangeText={text => handleInputChange('accountDetails', text)}
            keyboardType="phone-pad"
            helperText="Numéro de téléphone associé à votre compte"
          />
        </SectionCard>

        {/* Résumé */}
        {formData.amount && formData.method && (
          <SectionCard style={{ marginBottom: spacing.md }}>
            <Title style={{ marginBottom: spacing.md }}>Résumé du retrait</Title>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <Text>Montant à retirer</Text>
              <PriceDisplay amount={formData.amount} size="small" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <Text>Méthode</Text>
              <Text>{PAYMENT_METHODS.find(m => m.id === formData.method)?.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
              <Text>Compte</Text>
              <Text>{formData.accountDetails}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: spacing.sm,
                borderTopWidth: 1,
                borderTopColor: theme.colors.outline,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>Total</Text>
              <PriceDisplay amount={formData.amount} size="medium" />
            </View>
          </SectionCard>
        )}

        {/* Bouton de soumission */}
        <Button
          variant="primary"
          onPress={handleSubmit}
          loading={loading}
          disabled={!isFormValid || !canWithdraw || loading}
          fullWidth={true}
          title="Demander le retrait"
        />
      </View>
    </ScrollView>
  );
};
