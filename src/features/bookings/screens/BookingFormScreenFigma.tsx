import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';
import {
  BookingFormHeader,
  ServiceInfoCard,
  BookingFormNavigationButtons,
  BookingFormDetailsStep,
  BookingFormFilesStep,
  BookingFormReviewStep,
} from '@/features/bookings/components';

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

interface UploadedFile {
  name: string;
  size?: string;
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
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

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
    console.log('Booking submitted:', { serviceId, formData, uploadedFiles });
    onSubmit?.();
  };

  const handleFileUpload = () => {
    Alert.alert('Upload de fichier', "Fonctionnalité d'upload à implémenter");
    setUploadedFiles(prev => [...prev, { name: `file-${prev.length + 1}.mp3`, size: '2.4 MB' }]);
  };

  const canProceedFromDetails = () => {
    return !!formData.projectName;
  };

  const getStepNumber = (): number => {
    switch (step) {
      case 'details':
        return 1;
      case 'files':
        return 2;
      case 'review':
        return 3;
    }
  };

  const getCurrentStep = (): 'details' | 'files' | 'review' => step;

  return (
    <SafeAreaView style={styles.container}>
      <BookingFormHeader currentStep={getStepNumber()} totalSteps={3} onBack={onBack} />

      <ServiceInfoCard
        serviceName={serviceName}
        providerName={providerName}
        providerImage={providerImage}
        packageName={packageName}
        price={price}
        deliveryTime={deliveryTime}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {step === 'details' && (
          <BookingFormDetailsStep
            projectName={formData.projectName}
            description={formData.description}
            deadline={formData.deadline}
            additionalNotes={formData.additionalNotes}
            onProjectNameChange={value => setFormData({ ...formData, projectName: value })}
            onDescriptionChange={value => setFormData({ ...formData, description: value })}
            onDeadlineChange={value => setFormData({ ...formData, deadline: value })}
            onAdditionalNotesChange={value => setFormData({ ...formData, additionalNotes: value })}
          />
        )}

        {step === 'files' && <BookingFormFilesStep uploadedFiles={uploadedFiles} onFileUpload={handleFileUpload} />}

        {step === 'review' && (
          <BookingFormReviewStep
            projectName={formData.projectName}
            description={formData.description}
            deadline={formData.deadline || undefined}
            packageName={packageName}
            price={price}
            deliveryTime={deliveryTime}
          />
        )}
      </ScrollView>

      <BookingFormNavigationButtons
        currentStep={getCurrentStep()}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={handleSubmit}
        disabled={step === 'details' && !canProceedFromDetails()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl * 2 + spacing.xs, // pb-25 (100px)
  },
});
