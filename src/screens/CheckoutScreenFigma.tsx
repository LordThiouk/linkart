/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ShoppingCart, Tag, AlertCircle, ChevronRight } from 'lucide-react-native';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { InputField } from '../components/atoms/InputField';
import { colors, spacing, typography, radii } from '@/theme';

interface CheckoutScreenFigmaProps {
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.9}>
              <View style={styles.backButtonInner}>
                <ArrowLeft size={20} color={colors.textSecondary} />
              </View>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <ShoppingCart size={24} color={colors.primary} />
              <Text style={styles.headerTitle}>Finaliser l'achat</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Product Summary */}
          <View style={styles.productSummary}>
            <View style={styles.productSummaryRow}>
              <ImageWithFallback src={coverImage} alt={productTitle} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{productTitle}</Text>
                <Text style={styles.productArtist}>{artistName}</Text>
                <View style={styles.licenseBadge}>
                  <LinearGradient
                    colors={[colors.primary, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.licenseBadgeGradient}
                  >
                    <Tag size={12} color={colors.textPrimary} />
                    <Text style={styles.licenseBadgeText}>{selectedLicense.name}</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>

            {/* License Features */}
            <View style={styles.licenseFeatures}>
              <Text style={styles.licenseFeaturesTitle}>Cette licence inclut :</Text>
              <View style={styles.licenseFeaturesList}>
                {selectedLicense.features.map((feature, index) => (
                  <View key={index} style={styles.licenseFeature}>
                    <View style={styles.featureDot} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Promo Code */}
          <View style={styles.promoSection}>
            <Text style={styles.sectionTitle}>Code promo</Text>
            <View style={styles.promoRow}>
              <InputField
                value={promoCode}
                onChangeText={setPromoCode}
                placeholder="LINKART10"
                editable={!promoApplied}
                containerStyle={styles.promoInput}
              />
              <TouchableOpacity
                onPress={handleApplyPromo}
                disabled={promoApplied || !promoCode}
                style={styles.promoButton}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.promoButtonGradient}
                >
                  <Text style={styles.promoButtonText}>Appliquer</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {promoApplied && (
              <View style={styles.promoApplied}>
                <AlertCircle size={16} color={colors.success} />
                <Text style={styles.promoAppliedText}>Code promo appliqué : -10%</Text>
              </View>
            )}
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceBreakdown}>
            <Text style={styles.sectionTitle}>Résumé</Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Prix</Text>
              <Text style={styles.priceValue}>{basePrice.toLocaleString()} F</Text>
            </View>

            {promoApplied && (
              <View style={styles.priceRow}>
                <Text style={[styles.priceLabel, styles.discountLabel]}>Réduction (10%)</Text>
                <Text style={[styles.priceValue, styles.discountValue]}>-{discount.toLocaleString()} F</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total à payer</Text>
              <Text style={styles.totalValue}>{total.toLocaleString()} F</Text>
            </View>

            {/* Info about commission */}
            <View style={styles.commissionInfo}>
              <Text style={styles.commissionText}>
                💡 Aucun frais supplémentaire. La commission de 5% est déduite du vendeur.
              </Text>
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <AlertCircle size={20} color={colors.cyan} />
            <View style={styles.infoBannerContent}>
              <Text style={styles.infoBannerTitle}>Paiement transparent</Text>
              <Text style={styles.infoBannerText}>
                Vous payez exactement le prix affiché. Après paiement, vous recevrez immédiatement votre contrat de
                licence et vos fichiers.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom CTA */}
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
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)', // colors.background with opacity
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
    paddingTop: spacing.xxl,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl + spacing.xl + spacing.md, // Space for bottom CTA (100px)
  },
  productSummary: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  productSummaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  productImage: {
    width: 80, // w-20 (specific size)
    height: 80, // h-20
    borderRadius: radii.md,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  productArtist: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  licenseBadge: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: radii.sm,
  },
  licenseBadgeGradient: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  licenseFeatures: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  licenseFeaturesTitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.sm,
  },
  licenseFeaturesList: {
    gap: spacing.xs,
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureDot: {
    width: 6, // w-1.5 (specific size)
    height: 6, // h-1.5
    borderRadius: radii.full, // 3 = width/2 (circle)
    backgroundColor: colors.primary,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  promoSection: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md,
  },
  promoRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  promoInput: {
    flex: 1,
  },
  promoButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  promoButtonGradient: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  promoApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  promoAppliedText: {
    color: colors.success,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  priceBreakdown: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  priceLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  priceValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  discountLabel: {
    color: colors.success,
  },
  discountValue: {
    color: colors.success,
  },
  totalRow: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  totalValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd + 2, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
  },
  commissionInfo: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  commissionText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  infoBanner: {
    padding: spacing.md,
    borderRadius: radii.xxl,
    backgroundColor: 'rgba(6, 182, 212, 0.1)', // colors.cyan with opacity
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)', // colors.cyan with opacity
    flexDirection: 'row',
    gap: spacing.md,
  },
  infoBannerContent: {
    flex: 1,
  },
  infoBannerTitle: {
    color: colors.cyan,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  infoBannerText: {
    color: colors.cyan,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: 18,
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
    borderTopColor: 'rgba(64, 64, 64, 0.5)', // colors.border with opacity
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
