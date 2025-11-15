import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Download, FileText, Home, Package } from 'lucide-react-native';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface PaymentSuccessScreenFigmaProps {
  onGoHome?: () => void;
  onViewPurchases?: () => void;
  onDownload?: () => void;
  transactionId: string;
  productTitle: string;
  licenseType: string;
  amount: number;
}

export function PaymentSuccessScreenFigma({
  onGoHome,
  onViewPurchases,
  onDownload,
  transactionId,
  productTitle,
  licenseType,
  amount,
}: PaymentSuccessScreenFigmaProps) {
  // Détecter si on est dans Storybook (navigateur)
  const isStorybook = typeof window !== 'undefined' && window.location?.pathname?.includes('/iframe.html');

  const pulse1 = useSharedValue(1);
  const pulse2 = useSharedValue(1);
  const opacity1 = useSharedValue(isStorybook ? 0.3 : 0.6);
  const opacity2 = useSharedValue(isStorybook ? 0.3 : 0.6);

  useEffect(() => {
    // Dans Storybook, on peut garder les animations de pulse mais avec des valeurs initiales différentes
    pulse1.value = withRepeat(withTiming(1.5, { duration: 2000 }), -1, false);
    opacity1.value = withRepeat(withTiming(0, { duration: 2000 }), -1, false);
    pulse2.value = withRepeat(withTiming(1.5, { duration: 2000 }), -1, false);
    opacity2.value = withRepeat(withTiming(0, { duration: 2000 }), -1, false);
  }, []);

  const pulseStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse1.value }],
    opacity: opacity1.value,
  }));

  const pulseStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: pulse2.value }],
    opacity: opacity2.value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Success Icon */}
        <AnimatedView entering={FadeIn.delay(200)} style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <LinearGradient
              colors={[colors.success, '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <CheckCircle size={64} color={colors.textPrimary} />
            </LinearGradient>
            {/* Pulse rings */}
            <AnimatedView style={[styles.pulseRing, pulseStyle1]} />
            <AnimatedView style={[styles.pulseRing, pulseStyle2]} />
          </View>
        </AnimatedView>

        {/* Success Message */}
        <AnimatedView entering={FadeInDown.delay(400)} style={styles.messageSection}>
          <Text style={styles.messageTitle}>Paiement réussi !</Text>
          <Text style={styles.messageSubtitle}>Votre achat a été confirmé avec succès</Text>
        </AnimatedView>

        {/* Purchase Details */}
        <AnimatedView entering={FadeInDown.delay(600)} style={styles.detailsSection}>
          <View style={styles.detailsCard}>
            <View style={styles.detailsContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Produit</Text>
                <Text style={styles.detailValue}>{productTitle}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Licence</Text>
                <LinearGradient
                  colors={[colors.primary, colors.primaryDark]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.licenseBadge}
                >
                  <Text style={styles.licenseBadgeText}>{licenseType.toUpperCase()}</Text>
                </LinearGradient>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Montant payé</Text>
                <Text style={styles.detailValuePrice}>{amount.toLocaleString()} F</Text>
              </View>

              <View style={styles.detailDivider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>ID Transaction</Text>
                <Text style={styles.detailValueId}>{transactionId}</Text>
              </View>
            </View>
          </View>
        </AnimatedView>

        {/* Next Steps */}
        <AnimatedView entering={FadeInDown.delay(800)} style={styles.stepsSection}>
          <Text style={styles.stepsTitle}>Prochaines étapes</Text>
          <View style={styles.stepsList}>
            <View style={styles.stepCard}>
              <LinearGradient
                colors={[colors.primary, colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepIcon}
              >
                <FileText size={16} color={colors.textPrimary} />
              </LinearGradient>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Contrat de licence disponible</Text>
                <Text style={styles.stepDescription}>Téléchargez votre contrat PDF depuis "Mes Achats"</Text>
              </View>
            </View>

            <View style={styles.stepCard}>
              <LinearGradient
                colors={[colors.success, '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepIcon}
              >
                <Download size={16} color={colors.textPrimary} />
              </LinearGradient>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Fichiers prêts au téléchargement</Text>
                <Text style={styles.stepDescription}>Téléchargez vos fichiers audio haute qualité</Text>
              </View>
            </View>
          </View>
        </AnimatedView>

        {/* Action Buttons */}
        <AnimatedView entering={FadeInDown.delay(1000)} style={styles.actionsSection}>
          <PrimaryButton onPress={onDownload} fullWidth>
            <View style={styles.actionButtonContent}>
              <Download size={20} color={colors.textPrimary} />
              <Text style={styles.actionButtonText}>Télécharger maintenant</Text>
            </View>
          </PrimaryButton>

          <TouchableOpacity onPress={onViewPurchases} style={styles.secondaryButton} activeOpacity={0.8}>
            <Package size={20} color={colors.textPrimary} />
            <Text style={styles.secondaryButtonText}>Voir mes achats</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onGoHome} style={styles.tertiaryButton} activeOpacity={0.8}>
            <Home size={20} color={colors.textMuted} />
            <Text style={styles.tertiaryButtonText}>Retour à l'accueil</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.xxl + spacing.xl, // 80px
  },
  iconContainer: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconGradient: {
    width: 128,
    height: 128,
    borderRadius: 64, // Half of width/height for perfect circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64, // Half of width/height for perfect circle
    backgroundColor: colors.success,
    opacity: 0.6,
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  messageTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.displayXl, // 32px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm,
  },
  messageSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  detailsSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: spacing.xl,
  },
  detailsCard: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailsContent: {
    gap: spacing.md,
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
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
  detailValuePrice: {
    color: colors.success,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  licenseBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radii.sm,
  },
  licenseBadgeText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.poppins.bold,
    letterSpacing: 1,
  },
  detailDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.md - spacing.xs, // 12px
    marginBottom: spacing.md - spacing.xs, // 12px
  },
  detailValueId: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: 'monospace', // Monospace pour les IDs de transaction
  },
  stepsSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: spacing.xl,
    gap: spacing.md - spacing.xs, // 12px
  },
  stepsTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg - 4, // 20px
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.md - spacing.xs, // 12px
    textAlign: 'center',
  },
  stepsList: {
    gap: spacing.md - spacing.xs, // 12px
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md - spacing.xs, // 12px
    padding: spacing.md - spacing.xs, // 12px
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepIcon: {
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
    gap: spacing.xs,
  },
  stepTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  actionsSection: {
    width: '100%',
    maxWidth: 400,
    gap: spacing.md - spacing.xs, // 12px
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  actionButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
  tertiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    backgroundColor: colors.transparent,
  },
  tertiaryButtonText: {
    color: colors.textMuted,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.regular,
  },
});
