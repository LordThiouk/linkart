import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText } from 'lucide-react-native';
import {
  ContractHeader,
  ContractVerificationBadge,
  ContractDetailsCard,
  ContractTermsSection,
  ContractSignatureSection,
  type DetailRow,
  type Party,
} from '../components';
import { colors, spacing } from '@/theme';

export interface LicenseContractScreenFigmaProps {
  onBack?: () => void;
  purchaseId: string;
  contractData?: {
    contractNumber: string;
    purchaseDate: string;
    buyer: {
      name: string;
      email: string;
      phone: string;
    };
    seller: {
      name: string;
      artistName: string;
      email: string;
    };
    product: {
      title: string;
      type: string;
      license: string;
    };
    price: number;
    terms: string[];
  };
}

const defaultContractData = {
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

export function LicenseContractScreenFigma({
  onBack,
  purchaseId,
  contractData = defaultContractData,
}: LicenseContractScreenFigmaProps) {
  const handleDownloadPDF = () => {
    console.log('Downloading PDF contract');
    // Implement PDF download
  };

  const handleShare = () => {
    console.log('Sharing contract');
    // Implement share functionality
  };

  const productRows: DetailRow[] = [
    { label: 'Titre', value: contractData.product.title },
    { label: 'Type', value: contractData.product.type },
    { label: 'Licence', value: '', badge: contractData.product.license },
  ];

  const parties: Party[] = [
    {
      title: '👤 Acheteur (Licencié)',
      name: contractData.buyer.name,
      details: [contractData.buyer.email, contractData.buyer.phone],
    },
    {
      title: '🎵 Vendeur (Licenciant)',
      titleColor: colors.accent,
      name: contractData.seller.artistName,
      details: [contractData.seller.name, contractData.seller.email],
    },
  ];

  const transactionRows: DetailRow[] = [
    { label: "Date d'achat", value: new Date(contractData.purchaseDate).toLocaleDateString('fr-FR') },
    { label: 'Montant payé', value: `${contractData.price.toLocaleString()} F CFA`, isPrice: true },
    { label: 'Méthode de paiement', value: 'Wallet Linkart' },
  ];

  const legalNotice =
    "Ce contrat est régi par les lois de la République de Côte d'Ivoire. En acceptant cette licence, vous reconnaissez avoir lu et accepté tous les termes ci-dessus. Pour toute question juridique, contactez legal@linkart.com";

  return (
    <SafeAreaView style={styles.container}>
      <ContractHeader
        contractNumber={contractData.contractNumber}
        onBack={onBack}
        onDownload={handleDownloadPDF}
        onShare={handleShare}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        <ContractVerificationBadge title="✓ Contrat Vérifié" subtitle="Document légal certifié par Linkart" />

        <ContractDetailsCard
          type="product"
          title="Produit"
          icon={<FileText size={20} color={colors.primary} />}
          rows={productRows}
        />

        <ContractDetailsCard type="parties" title="Parties" parties={parties} />

        <ContractDetailsCard type="transaction" title="Détails de la Transaction" rows={transactionRows} />

        <ContractTermsSection title="Conditions d'Utilisation" terms={contractData.terms} />

        <ContractSignatureSection
          title="Signature Numérique Vérifiée"
          date={new Date(contractData.purchaseDate).toLocaleString('fr-FR')}
          legalNotice={legalNotice}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl,
  },
});
