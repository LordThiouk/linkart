import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, FileText, Upload, CheckCircle } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { InputField } from '../../components/atoms/InputField';
import { colors, spacing, typography, radii } from '@/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface BookingFormScreenFigmaProps {
  serviceId: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  packageName: string;
  price: number;
  deliveryTime: string;
  onBack?: () => void;
  onSubmit?: () => void;
}

type Step = 'details' | 'files' | 'review';

interface FormData {
  projectName: string;
  description: string;
  deadline: string;
  additionalNotes: string;
}

export function BookingFormScreenFigma({
  serviceId,
  serviceName,
  providerName,
  providerImage,
  packageName,
  price,
  deliveryTime,
  onBack,
  onSubmit,
}: BookingFormScreenFigmaProps) {
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    description: '',
    deadline: '',
    additionalNotes: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleNext = () => {
    if (step === 'details') {
      setStep('files');
    } else if (step === 'files') {
      setStep('review');
    }
  };

  const handleBack = () => {
    if (step === 'files') {
      setStep('details');
    } else if (step === 'review') {
      setStep('files');
    }
  };

  const handleSubmit = () => {
    // Here you would send the booking request to the backend
    console.log('Booking submitted:', { serviceId, formData, uploadedFiles });
    onSubmit?.();
  };

  const handleFileUpload = () => {
    // Note: File upload implementation requires expo-document-picker or similar
    // For now, just show an alert
    Alert.alert('Upload de fichier', "Fonctionnalité d'upload à implémenter");
    // Mock: Add a file to the list
    setUploadedFiles(prev => [...prev, `file-${prev.length + 1}.mp3`]);
  };

  const canProceedFromDetails = () => {
    return !!formData.projectName;
  };

  const renderProgressBar = () => {
    const steps = ['details', 'files', 'review'];
    const currentIndex = steps.indexOf(step);

    return (
      <View style={styles.progressContainer}>
        {steps.map((s, index) => (
          <View
            key={s}
            style={[
              styles.progressBar,
              (currentIndex === index || (currentIndex > index && step !== 'details')) && styles.progressBarActive,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderStepDetails = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Détails du projet</Text>
        <Text style={styles.stepSubtitle}>
          Décrivez votre projet pour aider le prestataire à mieux comprendre vos besoins
        </Text>
      </View>

      <InputField
        label="Nom du projet"
        placeholder="Ex: Mon EP Afrobeat 2025"
        value={formData.projectName}
        onChangeText={value => setFormData({ ...formData, projectName: value })}
      />

      <View style={styles.textAreaSection}>
        <Text style={styles.textAreaLabel}>Description du projet</Text>
        <TextInput
          value={formData.description}
          onChangeText={value => setFormData({ ...formData, description: value })}
          placeholder="Décrivez en détail ce que vous attendez du prestataire..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={6}
          style={styles.textArea}
          textAlignVertical="top"
        />
      </View>

      <InputField
        label="Date limite souhaitée (optionnel)"
        placeholder="YYYY-MM-DD"
        value={formData.deadline}
        onChangeText={value => setFormData({ ...formData, deadline: value })}
      />

      <View style={styles.textAreaSection}>
        <Text style={styles.textAreaLabel}>Notes additionnelles (optionnel)</Text>
        <TextInput
          value={formData.additionalNotes}
          onChangeText={value => setFormData({ ...formData, additionalNotes: value })}
          placeholder="Références, style souhaité, informations complémentaires..."
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={4}
          style={styles.textArea}
          textAlignVertical="top"
        />
      </View>
    </AnimatedView>
  );

  const renderStepFiles = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Fichiers du projet</Text>
        <Text style={styles.stepSubtitle}>
          Uploadez vos fichiers audio, références ou tout autre document nécessaire
        </Text>
      </View>

      {/* Upload Area */}
      <TouchableOpacity onPress={handleFileUpload} style={styles.uploadArea} activeOpacity={0.9}>
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.uploadIcon}
        >
          <Upload size={32} color={colors.textPrimary} />
        </LinearGradient>
        <Text style={styles.uploadTitle}>Glissez vos fichiers ici</Text>
        <Text style={styles.uploadSubtitle}>ou cliquez pour parcourir</Text>
        <TouchableOpacity onPress={handleFileUpload} style={styles.uploadButton} activeOpacity={0.8}>
          <Text style={styles.uploadButtonText}>Parcourir</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <View style={styles.uploadedFilesContainer}>
          <Text style={styles.uploadedFilesTitle}>Fichiers uploadés ({uploadedFiles.length})</Text>
          {uploadedFiles.map((file, index) => (
            <View key={index} style={styles.uploadedFileCard}>
              <View style={styles.uploadedFileIcon}>
                <FileText size={20} color={colors.primary} />
              </View>
              <View style={styles.uploadedFileInfo}>
                <Text style={styles.uploadedFileName}>{file}</Text>
                <Text style={styles.uploadedFileSize}>2.4 MB</Text>
              </View>
              <CheckCircle size={20} color={colors.success} />
            </View>
          ))}
        </View>
      )}

      <View style={styles.infoCard}>
        <LinearGradient
          colors={[
            `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.1)`,
            `rgba(${parseInt(colors.primaryDark.slice(1, 3), 16)}, ${parseInt(colors.primaryDark.slice(3, 5), 16)}, ${parseInt(colors.primaryDark.slice(5, 7), 16)}, 0.1)`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.infoCardGradient}
        >
          <Text style={styles.infoCardText}>
            💡 <Text style={styles.infoCardTextAccent}>Conseil:</Text> Plus vos fichiers et descriptions sont précis,
            meilleur sera le résultat final.
          </Text>
        </LinearGradient>
      </View>
    </AnimatedView>
  );

  const renderStepReview = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Vérification</Text>
        <Text style={styles.stepSubtitle}>Vérifiez les informations avant d'envoyer votre demande</Text>
      </View>

      {/* Summary Sections */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Détails du projet</Text>
        <View style={styles.summaryDetails}>
          <View style={styles.summaryDetail}>
            <Text style={styles.summaryDetailLabel}>Nom du projet</Text>
            <Text style={styles.summaryDetailValue}>{formData.projectName || 'Non spécifié'}</Text>
          </View>
          <View style={styles.summaryDetail}>
            <Text style={styles.summaryDetailLabel}>Description</Text>
            <Text style={styles.summaryDetailValue}>{formData.description || 'Non spécifié'}</Text>
          </View>
          {formData.deadline && (
            <View style={styles.summaryDetail}>
              <Text style={styles.summaryDetailLabel}>Date limite</Text>
              <Text style={styles.summaryDetailValue}>{formData.deadline}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryCardTitle}>Résumé de la commande</Text>
        <View style={styles.summaryDetails}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryRowLabel}>Package {packageName}</Text>
            <Text style={styles.summaryRowValue}>€{price.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowTotal]}>
            <Text style={styles.summaryRowLabelTotal}>Total</Text>
            <Text style={styles.summaryRowValueTotal}>€{price.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <LinearGradient
          colors={[
            `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.1)`,
            `rgba(${parseInt(colors.primaryDark.slice(1, 3), 16)}, ${parseInt(colors.primaryDark.slice(3, 5), 16)}, ${parseInt(colors.primaryDark.slice(5, 7), 16)}, 0.1)`,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.infoCardGradient}
        >
          <Text style={styles.infoCardText}>
            ⚠️ Le prestataire examinera votre demande et vous répondra dans les{' '}
            <Text style={styles.infoCardTextAccent}>{deliveryTime}</Text>. Le paiement sera effectué après confirmation
            de sa part.
          </Text>
        </LinearGradient>
      </View>
    </AnimatedView>
  );

  const getStepNumber = () => {
    switch (step) {
      case 'details':
        return 1;
      case 'files':
        return 2;
      case 'review':
        return 3;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            {onBack && (
              <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.8}>
                <ChevronLeft size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Réservation</Text>
              <Text style={styles.headerSubtitle}>Étape {getStepNumber()} sur 3</Text>
            </View>
          </View>
          {renderProgressBar()}
        </View>
      </View>

      {/* Service Info Card */}
      <View style={styles.serviceCard}>
        <View style={styles.serviceCardHeader}>
          <ImageWithFallback src={providerImage} alt={providerName} style={styles.providerImage} />
          <View style={styles.serviceCardInfo}>
            <Text style={styles.serviceCardTitle}>{serviceName}</Text>
            <Text style={styles.serviceCardSubtitle}>{providerName}</Text>
          </View>
        </View>
        <View style={styles.serviceCardFooter}>
          <View style={styles.serviceCardDetail}>
            <Text style={styles.serviceCardDetailLabel}>Package</Text>
            <Text style={styles.serviceCardDetailValue}>{packageName}</Text>
          </View>
          <View style={styles.serviceCardDetail}>
            <Text style={styles.serviceCardDetailLabel}>Prix</Text>
            <Text style={styles.serviceCardDetailValuePrice}>€{price.toFixed(2)}</Text>
          </View>
          <View style={styles.serviceCardDetail}>
            <Text style={styles.serviceCardDetailLabel}>Délai</Text>
            <Text style={styles.serviceCardDetailValue}>{deliveryTime}</Text>
          </View>
        </View>
      </View>

      {/* Step Content */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {step === 'details' && renderStepDetails()}
        {step === 'files' && renderStepFiles()}
        {step === 'review' && renderStepReview()}
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View style={styles.bottomCTA}>
        <View style={styles.bottomCTAContent}>
          {step !== 'details' && (
            <TouchableOpacity onPress={handleBack} style={styles.bottomBackButton} activeOpacity={0.8}>
              <Text style={styles.bottomBackButtonText}>Retour</Text>
            </TouchableOpacity>
          )}
          <PrimaryButton
            onPress={step === 'review' ? handleSubmit : handleNext}
            disabled={step === 'details' && !canProceedFromDetails()}
            style={styles.bottomNextButton}
          >
            {step === 'review' ? 'Envoyer la demande' : 'Suivant'}
          </PrimaryButton>
        </View>
      </View>
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
    borderBottomColor: `rgba(${parseInt(colors.border.slice(1, 3), 16)}, ${parseInt(colors.border.slice(3, 5), 16)}, ${parseInt(colors.border.slice(5, 7), 16)}, 0.5)`,
    paddingTop: spacing.xxl, // pt-12
    paddingBottom: spacing.md, // pb-4
    paddingHorizontal: spacing.lg, // px-6
  },
  headerContent: {
    gap: spacing.md, // gap-4
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md, // gap-4
    marginBottom: spacing.md, // mb-4
  },
  backButton: {
    padding: spacing.md - spacing.xs, // p-3 (12px)
    borderRadius: radii.md, // rounded-xl
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
    fontSize: typography.fontSize.displayXl - spacing.xs, // 28px (close to displayXl 32px)
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: spacing.sm, // gap-2
  },
  progressBar: {
    flex: 1,
    height: spacing.xs, // h-1 (4px)
    borderRadius: spacing.xs / 2, // rounded-full (2px)
    backgroundColor: colors.border,
  },
  progressBarActive: {
    backgroundColor: colors.primary,
  },
  serviceCard: {
    margin: spacing.md, // m-4
    padding: spacing.md, // p-4
    borderRadius: radii.xl, // rounded-2xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs, // gap-3 (12px)
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // gap-3 (12px)
    marginBottom: spacing.md - spacing.xs, // mb-3 (12px)
  },
  providerImage: {
    width: spacing.xxl + spacing.md, // w-12 (48px)
    height: spacing.xxl + spacing.md, // h-12 (48px)
    borderRadius: radii.md, // rounded-xl
  },
  serviceCardInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  serviceCardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.xs,
  },
  serviceCardSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  serviceCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: spacing.md - spacing.xs, // pt-3 (12px)
    borderTopWidth: 1,
    borderTopColor: `rgba(${parseInt(colors.border.slice(1, 3), 16)}, ${parseInt(colors.border.slice(3, 5), 16)}, ${parseInt(colors.border.slice(5, 7), 16)}, 0.5)`,
  },
  serviceCardDetail: {
    flex: 1,
    gap: spacing.xs,
  },
  serviceCardDetailLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  serviceCardDetailValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  serviceCardDetailValuePrice: {
    color: colors.secondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  scrollContent: {
    paddingBottom: spacing.xxl * 2 + spacing.xs, // pb-25 (100px)
  },
  stepContainer: {
    padding: spacing.lg, // p-6
    gap: spacing.lg, // gap-6
  },
  stepHeader: {
    gap: spacing.sm, // gap-2
    marginBottom: spacing.sm, // mb-2
  },
  stepTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.headingLg,
    fontFamily: typography.fontFamily.poppins.bold,
    marginBottom: spacing.sm, // mb-2
  },
  stepSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  textAreaSection: {
    gap: spacing.sm, // gap-2
  },
  textAreaLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
    marginBottom: spacing.sm, // mb-2
  },
  textArea: {
    padding: spacing.md, // p-4
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.xl, // rounded-2xl
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    minHeight: spacing.xxl * 2 + spacing.md, // min-h-30 (120px)
  },
  uploadArea: {
    padding: spacing.xl, // p-8
    borderRadius: radii.xl, // rounded-2xl
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    gap: spacing.md, // gap-4
  },
  uploadIcon: {
    width: spacing.xl * 2, // w-16 (64px)
    height: spacing.xl * 2, // h-16 (64px)
    borderRadius: radii.xl, // rounded-2xl
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md, // mb-4
  },
  uploadTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.sm, // mb-2
  },
  uploadSubtitle: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.md, // mb-4
  },
  uploadButton: {
    paddingHorizontal: spacing.lg, // px-6
    paddingVertical: spacing.md - spacing.xs, // py-3 (12px)
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surfaceElevated,
  },
  uploadButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  uploadedFilesContainer: {
    gap: spacing.md - spacing.xs, // gap-3 (12px)
  },
  uploadedFilesTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md - spacing.xs, // mb-3 (12px)
  },
  uploadedFileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - spacing.xs, // gap-3 (12px)
    padding: spacing.md - spacing.xs, // p-3 (12px)
    borderRadius: radii.md, // rounded-xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  uploadedFileIcon: {
    width: spacing.xl + spacing.sm, // w-10 (40px)
    height: spacing.xl + spacing.sm, // h-10 (40px)
    borderRadius: radii.sm, // rounded-lg
    backgroundColor: `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.2)`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedFileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  uploadedFileName: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.medium,
  },
  uploadedFileSize: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
  },
  infoCard: {
    borderRadius: radii.xl, // rounded-2xl
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.3)`,
  },
  infoCardGradient: {
    padding: spacing.md, // p-4
  },
  infoCardText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
    lineHeight: spacing.xl * 2.5, // line-height 20px (close to 20)
  },
  infoCardTextAccent: {
    color: colors.primary,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  summaryCard: {
    padding: spacing.md, // p-4
    borderRadius: radii.xl, // rounded-2xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md - spacing.xs, // gap-3 (12px)
  },
  summaryCardTitle: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.titleMd,
    fontFamily: typography.fontFamily.poppins.semibold,
    marginBottom: spacing.md - spacing.xs, // mb-3 (12px)
  },
  summaryDetails: {
    gap: spacing.md - spacing.xs, // gap-3 (12px)
  },
  summaryDetail: {
    gap: spacing.sm, // gap-2
  },
  summaryDetailLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.caption,
    fontFamily: typography.fontFamily.inter.regular,
    marginBottom: spacing.xs,
  },
  summaryDetailValue: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm, // mb-2
  },
  summaryRowTotal: {
    paddingTop: spacing.md - spacing.xs, // pt-3 (12px)
    borderTopWidth: 1,
    borderTopColor: `rgba(${parseInt(colors.border.slice(1, 3), 16)}, ${parseInt(colors.border.slice(3, 5), 16)}, ${parseInt(colors.border.slice(5, 7), 16)}, 0.5)`,
    marginTop: spacing.md - spacing.xs, // mt-3 (12px)
  },
  summaryRowLabel: {
    color: colors.textMuted,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.inter.regular,
  },
  summaryRowValue: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.label,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  summaryRowLabelTotal: {
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.semibold,
  },
  summaryRowValueTotal: {
    color: colors.secondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.poppins.bold,
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: `rgba(${parseInt(colors.border.slice(1, 3), 16)}, ${parseInt(colors.border.slice(3, 5), 16)}, ${parseInt(colors.border.slice(5, 7), 16)}, 0.5)`,
    paddingHorizontal: spacing.lg, // px-6
    paddingVertical: spacing.md, // py-4
    paddingBottom: spacing.xl, // pb-8
  },
  bottomCTAContent: {
    flexDirection: 'row',
    gap: spacing.md - spacing.xs, // gap-3 (12px)
    maxWidth: 375, // Specific max width
    alignSelf: 'center',
    width: '100%',
  },
  bottomBackButton: {
    flex: 1,
    paddingVertical: spacing.md - spacing.xs, // py-3 (12px)
    paddingHorizontal: spacing.md, // px-4
    borderRadius: radii.xl, // rounded-2xl
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBackButtonText: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily.inter.medium,
  },
  bottomNextButton: {
    flex: 1,
    marginBottom: 0,
  },
});
