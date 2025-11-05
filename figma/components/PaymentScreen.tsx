import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Smartphone, CreditCard, CheckCircle, Loader2, Shield } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { toast } from 'sonner@2.0.3';

interface PaymentScreenProps {
  onBack: () => void;
  onPaymentSuccess: (transactionId: string) => void;
  checkoutData: {
    productId: string;
    licenseType: string;
    basePrice: number;
    commission: number;
    total: number;
  };
  productTitle: string;
  accessToken: string | null;
}

type PaymentMethod = 'wave' | 'om' | null;

export function PaymentScreen({
  onBack,
  onPaymentSuccess,
  checkoutData,
  productTitle,
  accessToken,
}: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [processing, setProcessing] = useState(false);

  async function handlePayment() {
    if (!selectedMethod) {
      toast.error('Veuillez sélectionner un mode de paiement');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Numéro de téléphone invalide');
      return;
    }

    if (!accessToken) {
      toast.error('Vous devez être connecté');
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment API call
      // In production, this would call the backend payment endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock transaction ID
      const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Call success callback
      onPaymentSuccess(transactionId);

      toast.success('Paiement effectué avec succès !');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Erreur lors du paiement. Veuillez réessayer.');
      setProcessing(false);
    }
  }

  const paymentMethods = [
    {
      id: 'wave' as const,
      name: 'Wave',
      description: 'Paiement mobile rapide et sécurisé',
      icon: Smartphone,
      color: 'from-[#00D9FF] to-[#0099FF]',
      available: true,
    },
    {
      id: 'om' as const,
      name: 'Orange Money',
      description: 'Paiement via Orange Money',
      icon: CreditCard,
      color: 'from-[#FF7900] to-[#FFB84D]',
      available: true,
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              disabled={processing}
              className="p-2 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#10B981]" />
                <h1 className="text-[#F5F5F5]">Paiement sécurisé</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Order Summary */}
        <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
          <h3 className="text-[#F5F5F5] mb-3">Commande</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[#A3A3A3] text-sm">{productTitle}</span>
              <span className="text-[#D4D4D4] text-sm">{checkoutData.licenseType}</span>
            </div>
            <div className="pt-2 border-t border-[#404040]">
              <div className="flex justify-between items-center">
                <span className="text-[#F5F5F5]">Montant total</span>
                <span className="text-[#F5F5F5] text-xl">{checkoutData.total.toLocaleString()} F</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-[#F5F5F5] mb-3">Mode de paiement</h3>
          <div className="space-y-3">
            {paymentMethods.map(method => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;

              return (
                <motion.button
                  key={method.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={!method.available || processing}
                  className={`w-full p-4 rounded-2xl border-2 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r ' + method.color + ' border-transparent'
                      : 'bg-[#111111] border-[#404040] hover:border-[#6366F1]/50'
                  } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20' : 'bg-gradient-to-r ' + method.color
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-[#F5F5F5]'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className={`mb-1 ${isSelected ? 'text-white' : 'text-[#F5F5F5]'}`}>{method.name}</h4>
                      <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-[#A3A3A3]'}`}>
                        {method.description}
                      </p>
                    </div>
                    {isSelected && <CheckCircle className="w-6 h-6 text-white" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Phone Number Input */}
        {selectedMethod && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h3 className="text-[#F5F5F5]">Numéro {selectedMethod === 'wave' ? 'Wave' : 'Orange Money'}</h3>
            <input
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="+225 07 00 00 00 00"
              disabled={processing}
              className="w-full px-4 py-4 rounded-xl bg-[#111111] border border-[#404040] text-[#F5F5F5] placeholder-[#737373] focus:border-[#6366F1] focus:outline-none text-lg disabled:opacity-50"
            />
            <p className="text-[#737373] text-xs">Vous recevrez une notification pour valider le paiement</p>
          </motion.div>
        )}

        {/* Security Info */}
        <div className="p-4 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-[#10B981] text-sm mb-1">
                <strong>Paiement 100% sécurisé</strong>
              </p>
              <p className="text-[#10B981] text-xs leading-relaxed">
                Vos informations bancaires sont chiffrées et sécurisées. Nous ne stockons jamais vos données de
                paiement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="sticky bottom-0 px-6 py-4 bg-[#0A0A0A] border-t border-[#404040]/50">
        <PrimaryButton onClick={handlePayment} disabled={!selectedMethod || !phoneNumber || processing} fullWidth>
          {processing ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Traitement en cours...</span>
            </div>
          ) : (
            <span>Payer {checkoutData.total.toLocaleString()} F</span>
          )}
        </PrimaryButton>
      </div>
    </div>
  );
}
