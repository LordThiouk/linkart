import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smartphone, CreditCard } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';
import {
  OrderSummaryCard,
  PhoneNumberForm,
  SecurityNotice,
  PaymentHeader,
  PaymentMethodCard,
  PaymentMethodCardProps,
} from '@/features/payments/components';

const AnimatedView = Animated.createAnimatedComponent(View);

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
  const payableAmount = Math.max(
    0,
    (checkoutData.total ??
      (typeof checkoutData.basePrice === 'number' && typeof checkoutData.commission === 'number'
        ? checkoutData.basePrice - checkoutData.commission
        : 0)) ||
      0
  );

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

  type PaymentMethodConfig = Omit<PaymentMethodCardProps, 'selected' | 'disabled' | 'onSelect' | 'delay'> & {
    available: boolean;
  };

  const paymentMethods: PaymentMethodConfig[] = [
    {
      id: 'wave',
      name: 'Wave',
      description: 'Paiement mobile rapide et sécurisé',
      icon: <Smartphone size={24} color={colors.textPrimary} />,
      colors: [colors.wavePrimary, colors.waveSecondary],
      available: true,
    },
    {
      id: 'om',
      name: 'Orange Money',
      description: 'Paiement via Orange Money',
      icon: <CreditCard size={24} color={colors.textPrimary} />,
      colors: [colors.orangeMoneyPrimary, colors.orangeMoneySecondary],
      available: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <PaymentHeader onBack={onBack} disabled={processing} subtitle="Choisissez votre méthode de paiement" />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Order Summary */}
        <AnimatedView entering={FadeIn} style={styles.orderSection}>
          <OrderSummaryCard
            productTitle={productTitle}
            licenseLabel={checkoutData.licenseType}
            basePrice={checkoutData.basePrice}
            commission={checkoutData.commission}
            total={payableAmount}
            currency="F"
          />
        </AnimatedView>

        {/* Payment Methods */}
        <AnimatedView entering={FadeIn.delay(100)} style={styles.methodsSection}>
          <Text style={styles.sectionTitle}>Mode de paiement</Text>
          <View style={styles.methodsList}>
            {paymentMethods.map((method, index) => (
              <PaymentMethodCard
                key={method.id}
                id={method.id}
                name={method.name}
                description={method.description}
                colors={method.colors}
                icon={method.icon}
                selected={selectedMethod === method.id}
                disabled={!method.available || processing}
                onSelect={id => setSelectedMethod(id as PaymentMethod)}
                delay={100 + index * 50}
              />
            ))}
          </View>
        </AnimatedView>

        {/* Phone Number Input */}
        {selectedMethod && (
          <AnimatedView entering={FadeIn.delay(200)} style={styles.phoneSection}>
            <PhoneNumberForm
              label={`Numéro ${selectedMethod === 'wave' ? 'Wave' : 'Orange Money'}`}
              value={phoneNumber}
              onChange={setPhoneNumber}
              disabled={processing}
            />
          </AnimatedView>
        )}

        {/* Security Info */}
        <AnimatedView entering={FadeIn.delay(300)}>
          <SecurityNotice />
        </AnimatedView>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCTA}>
        <PrimaryButton onPress={handlePayment} disabled={!selectedMethod || !phoneNumber || processing} fullWidth>
          {processing ? (
            <View style={styles.processingContent}>
              <ActivityIndicator size="small" color={colors.textPrimary} />
              <Text style={styles.processingText}>Traitement en cours...</Text>
            </View>
          ) : (
            <Text style={styles.payButtonText}>Payer {payableAmount.toLocaleString()} F</Text>
          )}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
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
    gap: spacing.sm,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl - 4, // 28px (between headingLg and displayXl)
    fontFamily: typography.fontFamily.poppins.bold,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl + spacing.xl, // 80px
    gap: spacing.lg,
  },
  orderSection: {
    gap: spacing.md,
  },
  methodsSection: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  methodsList: {
    gap: spacing.md,
  },
  phoneSection: {
    gap: spacing.md,
  },
  bottomCTA: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  processingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  processingText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  payButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
});
