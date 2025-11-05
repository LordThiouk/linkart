import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Package, User, Info, Check } from 'lucide-react';
import { BoostCard } from './BoostCard';
import { PrimaryButton } from './PrimaryButton';

interface BoostScreenProps {
  onBack: () => void;
  itemType: 'product' | 'profile';
  itemName?: string;
}

const boostPlans = [
  {
    duration: '24h' as const,
    price: 2500,
    views: '500-1000',
    isPopular: false,
  },
  {
    duration: '7j' as const,
    price: 12000,
    views: '5k-10k',
    isPopular: true,
  },
  {
    duration: '30j' as const,
    price: 35000,
    views: '25k-50k',
    isPopular: false,
  },
];

export function BoostScreen({ onBack, itemType, itemName }: BoostScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<'24h' | '7j' | '30j' | null>(null);

  const handlePurchaseBoost = () => {
    if (!selectedPlan) return;
    // Handle boost purchase
    console.log('Purchasing boost:', selectedPlan);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-[#F5F5F5] mb-1">Booster la visibilité</h1>
              <p className="text-[#A3A3A3] text-sm">
                {itemType === 'product' ? '📦 Produit' : '👤 Profil'} • {itemName || 'Sélection'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Section */}
        <div className="px-6 py-6">
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#6366F1]/20 via-[#8B5CF6]/20 to-[#EC4899]/20 border border-[#6366F1]/30 overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <Zap className="w-8 h-8 text-[#F5F5F5] fill-current" />
              </div>
              <h2 className="text-[#F5F5F5] mb-2">Augmentez votre visibilité</h2>
              <p className="text-[#D4D4D4] text-sm mb-4">
                Apparaissez en tête des résultats de recherche et attirez plus de clients
              </p>

              {/* Benefits */}
              <div className="space-y-2">
                {[
                  'Mise en avant dans les résultats',
                  'Badge "Boosté" sur votre contenu',
                  'Statistiques détaillées en temps réel',
                  'Ciblage géographique automatique',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#F5F5F5]" />
                    </div>
                    <span className="text-[#D4D4D4] text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5F5]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/3 w-24 h-24 bg-[#EC4899]/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-6 py-2">
          <div className="flex gap-3 p-4 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/30">
            <Info className="w-5 h-5 text-[#06B6D4] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#06B6D4] text-sm mb-1">💡 Astuce</p>
              <p className="text-[#D4D4D4] text-sm">
                Les boosts de 7 jours offrent le meilleur rapport qualité-prix et permettent une exposition continue
              </p>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="px-6 py-6">
          <h3 className="text-[#F5F5F5] mb-4">Choisissez votre durée</h3>
          <div className="grid grid-cols-1 gap-4">
            {boostPlans.map((plan, index) => (
              <motion.div
                key={plan.duration}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPlan(plan.duration)}
              >
                <div className="relative">
                  <BoostCard {...plan} onSelect={() => setSelectedPlan(plan.duration)} />
                  {selectedPlan === plan.duration && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-[#F5F5F5]" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Preview */}
        <div className="px-6 py-4">
          <h3 className="text-[#F5F5F5] mb-4">Résultats attendus</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Vues', value: '+350%', icon: '👁️' },
              { label: 'Clics', value: '+240%', icon: '🎯' },
              { label: 'Ventes', value: '+180%', icon: '💰' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-[#111111] border border-[#404040] text-center"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-[#06B6D4] mb-1">{stat.value}</div>
                <div className="text-[#A3A3A3] text-xs">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      {selectedPlan && (
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent border-t border-[#404040]/50">
          <div className="max-w-[375px] mx-auto">
            <PrimaryButton onClick={handlePurchaseBoost} className="w-full flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 fill-current" />
              Acheter le boost {selectedPlan} -{' '}
              {boostPlans.find(p => p.duration === selectedPlan)?.price.toLocaleString()} F
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
