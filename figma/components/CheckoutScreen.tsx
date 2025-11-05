import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingCart, Tag, AlertCircle, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PrimaryButton } from './PrimaryButton';

interface CheckoutScreenProps {
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

export function CheckoutScreen({
  onBack,
  onProceedToPayment,
  productId,
  productTitle,
  productType,
  artistName,
  coverImage,
  selectedLicense,
}: CheckoutScreenProps) {
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
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-[#6366F1]" />
                <h1 className="text-[#F5F5F5]">Finaliser l'achat</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Product Summary */}
        <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
          <div className="flex gap-4">
            <ImageWithFallback src={coverImage} alt={productTitle} className="w-20 h-20 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="text-[#F5F5F5] mb-1">{productTitle}</h3>
              <p className="text-[#A3A3A3] text-sm mb-2">{artistName}</p>
              <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
                <Tag className="w-3 h-3 text-[#F5F5F5]" />
                <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">{selectedLicense.name}</span>
              </div>
            </div>
          </div>

          {/* License Features */}
          <div className="mt-4 pt-4 border-t border-[#404040]">
            <p className="text-[#A3A3A3] text-sm mb-2">Cette licence inclut :</p>
            <div className="space-y-1">
              {selectedLicense.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  <span className="text-[#D4D4D4] text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Promo Code */}
        <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
          <h3 className="text-[#F5F5F5] mb-3">Code promo</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value.toUpperCase())}
              placeholder="LINKART10"
              disabled={promoApplied}
              className="flex-1 px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#404040] text-[#F5F5F5] placeholder-[#737373] focus:border-[#6366F1] focus:outline-none disabled:opacity-50"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleApplyPromo}
              disabled={promoApplied || !promoCode}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Appliquer
            </motion.button>
          </div>
          {promoApplied && (
            <div className="flex items-center gap-2 mt-2 text-[#10B981] text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Code promo appliqué : -10%</span>
            </div>
          )}
        </div>

        {/* Price Breakdown */}
        <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
          <h3 className="text-[#F5F5F5] mb-4">Résumé</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#A3A3A3] text-sm">Prix</span>
              <span className="text-[#D4D4D4]">{basePrice.toLocaleString()} F</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between items-center">
                <span className="text-[#10B981] text-sm">Réduction (10%)</span>
                <span className="text-[#10B981]">-{discount.toLocaleString()} F</span>
              </div>
            )}

            <div className="pt-3 border-t border-[#404040]">
              <div className="flex justify-between items-center">
                <span className="text-[#F5F5F5]">Total à payer</span>
                <span className="text-[#F5F5F5] text-xl">{total.toLocaleString()} F</span>
              </div>
            </div>
          </div>

          {/* Info about commission (transparent to buyer) */}
          <div className="mt-3 pt-3 border-t border-[#404040]">
            <p className="text-[#737373] text-xs">
              💡 Aucun frais supplémentaire. La commission de 5% est déduite du vendeur.
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-4 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/30">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[#06B6D4] text-sm mb-1">
                <strong>Paiement transparent</strong>
              </p>
              <p className="text-[#06B6D4] text-xs leading-relaxed">
                Vous payez exactement le prix affiché. Après paiement, vous recevrez immédiatement votre contrat de
                licence et vos fichiers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 px-6 py-4 bg-[#0A0A0A] border-t border-[#404040]/50">
        <PrimaryButton onClick={handleProceed} fullWidth>
          <div className="flex items-center justify-center gap-2">
            <span>Procéder au paiement</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </PrimaryButton>
      </div>
    </div>
  );
}
