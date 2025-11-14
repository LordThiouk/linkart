import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, ColorValue } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Smartphone, CreditCard, CheckCircle, Shield } from 'lucide-react-native';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { InputField } from '../../components/atoms/InputField';
import { colors, spacing, typography, radii } from '@/theme';

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
      colors: ['#00D9FF', '#0099FF'] as [ColorValue, ColorValue], // Wave brand colors (specific)
      available: true,
    },
    {
      id: 'om' as const,
      name: 'Orange Money',
      description: 'Paiement via Orange Money',
      icon: CreditCard,
      colors: ['#FF7900', '#FFB84D'] as [ColorValue, ColorValue], // Orange Money brand colors (specific)
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
                <ArrowLeft size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <View style={styles.headerTitleRow}>
                <Shield size={24} color={colors.success} />
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
                          <Icon size={24} color={colors.textPrimary} />
                        </View>
                        <View style={styles.methodInfo}>
                          <Text style={styles.methodNameSelected}>{method.name}</Text>
                          <Text style={styles.methodDescriptionSelected}>{method.description}</Text>
                        </View>
                        <CheckCircle size={24} color={colors.textPrimary} />
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
                        <Icon size={24} color={colors.textPrimary} />
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
            <Shield size={20} color={colors.success} />
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
              <ActivityIndicator size="small" color={colors.textPrimary} />
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
  orderCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md,
  },
  orderContent: {
    gap: spacing.md,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  orderValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  orderDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  orderTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderTotalLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  orderTotalValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
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
  methodCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  methodCardSelected: {
    borderWidth: 0,
  },
  methodCardDisabled: {
    opacity: 0.5,
  },
  methodCardGradient: {
    padding: spacing.md,
  },
  methodCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  methodIconContainer: {
    width: 48, // w-12 (specific size)
    height: 48, // h-12
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  methodName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  methodDescription: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  methodNameSelected: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  methodDescriptionSelected: {
    color: 'rgba(245, 245, 245, 0.8)', // colors.textPrimary with opacity
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  phoneSection: {
    gap: spacing.md,
  },
  phoneInput: {
    marginBottom: spacing.sm,
  },
  phoneHint: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  securitySection: {
    gap: spacing.md,
  },
  securityCard: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(16, 185, 129, 0.1)', // colors.success with opacity
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)', // colors.success with opacity
  },
  securityText: {
    flex: 1,
    gap: spacing.xs,
  },
  securityTitle: {
    color: colors.success,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.xs,
  },
  securityTitleBold: {
    fontFamily: typography.fontFamily.poppins.bold,
  },
  securityDescription: {
    color: colors.success,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 18,
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
