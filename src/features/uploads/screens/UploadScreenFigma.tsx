import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Music, FileAudio, Package, Briefcase, Upload } from 'lucide-react-native';
import { InputField } from '@/components/atoms/InputField';
import { CategoryChipFigma } from '@/components/atoms/CategoryChipFigma';
import { colors, spacing } from '@/theme';
import {
  UploadHeader,
  UploadOptionCard,
  UploadTypeCard,
  UploadFileArea,
  UploadNavigationButtons,
  UploadStatsCard,
  StepHeader,
  LicenseCard,
  LicenseType,
  PricingTypeCard,
  PricingType,
  MultiTierCard,
  UploadPreviewCard,
  UploadSuccessCard,
  InfoBanner,
} from '@/features/uploads/components';

type ProductType = 'beat' | 'kit' | 'sample' | 'service' | null;
type Step = 'select' | 'type' | 'details' | 'pricing' | 'preview' | 'success';

interface License {
  price: string;
  enabled: boolean;
}

interface MultiTierPrice {
  name: string;
  price: string;
  features: string;
  deliveryDays: string;
}

interface Availability {
  zones: string[];
  schedule: string;
  serviceTypes: string[];
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function UploadScreenFigma() {
  const [step, setStep] = useState<Step>('select');
  const [uploadType, setUploadType] = useState<ProductType>(null);

  // Common fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Beat/Kit/Sample specific fields
  const [bpm, setBpm] = useState('');
  const [musicKey, setMusicKey] = useState('');
  const [tags, setTags] = useState<string>('');
  const [licenses, setLicenses] = useState<Record<LicenseType, License>>({
    basic: { price: '19.99', enabled: true },
    premium: { price: '49.99', enabled: true },
    exclusive: { price: '299.99', enabled: true },
  });

  // Service specific fields
  const [pricingType, setPricingType] = useState<PricingType>('fixed');
  const [servicePrice, setServicePrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [availability, setAvailability] = useState<Availability>({
    zones: [],
    schedule: '',
    serviceTypes: [],
  });
  const [multiTierPrices, setMultiTierPrices] = useState<MultiTierPrice[]>([
    { name: 'Basic', price: '', features: '', deliveryDays: '' },
    { name: 'Standard', price: '', features: '', deliveryDays: '' },
    { name: 'Premium', price: '', features: '', deliveryDays: '' },
  ]);

  const genres = ['Afrobeat', 'Amapiano', 'Trap', 'Hip-Hop', 'R&B', 'Drill', 'Dancehall', 'Gospel', 'Lo-fi', 'EDM'];
  const zones = ['Dakar', 'Abidjan', 'Lagos', 'Accra', 'Bamako', 'Cotonou', 'Lomé', 'Ouagadougou'];
  const serviceTypes = ['Recording', 'Mixing', 'Mastering', 'Production', 'Beat Making', 'Vocal Coaching'];

  const isProductType = uploadType === 'beat' || uploadType === 'kit' || uploadType === 'sample';
  const isServiceType = uploadType === 'service';

  const handleProductTypeSelect = (type: ProductType) => {
    setUploadType(type);
    setStep('details');
  };

  const handleNext = () => {
    if (step === 'select') {
      setStep('type');
    } else if (step === 'type') {
      setStep('details');
    } else if (step === 'details') {
      setStep('pricing');
    } else if (step === 'pricing') {
      setStep('preview');
    } else if (step === 'preview') {
      setStep('success');
      setTimeout(() => {
        resetForm();
      }, 3000);
    }
  };

  const resetForm = () => {
    setStep('select');
    setUploadType(null);
    setTitle('');
    setDescription('');
    setSelectedGenres([]);
    setBpm('');
    setMusicKey('');
    setTags('');
    setServicePrice('');
    setDeliveryTime('');
    setAvailability({ zones: [], schedule: '', serviceTypes: [] });
    setMultiTierPrices([
      { name: 'Basic', price: '', features: '', deliveryDays: '' },
      { name: 'Standard', price: '', features: '', deliveryDays: '' },
      { name: 'Premium', price: '', features: '', deliveryDays: '' },
    ]);
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => (prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]));
  };

  const toggleZone = (zone: string) => {
    setAvailability(prev => ({
      ...prev,
      zones: prev.zones.includes(zone) ? prev.zones.filter(z => z !== zone) : [...prev.zones, zone],
    }));
  };

