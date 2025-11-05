import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, Share2, FileText, Check, Shield } from 'lucide-react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

interface LicenseContractScreenFigmaProps {
  onBack?: () => void;
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

export function LicenseContractScreenFigma({ onBack, purchaseId }: LicenseContractScreenFigmaProps) {
  const handleDownloadPDF = () => {
    console.log('Downloading PDF contract');
    // Implement PDF download
  };

  const handleShare = () => {
    console.log('Sharing contract');
    // Implement share functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ArrowLeft size={20} color="#D4D4D4" />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Contrat de Licence</Text>
              <Text style={styles.headerSubtitle}>N° {contractData.contractNumber}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleDownloadPDF} style={styles.downloadButton} activeOpacity={0.8}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.downloadButtonGradient}
              >
                <Download size={16} color="#F5F5F5" />
                <Text style={styles.downloadButtonText}>Télécharger PDF</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.shareButton} activeOpacity={0.8}>
              <Share2 size={16} color="#D4D4D4" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Verification Badge */}
        <AnimatedView entering={FadeIn} style={styles.verificationSection}>
          <LinearGradient
            colors={['rgba(6, 182, 212, 0.2)', 'rgba(139, 92, 246, 0.2)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.verificationCard}
          >
            <LinearGradient
              colors={['#06B6D4', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.verificationIcon}
            >
              <Shield size={24} color="#F5F5F5" />
            </LinearGradient>
            <View style={styles.verificationText}>
              <Text style={styles.verificationTitle}>✓ Contrat Vérifié</Text>
              <Text style={styles.verificationSubtitle}>Document légal certifié par Linkart</Text>
            </View>
          </LinearGradient>
        </AnimatedView>

        {/* Contract Details */}
        <AnimatedView entering={FadeIn.delay(100)} style={styles.detailsSection}>
          {/* Product Info */}
          <View style={styles.detailCard}>
            <View style={styles.detailCardHeader}>
              <FileText size={20} color="#6366F1" />
              <Text style={styles.detailCardTitle}>Produit</Text>
            </View>
            <View style={styles.detailCardContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Titre</Text>
                <Text style={styles.detailValue}>{contractData.product.title}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{contractData.product.type}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Licence</Text>
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.licenseBadge}
                >
                  <Text style={styles.licenseBadgeText}>{contractData.product.license}</Text>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Parties */}
          <View style={styles.detailCard}>
            <Text style={styles.detailCardTitle}>Parties</Text>
            <View style={styles.detailCardContent}>
              {/* Buyer */}
              <View style={styles.partySection}>
                <Text style={styles.partyTitle}>👤 Acheteur (Licencié)</Text>
                <View style={styles.partyInfo}>
                  <Text style={styles.partyName}>{contractData.buyer.name}</Text>
                  <Text style={styles.partyDetail}>{contractData.buyer.email}</Text>
                  <Text style={styles.partyDetail}>{contractData.buyer.phone}</Text>
                </View>
              </View>

              {/* Seller */}
              <View style={styles.partySection}>
                <Text style={styles.partyTitleSeller}>🎵 Vendeur (Licenciant)</Text>
                <View style={styles.partyInfo}>
                  <Text style={styles.partyName}>{contractData.seller.artistName}</Text>
                  <Text style={styles.partyDetail}>{contractData.seller.name}</Text>
                  <Text style={styles.partyDetail}>{contractData.seller.email}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Transaction Details */}
          <View style={styles.detailCard}>
            <Text style={styles.detailCardTitle}>Détails de la Transaction</Text>
            <View style={styles.detailCardContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date d'achat</Text>
                <Text style={styles.detailValue}>
                  {new Date(contractData.purchaseDate).toLocaleDateString('fr-FR')}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Montant payé</Text>
                <Text style={styles.detailValuePrice}>{contractData.price.toLocaleString()} F CFA</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Méthode de paiement</Text>
                <Text style={styles.detailValue}>Wallet Linkart</Text>
              </View>
            </View>
          </View>

          {/* Terms & Conditions */}
          <View style={styles.detailCard}>
            <Text style={styles.detailCardTitle}>Conditions d'Utilisation</Text>
            <View style={styles.termsList}>
              {contractData.terms.map((term, index) => (
                <View key={index} style={styles.termItem}>
                  <LinearGradient
                    colors={['#06B6D4', '#8B5CF6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.termIcon}
                  >
                    <Check size={12} color="#F5F5F5" />
                  </LinearGradient>
                  <Text style={styles.termText}>{term}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Legal Notice */}
          <View style={styles.legalNotice}>
            <Text style={styles.legalNoticeText}>
              Ce contrat est régi par les lois de la République de Côte d'Ivoire. En acceptant cette licence, vous
              reconnaissez avoir lu et accepté tous les termes ci-dessus. Pour toute question juridique, contactez
              legal@linkart.com
            </Text>
          </View>

          {/* Digital Signature */}
          <AnimatedView entering={FadeIn.delay(200)} style={styles.signatureSection}>
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signatureCard}
            >
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.signatureIcon}
              >
                <Check size={32} color="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.signatureTitle}>Signature Numérique Vérifiée</Text>
              <Text style={styles.signatureDate}>{new Date(contractData.purchaseDate).toLocaleString('fr-FR')}</Text>
            </LinearGradient>
          </AnimatedView>
        </AnimatedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  headerContent: {
    gap: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  headerTitle: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  downloadButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  downloadButtonText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  shareButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  verificationSection: {
    padding: 24,
    paddingBottom: 16,
  },
  verificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  verificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationText: {
    flex: 1,
    gap: 4,
  },
  verificationTitle: {
    color: '#06B6D4',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  verificationSubtitle: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  detailsSection: {
    padding: 24,
    paddingTop: 16,
    gap: 24,
  },
  detailCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 12,
  },
  detailCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  detailCardTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
  },
  detailCardContent: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  detailValue: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '400',
  },
  detailValuePrice: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
  },
  licenseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  licenseBadgeText: {
    color: '#F5F5F5',
    fontSize: 12,
    fontWeight: '600',
  },
  partySection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  partyTitle: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  partyTitleSeller: {
    color: '#EC4899',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  partyInfo: {
    gap: 4,
  },
  partyName: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  partyDetail: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  termsList: {
    gap: 12,
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  termIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  termText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
    flex: 1,
  },
  legalNotice: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
  },
  legalNoticeText: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  signatureSection: {
    padding: 24,
    paddingTop: 16,
  },
  signatureCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    alignItems: 'center',
    gap: 12,
  },
  signatureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  signatureTitle: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  signatureDate: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
});
