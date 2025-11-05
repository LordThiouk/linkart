import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Share2, FileText, Check, Shield } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

interface LicenseContractScreenProps {
  onBack: () => void;
  purchaseId: string;
}

const contractData = {
  contractNumber: 'LKT-2024-001243',
  purchaseDate: '2024-11-01',
  buyer: {
    name: 'Jean Kouassi',
    email: 'jean.kouassi@email.com',
    phone: '+225 07 XX XX XX XX',
  },
  seller: {
    name: 'DJ Shadow',
    artistName: 'DJ Shadow Productions',
    email: 'djshadow@linkart.com',
  },
  product: {
    title: 'Midnight Vibes',
    type: 'Beat Instrumental',
    license: 'Premium License',
  },
  price: 49000,
  terms: [
    "Droit d'utilisation pour distribution jusqu'à 10 000 streams",
    'Crédit artistique optionnel',
    'Usage commercial autorisé',
    'Pas de revente du beat en tant que tel',
    'Fichiers MP3, WAV et Stems inclus',
    'Support technique pendant 30 jours',
  ],
};

export function LicenseContractScreen({ onBack, purchaseId }: LicenseContractScreenProps) {
  const handleDownloadPDF = () => {
    console.log('Downloading PDF contract');
    // Implement PDF download
  };

  const handleShare = () => {
    console.log('Sharing contract');
    // Implement share functionality
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20">
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
              <h1 className="text-[#F5F5F5] mb-1">Contrat de Licence</h1>
              <p className="text-[#A3A3A3] text-sm">N° {contractData.contractNumber}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Télécharger PDF</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#111111] border border-[#404040] text-[#D4D4D4]"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Verification Badge */}
        <div className="px-6 py-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#8B5CF6]/20 border border-[#06B6D4]/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#F5F5F5]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[#06B6D4] mb-1">✓ Contrat Vérifié</h3>
                <p className="text-[#D4D4D4] text-sm">Document légal certifié par Linkart</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Details */}
        <div className="px-6 py-4 space-y-6">
          {/* Product Info */}
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-[#6366F1]" />
              <h3 className="text-[#F5F5F5]">Produit</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#A3A3A3] text-sm">Titre</span>
                <span className="text-[#F5F5F5] text-sm">{contractData.product.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3A3A3] text-sm">Type</span>
                <span className="text-[#F5F5F5] text-sm">{contractData.product.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3A3A3] text-sm">Licence</span>
                <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5] text-xs">
                  {contractData.product.license}
                </span>
              </div>
            </div>
          </div>

          {/* Parties */}
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
            <h3 className="text-[#F5F5F5] mb-3">Parties</h3>

            {/* Buyer */}
            <div className="mb-4 pb-4 border-b border-[#404040]">
              <p className="text-[#6366F1] text-sm mb-2">👤 Acheteur (Licencié)</p>
              <div className="space-y-1">
                <p className="text-[#F5F5F5] text-sm">{contractData.buyer.name}</p>
                <p className="text-[#A3A3A3] text-xs">{contractData.buyer.email}</p>
                <p className="text-[#A3A3A3] text-xs">{contractData.buyer.phone}</p>
              </div>
            </div>

            {/* Seller */}
            <div>
              <p className="text-[#EC4899] text-sm mb-2">🎵 Vendeur (Licenciant)</p>
              <div className="space-y-1">
                <p className="text-[#F5F5F5] text-sm">{contractData.seller.artistName}</p>
                <p className="text-[#A3A3A3] text-xs">{contractData.seller.name}</p>
                <p className="text-[#A3A3A3] text-xs">{contractData.seller.email}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
            <h3 className="text-[#F5F5F5] mb-3">Détails de la Transaction</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#A3A3A3] text-sm">Date d'achat</span>
                <span className="text-[#F5F5F5] text-sm">
                  {new Date(contractData.purchaseDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3A3A3] text-sm">Montant payé</span>
                <span className="text-[#6366F1]">{contractData.price.toLocaleString()} F CFA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A3A3A3] text-sm">Méthode de paiement</span>
                <span className="text-[#F5F5F5] text-sm">Wallet Linkart</span>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
            <h3 className="text-[#F5F5F5] mb-3">Conditions d'Utilisation</h3>
            <div className="space-y-3">
              {contractData.terms.map((term, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-5 h-5 mt-0.5 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#F5F5F5]" />
                  </div>
                  <p className="text-[#D4D4D4] text-sm flex-1">{term}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#404040]">
            <p className="text-[#A3A3A3] text-xs leading-relaxed">
              Ce contrat est régi par les lois de la République de Côte d'Ivoire. En acceptant cette licence, vous
              reconnaissez avoir lu et accepté tous les termes ci-dessus. Pour toute question juridique, contactez
              legal@linkart.com
            </p>
          </div>

          {/* Digital Signature */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <Check className="w-8 h-8 text-[#F5F5F5]" />
              </div>
              <p className="text-[#6366F1] mb-1">Signature Numérique Vérifiée</p>
              <p className="text-[#A3A3A3] text-xs">{new Date(contractData.purchaseDate).toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