  const toggleServiceType = (type: string) => {
    setAvailability(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(type)
        ? prev.serviceTypes.filter(t => t !== type)
        : [...prev.serviceTypes, type],
    }));
  };

  const updateMultiTierPrice = (index: number, field: keyof MultiTierPrice, value: string) => {
    setMultiTierPrices(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateLicensePrice = (licenseType: LicenseType, price: string) => {
    setLicenses(prev => ({
      ...prev,
      [licenseType]: { ...prev[licenseType], price },
    }));
  };

  const handleFileUpload = (type: 'preview' | 'full' | 'portfolio') => {
    Alert.alert('Upload de fichier', `Fonctionnalité d'upload de ${type} à implémenter`);
  };

  const canProceedToDetails = () => {
    if (!title || !description || selectedGenres.length === 0) return false;
    if (isProductType && !bpm) return false;
    return true;
  };

  const canProceedToPricing = () => {
    if (isProductType) {
      return licenses.basic.price || licenses.premium.price || licenses.exclusive.price;
    } else {
      if (pricingType === 'fixed') return !!servicePrice;
      if (pricingType === 'on-demand') return true;
      if (pricingType === 'multi-tier') return true;
    }
    return false;
  };

  const getStepTitle = (): string => {
    switch (step) {
      case 'select':
        return 'Partagez votre talent';
      case 'type':
        return 'Choisissez le type';
      case 'details':
        return 'Détails du produit';
      case 'pricing':
        return 'Configuration tarifaire';
      case 'preview':
        return 'Vérification';
      default:
        return '';
    }
  };

  const renderStepSelect = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <StepHeader
        title="Que souhaitez-vous publier ?"
        subtitle="Choisissez entre produits (beats/kits) ou services professionnels"
      />

      <View style={styles.optionsContainer}>
        <UploadOptionCard
          title="Produit Musical"
          description="Beats, Kits, Samples - Commission 5% par vente"
          icon={Music}
          gradientColors={[colors.primary, colors.primaryDark]}
          onPress={() => setStep('type')}
        />

        <UploadOptionCard
          title="Service Professionnel"
          description="Mixing, Mastering, Recording - Sans commission"
          icon={FileAudio}
          gradientColors={[colors.cyan, colors.primaryDark]}
          badge="GRATUIT"
          onPress={() => handleProductTypeSelect('service')}
        />
      </View>

      <UploadStatsCard
        stats={[
          { label: 'Ventes', value: '0' },
          { label: 'Revenus', value: '0 F' },
          { label: 'Vues', value: '0' },
        ]}
      />
    </AnimatedView>
  );

  const renderStepType = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <StepHeader title="Type de produit" subtitle="Sélectionnez le type de contenu musical" />

      <View style={styles.typesContainer}>
        <UploadTypeCard
          label="Beat / Instrumental"
          description="Production complète prête à utiliser"
          icon={Music}
          onPress={() => handleProductTypeSelect('beat')}
        />
        <UploadTypeCard
          label="Kit de Sons"
          description="Collection de samples et loops"
          icon={Package}
          onPress={() => handleProductTypeSelect('kit')}
        />
        <UploadTypeCard
          label="Sample Pack"
          description="Samples individuels ou packs"
          icon={Briefcase}
          onPress={() => handleProductTypeSelect('sample')}
        />
      </View>

      <UploadNavigationButtons onBack={() => setStep('select')} onNext={handleNext} showBack={false} />
    </AnimatedView>
  );

  const renderStepDetails = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      {isProductType && (
        <>
          <UploadFileArea
            label="Preview Audio (30s max) *"
            title="Preview (30s)"
            subtitle="MP3 uniquement (Max 5MB)"
            icon={Upload}
            gradientColors={[colors.primary, colors.primaryDark]}
            onPress={() => handleFileUpload('preview')}
            onBrowse={() => handleFileUpload('preview')}
          />

          <UploadFileArea
            label="Fichier Complet *"
            title="Fichier complet (WAV/MP3/AIFF)"
            subtitle="Haute qualité (Max 100MB)"
            icon={FileAudio}
            gradientColors={[colors.primaryDark, colors.accent]}
            onPress={() => handleFileUpload('full')}
            onBrowse={() => handleFileUpload('full')}
          />
        </>
      )}

      {isServiceType && (
        <UploadFileArea
          label="Portfolio / Exemples de travaux"
          title="Images ou audio"
          subtitle="JPG, PNG, MP3 (Max 10MB chacun)"
          icon={Upload}
          gradientColors={[colors.cyan, colors.primaryDark]}
          onPress={() => handleFileUpload('portfolio')}
          onBrowse={() => handleFileUpload('portfolio')}
        />
      )}

      <InputField
        label="Titre *"
        placeholder={isProductType ? 'Ex: Afrobeat Summer Vibes' : 'Ex: Mixing & Mastering Professionnel'}
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.textAreaSection}>
        <Text style={styles.textAreaLabel}>Description *</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder={
            isProductType
              ? "Décrivez votre production, l'ambiance, les instruments utilisés..."
              : 'Décrivez vos services, votre expérience, votre méthode de travail...'
          }
          placeholderTextColor={colors.textMuted}
          multiline
          numberOfLines={5}
          style={styles.textArea}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.chipsSection}>
        <Text style={styles.chipsLabel}>Genre(s) Musical * (sélectionnez au moins 1)</Text>
        <View style={styles.chipsContainer}>
          {genres.map(genre => (
            <CategoryChipFigma
              key={genre}
              label={genre}
              selected={selectedGenres.includes(genre)}
              onPress={() => toggleGenre(genre)}
            />
          ))}
        </View>
      </View>

      {isProductType && (
        <>
          <View style={styles.rowInputs}>
            <View style={styles.halfInput}>
              <InputField label="BPM *" placeholder="120" value={bpm} onChangeText={setBpm} keyboardType="numeric" />
            </View>
            <View style={styles.halfInput}>
              <InputField label="Tonalité" placeholder="Am" value={musicKey} onChangeText={setMusicKey} />
            </View>
          </View>

          <InputField
            label="Tags (séparés par virgule)"
            placeholder="dancehall, summer, vibes, uptempo"
            value={tags}
            onChangeText={setTags}
          />
        </>
      )}

      {isServiceType && (
        <>
          <View style={styles.chipsSection}>
            <Text style={styles.chipsLabel}>Types de prestations *</Text>
            <View style={styles.chipsContainer}>
              {serviceTypes.map(type => (
                <CategoryChipFigma
                  key={type}
                  label={type}
                  selected={availability.serviceTypes.includes(type)}
                  onPress={() => toggleServiceType(type)}
                />
              ))}
            </View>
          </View>

          <View style={styles.chipsSection}>
            <Text style={styles.chipsLabel}>Zones géographiques disponibles</Text>
            <View style={styles.chipsContainer}>
              {zones.map(zone => (
                <CategoryChipFigma
                  key={zone}
                  label={zone}
                  selected={availability.zones.includes(zone)}
                  onPress={() => toggleZone(zone)}
                />
              ))}
            </View>
          </View>
        </>
      )}

      <UploadNavigationButtons
        onBack={() => setStep(isProductType ? 'type' : 'select')}
        onNext={handleNext}
        disabled={!canProceedToDetails()}
      />
    </AnimatedView>
  );

  const renderStepPricing = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <StepHeader
        title={isProductType ? 'Licences & Prix' : 'Configuration Tarifaire'}
        subtitle={
          isProductType ? 'Définissez les prix pour chaque type de licence' : 'Choisissez votre modèle de tarification'
        }
      />

      {isProductType && (
        <>
          <LicenseCard
            licenseType="basic"
            name="Basic"
            features={['MP3 téléchargement', '2000 streams', 'Crédit obligatoire']}
            suggestedPrice={19.99}
            license={licenses.basic}
            onPriceChange={value => updateLicensePrice('basic', value)}
          />

          <LicenseCard
            licenseType="premium"
            name="Premium"
            features={['WAV + MP3', '10000 streams', 'Crédit optionnel']}
            suggestedPrice={49.99}
            license={licenses.premium}
            onPriceChange={value => updateLicensePrice('premium', value)}
          />

          <LicenseCard
            licenseType="exclusive"
            name="Exclusive"
            features={['Tous fichiers + Stems', 'Streams illimités', 'Droits exclusifs']}
            suggestedPrice={299.99}
            license={licenses.exclusive}
            onPriceChange={value => updateLicensePrice('exclusive', value)}
          />

          <InfoBanner message="💰 Commission plateforme: 5%\nVous recevrez 95% du prix de vente après chaque transaction" />
        </>
      )}

      {isServiceType && (
        <>
          <View style={styles.pricingTypeSection}>
            <Text style={styles.pricingTypeLabel}>Type de tarification *</Text>
            <View style={styles.pricingTypeOptions}>
              <PricingTypeCard
                id="fixed"
                label="Prix fixe"
                description="Un seul prix pour votre service"
                selected={pricingType === 'fixed'}
                onPress={() => setPricingType('fixed')}
              />
              <PricingTypeCard
                id="on-demand"
                label="Sur devis"
                description="Négociation selon le projet"
                selected={pricingType === 'on-demand'}
                onPress={() => setPricingType('on-demand')}
              />
              <PricingTypeCard
                id="multi-tier"
                label="Packages multiples"
                description="Basic, Standard, Premium"
                selected={pricingType === 'multi-tier'}
                onPress={() => setPricingType('multi-tier')}
              />
            </View>
          </View>

          {pricingType === 'fixed' && (
            <>
              <InputField
                label="Prix du service (F CFA)"
                placeholder="25000"
                value={servicePrice}
                onChangeText={setServicePrice}
                keyboardType="numeric"
              />
              <InputField
                label="Délai de livraison moyen"
                placeholder="3-5 jours"
                value={deliveryTime}
                onChangeText={setDeliveryTime}
              />
            </>
          )}

          {pricingType === 'on-demand' && (
            <InfoBanner
              message="💬 Les clients vous contacteront directement pour discuter du prix selon leur projet. Vous pourrez négocier via la messagerie intégrée."
              gradientColors={['rgba(6, 182, 212, 0.1)', 'rgba(139, 92, 246, 0.1)']}
            />
          )}

          {pricingType === 'multi-tier' && (
            <View style={styles.multiTierContainer}>
              {multiTierPrices.map((tier, index) => (
                <MultiTierCard
                  key={tier.name}
                  tier={tier}
                  index={index}
                  onPriceChange={value => updateMultiTierPrice(index, 'price', value)}
                  onFeaturesChange={value => updateMultiTierPrice(index, 'features', value)}
                  onDeliveryDaysChange={value => updateMultiTierPrice(index, 'deliveryDays', value)}
                />
              ))}
            </View>
          )}

          <InfoBanner
            message="✨ Services 100% GRATUITS\nAucune commission sur les réservations. Le paiement se fait directement entre vous et le client."
            gradientColors={['rgba(34, 197, 94, 0.1)', 'rgba(6, 182, 212, 0.1)']}
          />
        </>
      )}

      <UploadNavigationButtons
        onBack={() => setStep('details')}
        onNext={handleNext}
        disabled={!canProceedToPricing()}
      />
    </AnimatedView>
  );

  const renderStepPreview = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <StepHeader title="Vérification finale" subtitle="Vérifiez toutes les informations avant de publier" />

      <UploadPreviewCard
        title={title}
        uploadType={uploadType || ''}
        description={description}
        genres={selectedGenres}
        isProductType={isProductType}
        bpm={bpm}
        musicKey={musicKey}
        pricingType={isServiceType ? pricingType : undefined}
        serviceTypes={isServiceType ? availability.serviceTypes : undefined}
      />

      <InfoBanner
        message={`⚠️ Votre ${isProductType ? 'produit' : 'service'} sera examiné par notre équipe avant d'être visible sur le marketplace. Vous recevrez une notification dès validation.`}
        gradientColors={['rgba(245, 158, 11, 0.1)', 'rgba(236, 72, 153, 0.1)']}
      />

      <UploadNavigationButtons onBack={() => setStep('pricing')} onNext={handleNext} nextLabel="Publier maintenant" />
    </AnimatedView>
  );

  const renderStepSuccess = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.successContainer}>
      <UploadSuccessCard isProductType={isProductType} />
    </AnimatedView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <UploadHeader currentStep={step} subtitle={getStepTitle()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {step === 'select' && renderStepSelect()}
        {step === 'type' && renderStepType()}
        {step === 'details' && renderStepDetails()}
        {step === 'pricing' && renderStepPricing()}
        {step === 'preview' && renderStepPreview()}
        {step === 'success' && renderStepSuccess()}
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
    paddingBottom: spacing.xxl * 2 + spacing.md,
  },
  stepContainer: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  typesContainer: {
    gap: spacing.md,
  },
  pricingTypeSection: {
    gap: spacing.md,
  },
  pricingTypeLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: spacing.sm,
  },
  pricingTypeOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  multiTierContainer: {
    gap: spacing.md,
  },
  textAreaSection: {
    gap: spacing.sm,
  },
  textAreaLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: spacing.sm,
  },
  textArea: {
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    minHeight: spacing.xxl * 3,
  },
  chipsSection: {
    gap: spacing.sm,
  },
  chipsLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    marginBottom: spacing.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
});
