import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, RadioButton, Divider, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export function CheckoutScreen() {
  const [paymentMethod, setPaymentMethod] = useState('wave');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Summary */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Résumé de la commande</Title>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Afrobeat Instrumental</Text>
              <Text style={styles.summaryValue}>15 000 F</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Commission plateforme (5%)</Text>
              <Text style={styles.summaryValue}>750 F</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryTotal}>Total</Text>
              <Text style={styles.summaryTotalValue}>15 750 F</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Payment Method */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Méthode de paiement</Title>
            <View style={styles.paymentOptions}>
              <Surface style={styles.paymentOption}>
                <RadioButton
                  value="wave"
                  status={paymentMethod === 'wave' ? 'checked' : 'unchecked'}
                  onPress={() => setPaymentMethod('wave')}
                />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentTitle}>Wave</Text>
                  <Text style={styles.paymentDescription}>Paiement via Wave Money</Text>
                </View>
              </Surface>

              <Surface style={styles.paymentOption}>
                <RadioButton
                  value="orange"
                  status={paymentMethod === 'orange' ? 'checked' : 'unchecked'}
                  onPress={() => setPaymentMethod('orange')}
                />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentTitle}>Orange Money</Text>
                  <Text style={styles.paymentDescription}>Paiement via Orange Money</Text>
                </View>
              </Surface>
            </View>
          </Card.Content>
        </Card>

        {/* Terms */}
        <Card style={styles.sectionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Conditions</Title>
            <Paragraph style={styles.termsText}>
              En procédant au paiement, vous acceptez nos conditions d'utilisation et notre politique de
              confidentialité. Le téléchargement sera disponible immédiatement après confirmation du paiement.
            </Paragraph>
          </Card.Content>
        </Card>

        {/* Purchase Button */}
        <Button mode="contained" style={styles.purchaseButton} contentStyle={styles.purchaseButtonContent}>
          Payer 15 750 F
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  divider: {
    marginVertical: 8,
  },
  paymentOptions: {
    gap: 12,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  paymentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  termsText: {
    color: '#6b7280',
    lineHeight: 20,
  },
  purchaseButton: {
    marginTop: 16,
  },
  purchaseButtonContent: {
    paddingVertical: 12,
  },
});
