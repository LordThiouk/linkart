import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Download, FileText, Home, Package } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface PaymentSuccessScreenProps {
  onGoHome: () => void;
  onViewPurchases: () => void;
  onDownload: () => void;
  transactionId: string;
  productTitle: string;
  licenseType: string;
  amount: number;
}

export function PaymentSuccessScreen({
  onGoHome,
  onViewPurchases,
  onDownload,
  transactionId,
  productTitle,
  licenseType,
  amount,
}: PaymentSuccessScreenProps) {
  // Confetti animation on mount
  useEffect(() => {
    // Could add confetti library here
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
          className="relative mb-6"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-[#F5F5F5]" />
          </div>

          {/* Pulse rings */}
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-[#10B981] opacity-0"
          />
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute inset-0 rounded-full bg-[#10B981] opacity-0"
          />
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-[#F5F5F5] mb-2">Paiement réussi !</h1>
          <p className="text-[#A3A3A3]">Votre achat a été confirmé avec succès</p>
        </motion.div>

        {/* Purchase Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-md mb-8"
        >
          <div className="p-6 rounded-2xl bg-[#111111] border border-[#404040]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[#A3A3A3] text-sm">Produit</span>
                <span className="text-[#F5F5F5] text-right">{productTitle}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#A3A3A3] text-sm">Licence</span>
                <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">
                  <span className="text-[#F5F5F5] text-xs uppercase tracking-wide">{licenseType}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#A3A3A3] text-sm">Montant payé</span>
                <span className="text-[#10B981]">{amount.toLocaleString()} F</span>
              </div>

              <div className="pt-3 border-t border-[#404040]">
                <div className="flex justify-between items-center">
                  <span className="text-[#A3A3A3] text-sm">ID Transaction</span>
                  <span className="text-[#737373] text-xs font-mono">{transactionId}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-md mb-8"
        >
          <h3 className="text-[#F5F5F5] mb-3 text-center">Prochaines étapes</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#111111] border border-[#404040]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-[#F5F5F5]" />
              </div>
              <div className="flex-1">
                <p className="text-[#F5F5F5] text-sm mb-1">Contrat de licence disponible</p>
                <p className="text-[#737373] text-xs">Téléchargez votre contrat PDF depuis "Mes Achats"</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#111111] border border-[#404040]">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0">
                <Download className="w-4 h-4 text-[#F5F5F5]" />
              </div>
              <div className="flex-1">
                <p className="text-[#F5F5F5] text-sm mb-1">Fichiers prêts au téléchargement</p>
                <p className="text-[#737373] text-xs">Téléchargez vos fichiers audio haute qualité</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full max-w-md space-y-3"
        >
          <PrimaryButton onClick={onDownload} fullWidth>
            <div className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              <span>Télécharger maintenant</span>
            </div>
          </PrimaryButton>

          <button
            onClick={onViewPurchases}
            className="w-full px-6 py-4 rounded-xl bg-[#111111] border border-[#404040] text-[#F5F5F5] hover:border-[#6366F1]/50 transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              <span>Voir mes achats</span>
            </div>
          </button>

          <button
            onClick={onGoHome}
            className="w-full px-6 py-4 rounded-xl bg-transparent text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              <span>Retour à l'accueil</span>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
