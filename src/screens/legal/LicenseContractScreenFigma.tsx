import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Download, Share2, FileText, Check, Shield } from 'lucide-react-native';
import { colors, spacing, typography, radii } from '@/theme';
import { hexToRgba } from '@/theme/helpers';

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
                <ArrowLeft size={20} color={colors.textSecondary} />
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
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.downloadButtonGradient}
              >
                <Download size={16} color={colors.textPrimary} />
                <Text style={styles.downloadButtonText}>Télécharger PDF</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.shareButton} activeOpacity={0.8}>
              <Share2 size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Verification Badge */}
        <AnimatedView entering={FadeIn} style={styles.verificationSection}>
          <LinearGradient
            colors={[hexToRgba(colors.cyan, 0.2), hexToRgba(colors.primaryDark, 0.2)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.verificationCard}
          >
            <LinearGradient
              colors={[colors.cyan, colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.verificationIcon}
            >
              <Shield size={24} color={colors.textPrimary} />
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
              <FileText size={20} color={colors.primary} />
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
                  colors={[colors.primary, colors.primaryDark]}
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
                    colors={[colors.cyan, colors.primaryDark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.termIcon}
                  >
                    <Check size={12} color={colors.textPrimary} />
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
              colors={[hexToRgba(colors.primary, 0.1), hexToRgba(colors.primaryDark, 0.1)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signatureCard}
            >
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.signatureIcon}
              >
                <Check size={32} color={colors.textPrimary} />
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
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: hexToRgba(colors.border, 0.5),
    paddingTop: spacing.xxl + spacing.lg, // 48px
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerText: {
    flex: 1,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg + 4, // 28px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  downloadButton: {
    flex: 1,
    borderRadius: radii.md,
    overflow: 'hidden',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  downloadButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  shareButton: {
    padding: spacing.sm,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl, // 80px
  },
  verificationSection: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  verificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // 12px
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: hexToRgba(colors.cyan, 0.3),
  },
  verificationIcon: {
    width: spacing.xxl * 2, // 48px
    height: spacing.xxl * 2, // 48px
    borderRadius: spacing.xxl, // 24px (half of width/height for perfect circle)
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationText: {
    flex: 1,
    gap: spacing.xs,
  },
  verificationTitle: {
    color: colors.cyan,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  verificationSubtitle: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  detailsSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.lg,
  },
  detailCard: {
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs, // 12px
  },
  detailCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md - spacing.xs, // 12px
  },
  detailCardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg, // 18px
    fontFamily: typography.fontFamily.poppins.bold,
  },
  detailCardContent: {
    gap: spacing.md - spacing.xs, // 12px
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  detailValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  detailValuePrice: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  licenseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.medium,
  },
  partySection: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  partyTitle: {
    color: colors.primary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  partyTitleSeller: {
    color: colors.accent,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm,
  },
  partyInfo: {
    gap: spacing.xs,
  },
  partyName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  partyDetail: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  termsList: {
    gap: spacing.md - spacing.xs, // 12px
  },
  termItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md - spacing.xs, // 12px
  },
  termIcon: {
    width: spacing.xl - spacing.xs, // 20px
    height: spacing.xl - spacing.xs, // 20px
    borderRadius: spacing.xl / 2, // 10px (half of width/height for perfect circle)
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  termText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    flex: 1,
  },
  legalNotice: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legalNoticeText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: typography.fontSize.caption * 1.5, // 18px
  },
  signatureSection: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  signatureCard: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: hexToRgba(colors.primary, 0.3),
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // 12px
  },
  signatureIcon: {
    width: spacing.xxl * 2 + spacing.xl, // 64px
    height: spacing.xxl * 2 + spacing.xl, // 64px
    borderRadius: spacing.xxl + spacing.xl, // 32px (half of width/height for perfect circle)
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md - spacing.xs, // 12px
  },
  signatureTitle: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  signatureDate: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
