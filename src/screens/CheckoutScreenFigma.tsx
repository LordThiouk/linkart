/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ShoppingCart, Tag, AlertCircle, ChevronRight } from 'lucide-react-native';
import { ImageWithFallback } from '../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../components/atoms/PrimaryButton';
import { InputField } from '../components/atoms/InputField';

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
                <ArrowLeft size={20} color="#D4D4D4" />
              </View>
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <ShoppingCart size={24} color="#6366F1" />
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
                    colors={['#6366F1', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.licenseBadgeGradient}
                  >
                    <Tag size={12} color="#F5F5F5" />
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
                  colors={['#6366F1', '#8B5CF6']}
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
                <AlertCircle size={16} color="#22C55E" />
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
            <AlertCircle size={20} color="#06B6D4" />
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
              <ChevronRight size={20} color="#F5F5F5" />
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
    backgroundColor: '#0A0A0A',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(10, 10, 10, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48, // pt-12
    paddingBottom: 16, // pb-4
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
    paddingHorizontal: 24, // px-6
  },
  backButton: {
    padding: 8, // p-2
    borderRadius: 12, // rounded-xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  backButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 24, // py-6
    gap: 24, // space-y-6
    paddingBottom: 100, // Space for bottom CTA
  },
  productSummary: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  productSummaryRow: {
    flexDirection: 'row',
    gap: 16, // gap-4
    marginBottom: 16, // mb-4
  },
  productImage: {
    width: 80, // w-20
    height: 80, // h-20
    borderRadius: 12, // rounded-xl
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  productArtist: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  licenseBadge: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: 8, // rounded-lg
  },
  licenseBadgeGradient: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 4, // py-1
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4, // gap-1
  },
  licenseBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontFamily: 'Inter_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  licenseFeatures: {
    marginTop: 16, // mt-4
    paddingTop: 16, // pt-4
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  licenseFeaturesTitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    marginBottom: 8,
  },
  licenseFeaturesList: {
    gap: 4, // space-y-1
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  featureDot: {
    width: 6, // w-1.5
    height: 6, // h-1.5
    borderRadius: 3,
    backgroundColor: '#6366F1',
  },
  featureText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  promoSection: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  sectionTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 12, // mb-3
  },
  promoRow: {
    flexDirection: 'row',
    gap: 8, // gap-2
    marginBottom: 8,
  },
  promoInput: {
    flex: 1,
  },
  promoButton: {
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    borderRadius: 12, // rounded-xl
    overflow: 'hidden',
  },
  promoButtonGradient: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoButtonText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
  },
  promoApplied: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    marginTop: 8,
  },
  promoAppliedText: {
    color: '#22C55E',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  priceBreakdown: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12, // space-y-3
  },
  priceLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  priceValue: {
    color: '#D4D4D4',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  discountLabel: {
    color: '#22C55E',
  },
  discountValue: {
    color: '#22C55E',
  },
  totalRow: {
    paddingTop: 12, // pt-3
    borderTopWidth: 1,
    borderTopColor: '#404040',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
  },
  totalValue: {
    color: '#F5F5F5',
    fontSize: 20, // text-xl
    fontFamily: 'Poppins_700Bold',
  },
  commissionInfo: {
    marginTop: 12, // mt-3
    paddingTop: 12, // pt-3
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  commissionText: {
    color: '#737373',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  infoBanner: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-2xl
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
    flexDirection: 'row',
    gap: 12, // gap-3
  },
  infoBannerContent: {
    flex: 1,
  },
  infoBannerTitle: {
    color: '#06B6D4',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  infoBannerText: {
    color: '#06B6D4',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
  },
  proceedButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
  },
  proceedButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
  },
});
