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
  const pulse1 = useSharedValue(1);
  const pulse2 = useSharedValue(1);
  const opacity1 = useSharedValue(0.6);
  const opacity2 = useSharedValue(0.6);

  useEffect(() => {
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
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <CheckCircle size={64} color="#F5F5F5" />
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
                  colors={['#6366F1', '#8B5CF6']}
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
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepIcon}
              >
                <FileText size={16} color="#F5F5F5" />
              </LinearGradient>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Contrat de licence disponible</Text>
                <Text style={styles.stepDescription}>Téléchargez votre contrat PDF depuis "Mes Achats"</Text>
              </View>
            </View>

            <View style={styles.stepCard}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.stepIcon}
              >
                <Download size={16} color="#F5F5F5" />
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
              <Download size={20} color="#F5F5F5" />
              <Text style={styles.actionButtonText}>Télécharger maintenant</Text>
            </View>
          </PrimaryButton>

          <TouchableOpacity onPress={onViewPurchases} style={styles.secondaryButton} activeOpacity={0.8}>
            <Package size={20} color="#F5F5F5" />
            <Text style={styles.secondaryButtonText}>Voir mes achats</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onGoHome} style={styles.tertiaryButton} activeOpacity={0.8}>
            <Home size={20} color="#A3A3A3" />
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
    backgroundColor: '#0A0A0A',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 80,
  },
  iconContainer: {
    marginBottom: 24,
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
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#10B981',
    opacity: 0.6,
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 8,
  },
  messageTitle: {
    color: '#F5F5F5',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  messageSubtitle: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '400',
  },
  detailsSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
  },
  detailsCard: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  detailsContent: {
    gap: 16,
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
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  detailValuePrice: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '700',
  },
  licenseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  licenseBadgeText: {
    color: '#F5F5F5',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#404040',
    marginTop: 12,
    marginBottom: 12,
  },
  detailValueId: {
    color: '#737373',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'monospace',
  },
  stepsSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
    gap: 12,
  },
  stepsTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepsList: {
    gap: 12,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContent: {
    flex: 1,
    gap: 4,
  },
  stepTitle: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDescription: {
    color: '#737373',
    fontSize: 12,
    fontWeight: '400',
  },
  actionsSection: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  secondaryButtonText: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '400',
  },
  tertiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  tertiaryButtonText: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '400',
  },
});
