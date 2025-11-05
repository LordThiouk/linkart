import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft, FileText, Upload, CheckCircle } from 'lucide-react-native';
import { ImageWithFallback } from '../../components/atoms/ImageWithFallback';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { InputField } from '../../components/atoms/InputField';

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
          placeholderTextColor="#A3A3A3"
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
          placeholderTextColor="#A3A3A3"
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
          colors={['#6366F1', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.uploadIcon}
        >
          <Upload size={32} color="#F5F5F5" />
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
                <FileText size={20} color="#6366F1" />
              </View>
              <View style={styles.uploadedFileInfo}>
                <Text style={styles.uploadedFileName}>{file}</Text>
                <Text style={styles.uploadedFileSize}>2.4 MB</Text>
              </View>
              <CheckCircle size={20} color="#22C55E" />
            </View>
          ))}
        </View>
      )}

      <View style={styles.infoCard}>
        <LinearGradient
          colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
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
          colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
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
                <ChevronLeft size={20} color="#D4D4D4" />
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
    padding: 12,
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
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#404040',
  },
  progressBarActive: {
    backgroundColor: '#6366F1',
  },
  serviceCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 12,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  providerImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  serviceCardInfo: {
    flex: 1,
    gap: 4,
  },
  serviceCardTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceCardSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  serviceCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
  },
  serviceCardDetail: {
    flex: 1,
    gap: 4,
  },
  serviceCardDetailLabel: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  serviceCardDetailValue: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  serviceCardDetailValuePrice: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  stepContainer: {
    padding: 24,
    gap: 24,
  },
  stepHeader: {
    gap: 8,
    marginBottom: 8,
  },
  stepTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  stepSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  textAreaSection: {
    gap: 8,
  },
  textAreaLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textArea: {
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 16,
    color: '#F5F5F5',
    fontSize: 16,
    minHeight: 120,
  },
  uploadArea: {
    padding: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#404040',
    backgroundColor: '#111111',
    alignItems: 'center',
    gap: 16,
  },
  uploadIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  uploadSubtitle: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 16,
  },
  uploadButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
  },
  uploadButtonText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadedFilesContainer: {
    gap: 12,
  },
  uploadedFilesTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  uploadedFileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
  },
  uploadedFileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedFileInfo: {
    flex: 1,
    gap: 4,
  },
  uploadedFileName: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '500',
  },
  uploadedFileSize: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  infoCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  infoCardGradient: {
    padding: 16,
  },
  infoCardText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  infoCardTextAccent: {
    color: '#6366F1',
    fontWeight: '600',
  },
  summaryCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 12,
  },
  summaryCardTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryDetails: {
    gap: 12,
  },
  summaryDetail: {
    gap: 8,
  },
  summaryDetailLabel: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 4,
  },
  summaryDetailValue: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '400',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryRowTotal: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    marginTop: 12,
  },
  summaryRowLabel: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  summaryRowValue: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryRowLabelTotal: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryRowValueTotal: {
    color: '#F59E0B',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0A0A0A',
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 64, 64, 0.5)',
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  bottomCTAContent: {
    flexDirection: 'row',
    gap: 12,
    maxWidth: 375,
    alignSelf: 'center',
    width: '100%',
  },
  bottomBackButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBackButtonText: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomNextButton: {
    flex: 1,
    marginBottom: 0,
  },
});
