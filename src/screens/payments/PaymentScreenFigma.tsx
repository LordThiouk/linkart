import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, ColorValue } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Smartphone, CreditCard, CheckCircle, Shield } from 'lucide-react-native';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { InputField } from '../../components/atoms/InputField';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface PaymentScreenFigmaProps {
  onBack?: () => void;
  onPaymentSuccess?: (transactionId: string) => void;
  checkoutData: {
    productId: string;
    licenseType: string;
    basePrice: number;
    commission: number;
    total: number;
  };
  productTitle: string;
  accessToken?: string | null;
}

type PaymentMethod = 'wave' | 'om' | null;

export function PaymentScreenFigma({
  onBack,
  onPaymentSuccess,
  checkoutData,
  productTitle,
  accessToken,
}: PaymentScreenFigmaProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  async function handlePayment() {
    if (!selectedMethod) {
      // Show error toast
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      // Show error toast
      return;
    }

    if (!accessToken) {
      // Show error toast
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock transaction ID
      const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Call success callback
      onPaymentSuccess?.(transactionId);
    } catch (error) {
      console.error('Payment error:', error);
      setProcessing(false);
    }
  }

  const paymentMethods = [
    {
      id: 'wave' as const,
      name: 'Wave',
      description: 'Paiement mobile rapide et sécurisé',
      icon: Smartphone,
      colors: ['#00D9FF', '#0099FF'],
      available: true,
    },
    {
      id: 'om' as const,
      name: 'Orange Money',
      description: 'Paiement via Orange Money',
      icon: CreditCard,
      colors: ['#FF7900', '#FFB84D'],
      available: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity
                onPress={onBack}
                disabled={processing}
                style={[styles.backButton, processing && styles.backButtonDisabled]}
                activeOpacity={0.8}
              >
                <ArrowLeft size={20} color="#D4D4D4" />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <View style={styles.headerTitleRow}>
                <Shield size={24} color="#10B981" />
                <Text style={styles.headerTitle}>Paiement sécurisé</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Order Summary */}
        <AnimatedView entering={FadeIn} style={styles.orderSection}>
          <View style={styles.orderCard}>
            <Text style={styles.orderTitle}>Commande</Text>
            <View style={styles.orderContent}>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>{productTitle}</Text>
                <Text style={styles.orderValue}>{checkoutData.licenseType}</Text>
              </View>
              <View style={styles.orderDivider} />
              <View style={styles.orderTotalRow}>
                <Text style={styles.orderTotalLabel}>Montant total</Text>
                <Text style={styles.orderTotalValue}>{checkoutData.total.toLocaleString()} F</Text>
              </View>
            </View>
          </View>
        </AnimatedView>

        {/* Payment Methods */}
        <AnimatedView entering={FadeIn.delay(100)} style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Mode de paiement</Text>
          <View style={styles.methodsList}>
            {paymentMethods.map(method => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;

              return (
                <AnimatedTouchableOpacity
                  key={method.id}
                  entering={FadeInDown.delay(100)}
                  onPress={() => setSelectedMethod(method.id)}
                  disabled={!method.available || processing}
                  style={[
                    styles.methodCard,
                    isSelected && styles.methodCardSelected,
                    (!method.available || processing) && styles.methodCardDisabled,
                  ]}
                  activeOpacity={0.9}
                >
                  {isSelected ? (
                    <LinearGradient
                      colors={method.colors as [ColorValue, ColorValue]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.methodCardGradient}
                    >
                      <View style={styles.methodCardContent}>
                        <View style={styles.methodIconContainer}>
                          <Icon size={24} color="#F5F5F5" />
                        </View>
                        <View style={styles.methodInfo}>
                          <Text style={styles.methodNameSelected}>{method.name}</Text>
                          <Text style={styles.methodDescriptionSelected}>{method.description}</Text>
                        </View>
                        <CheckCircle size={24} color="#F5F5F5" />
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.methodCardContent}>
                      <LinearGradient
                        colors={method.colors as [ColorValue, ColorValue]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.methodIconContainer}
                      >
                        <Icon size={24} color="#F5F5F5" />
                      </LinearGradient>
                      <View style={styles.methodInfo}>
                        <Text style={styles.methodName}>{method.name}</Text>
                        <Text style={styles.methodDescription}>{method.description}</Text>
                      </View>
                    </View>
                  )}
                </AnimatedTouchableOpacity>
              );
            })}
          </View>
        </AnimatedView>

        {/* Phone Number Input */}
        {selectedMethod && (
          <AnimatedView entering={FadeIn.delay(200)} style={styles.phoneSection}>
            <Text style={styles.sectionTitle}>Numéro {selectedMethod === 'wave' ? 'Wave' : 'Orange Money'}</Text>
            <InputField
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="+225 07 00 00 00 00"
              keyboardType="phone-pad"
              editable={!processing}
              inputStyle={styles.phoneInput}
            />
            <Text style={styles.phoneHint}>Vous recevrez une notification pour valider le paiement</Text>
          </AnimatedView>
        )}

        {/* Security Info */}
        <AnimatedView entering={FadeIn.delay(300)} style={styles.securitySection}>
          <View style={styles.securityCard}>
            <Shield size={20} color="#10B981" />
            <View style={styles.securityText}>
              <Text style={styles.securityTitle}>
                <Text style={styles.securityTitleBold}>Paiement 100% sécurisé</Text>
              </Text>
              <Text style={styles.securityDescription}>
                Vos informations bancaires sont chiffrées et sécurisées. Nous ne stockons jamais vos données de
                paiement.
              </Text>
            </View>
          </View>
        </AnimatedView>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <PrimaryButton onPress={handlePayment} disabled={!selectedMethod || !phoneNumber || processing} fullWidth>
          {processing ? (
            <View style={styles.processingContent}>
              <ActivityIndicator size="small" color="#F5F5F5" />
              <Text style={styles.processingText}>Traitement en cours...</Text>
            </View>
          ) : (
            <Text style={styles.payButtonText}>Payer {checkoutData.total.toLocaleString()} F</Text>
          )}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  backButtonDisabled: {
    opacity: 0.5,
  },
  headerText: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 80,
    gap: 24,
  },
  orderSection: {
    gap: 12,
  },
  orderCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  orderTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  orderContent: {
    gap: 12,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  orderValue: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  orderDivider: {
    height: 1,
    backgroundColor: '#404040',
    marginTop: 8,
    marginBottom: 8,
  },
  orderTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderTotalLabel: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  orderTotalValue: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
  },
  methodsSection: {
    gap: 12,
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  methodsList: {
    gap: 12,
  },
  methodCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#404040',
    backgroundColor: '#111111',
    overflow: 'hidden',
  },
  methodCardSelected: {
    borderWidth: 0,
  },
  methodCardDisabled: {
    opacity: 0.5,
  },
  methodCardGradient: {
    padding: 16,
  },
  methodCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  methodIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: {
    flex: 1,
    gap: 4,
  },
  methodName: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  methodDescription: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  methodNameSelected: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  methodDescriptionSelected: {
    color: 'rgba(245, 245, 245, 0.8)',
    fontSize: 14,
    fontWeight: '400',
  },
  phoneSection: {
    gap: 12,
  },
  phoneInput: {
    marginBottom: 8,
  },
  phoneHint: {
    color: '#737373',
    fontSize: 12,
    fontWeight: '400',
  },
  securitySection: {
    gap: 12,
  },
  securityCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  securityText: {
    flex: 1,
    gap: 4,
  },
  securityTitle: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 4,
  },
  securityTitleBold: {
    fontWeight: '700',
  },
  securityDescription: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  bottomCTA: {
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    padding: 24,
    paddingBottom: 32,
  },
  processingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  processingText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  payButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
});
