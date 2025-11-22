import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { PrimaryButton } from '@/components/atoms/PrimaryButton';
import { colors, spacing, typography } from '@/theme';
import { hexToRgba } from '@/theme/helpers';
import {
  CheckoutHeader,
  ProductSummaryCard,
  PromoCodeSection,
  PriceBreakdownCard,
  CheckoutInfoBanner,
} from '@/features/checkout/components';

export interface CheckoutScreenFigmaProps {
  onBack: () => void;
  onProceedToPayment: (data: CheckoutData) => void;
  productId: string;
  productTitle: string;
  productType: 'beat' | 'kit' | 'sample';
  artistName: string;
  coverImage: string;
  selectedLicense: {
    name: string;
    price: number;
    features: string[];
  };
}

export interface CheckoutData {
  productId: string;
  licenseType: string;
  price: number;
  total: number;
}

export function CheckoutScreenFigma({
  onBack,
  onProceedToPayment,
  productId,
  productTitle,
  productType,
  artistName,
  coverImage,
  selectedLicense,
}: CheckoutScreenFigmaProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Calculate prices - Commission is deducted from seller, NOT added to buyer
  const basePrice = selectedLicense.price;
  const discount = promoApplied ? Math.round(basePrice * 0.1) : 0; // 10% promo
  const total = basePrice - discount;

  function handleApplyPromo() {
    if (promoCode.toUpperCase() === 'LINKART10') {
      setPromoApplied(true);
    }
  }

  function handleProceed() {
    onProceedToPayment({
      productId,
      licenseType: selectedLicense.name,
      price: basePrice,
      total,
    });
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <CheckoutHeader onBack={onBack} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <ProductSummaryCard
            productTitle={productTitle}
            artistName={artistName}
            coverImage={coverImage}
            license={selectedLicense}
          />

          <PromoCodeSection
            promoCode={promoCode}
            onPromoCodeChange={setPromoCode}
            promoApplied={promoApplied}
            onApplyPromo={handleApplyPromo}
          />

          <PriceBreakdownCard basePrice={basePrice} discount={discount} total={total} />

          <CheckoutInfoBanner />
        </ScrollView>

        <View style={styles.bottomCTA}>
          <PrimaryButton onPress={handleProceed} fullWidth>
            <View style={styles.proceedButtonContent}>
              <Text style={styles.proceedButtonText}>Procéder au paiement</Text>
              <ChevronRight size={20} color={colors.textPrimary} />
            </View>
          </PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl + spacing.xl + spacing.md,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: hexToRgba(colors.border, 0.5),
  },
  proceedButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  proceedButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
});
