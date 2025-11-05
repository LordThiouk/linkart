import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Upload, Music, FileAudio, CheckCircle, DollarSign, Package, Briefcase } from 'lucide-react-native';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { InputField } from '../../components/atoms/InputField';
import { CategoryChipFigma } from '../../components/atoms/CategoryChipFigma';

type ProductType = 'beat' | 'kit' | 'sample' | 'service' | null;
type Step = 'select' | 'type' | 'details' | 'pricing' | 'preview' | 'success';
type PricingType = 'fixed' | 'on-demand' | 'multi-tier';
type LicenseType = 'basic' | 'premium' | 'exclusive';

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
      // Reset after 3 seconds
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
    // Note: File upload implementation requires expo-document-picker or similar
    // For now, just show an alert
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

  const renderProgressBar = () => {
    if (step === 'select' || step === 'success') return null;

    const steps = ['type', 'details', 'pricing', 'preview'];
    const currentIndex = steps.indexOf(step);

    return (
      <View style={styles.progressContainer}>
        {steps.map((s, index) => (
          <View key={s} style={[styles.progressBar, currentIndex >= index && styles.progressBarActive]} />
        ))}
      </View>
    );
  };

  const renderStepSelect = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Que souhaitez-vous publier ?</Text>
        <Text style={styles.stepSubtitle}>Choisissez entre produits (beats/kits) ou services professionnels</Text>
      </View>

      <View style={styles.optionsContainer}>
        {/* Product Option */}
        <TouchableOpacity onPress={() => setStep('type')} style={styles.optionCard} activeOpacity={0.9}>
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionIcon}
          >
            <Music size={32} color="#F5F5F5" />
          </LinearGradient>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>Produit Musical</Text>
            <Text style={styles.optionDescription}>Beats, Kits, Samples - Commission 5% par vente</Text>
          </View>
        </TouchableOpacity>

        {/* Service Option */}
        <TouchableOpacity
          onPress={() => handleProductTypeSelect('service')}
          style={styles.optionCard}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#06B6D4', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.optionIcon}
          >
            <FileAudio size={32} color="#F5F5F5" />
          </LinearGradient>
          <View style={styles.optionContent}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Service Professionnel</Text>
              <View style={styles.freeBadge}>
                <LinearGradient
                  colors={['#22C55E', '#06B6D4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.freeBadgeGradient}
                >
                  <Text style={styles.freeBadgeText}>GRATUIT</Text>
                </LinearGradient>
              </View>
            </View>
            <Text style={styles.optionDescription}>Mixing, Mastering, Recording - Sans commission</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        {[
          { label: 'Ventes', value: '0' },
          { label: 'Revenus', value: '0 F' },
          { label: 'Vues', value: '0' },
        ].map(stat => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </AnimatedView>
  );

  const renderStepType = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Type de produit</Text>
        <Text style={styles.stepSubtitle}>Sélectionnez le type de contenu musical</Text>
      </View>

      <View style={styles.typesContainer}>
        {[
          {
            type: 'beat' as ProductType,
            label: 'Beat / Instrumental',
            icon: Music,
            description: 'Production complète prête à utiliser',
          },
          {
            type: 'kit' as ProductType,
            label: 'Kit de Sons',
            icon: Package,
            description: 'Collection de samples et loops',
          },
          {
            type: 'sample' as ProductType,
            label: 'Sample Pack',
            icon: Briefcase,
            description: 'Samples individuels ou packs',
          },
        ].map(item => (
          <TouchableOpacity
            key={item.type}
            onPress={() => handleProductTypeSelect(item.type)}
            style={styles.typeCard}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.typeIcon}
            >
              <item.icon size={24} color="#F5F5F5" />
            </LinearGradient>
            <View style={styles.typeContent}>
              <Text style={styles.typeTitle}>{item.label}</Text>
              <Text style={styles.typeDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={() => setStep('select')} style={styles.backButton} activeOpacity={0.8}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </AnimatedView>
  );

  const renderStepDetails = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      {/* File Upload Areas */}
      {isProductType && (
        <>
          {/* Preview File */}
          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Preview Audio (30s max) *</Text>
            <TouchableOpacity onPress={() => handleFileUpload('preview')} style={styles.uploadArea} activeOpacity={0.9}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadIcon}
              >
                <Upload size={24} color="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.uploadTitle}>Preview (30s)</Text>
              <Text style={styles.uploadSubtitle}>MP3 uniquement (Max 5MB)</Text>
              <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8}>
                <Text style={styles.uploadButtonText}>Parcourir</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          {/* Full File */}
          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Fichier Complet *</Text>
            <TouchableOpacity onPress={() => handleFileUpload('full')} style={styles.uploadArea} activeOpacity={0.9}>
              <LinearGradient
                colors={['#8B5CF6', '#EC4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadIcon}
              >
                <FileAudio size={24} color="#F5F5F5" />
              </LinearGradient>
              <Text style={styles.uploadTitle}>Fichier complet (WAV/MP3/AIFF)</Text>
              <Text style={styles.uploadSubtitle}>Haute qualité (Max 100MB)</Text>
              <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8}>
                <Text style={styles.uploadButtonText}>Parcourir</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Service Portfolio */}
      {isServiceType && (
        <View style={styles.uploadSection}>
          <Text style={styles.uploadLabel}>Portfolio / Exemples de travaux</Text>
          <TouchableOpacity onPress={() => handleFileUpload('portfolio')} style={styles.uploadArea} activeOpacity={0.9}>
            <LinearGradient
              colors={['#06B6D4', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.uploadIcon}
            >
              <Upload size={24} color="#F5F5F5" />
            </LinearGradient>
            <Text style={styles.uploadTitle}>Images ou audio</Text>
            <Text style={styles.uploadSubtitle}>JPG, PNG, MP3 (Max 10MB chacun)</Text>
            <TouchableOpacity style={styles.uploadButton} activeOpacity={0.8}>
              <Text style={styles.uploadButtonText}>Parcourir</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}

      {/* Common Fields */}
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
          placeholderTextColor="#A3A3A3"
          multiline
          numberOfLines={5}
          style={styles.textArea}
          textAlignVertical="top"
        />
      </View>

      {/* Genre Selection */}
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

      {/* Product-specific fields */}
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

      {/* Service-specific fields */}
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

      {/* Navigation */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          onPress={() => setStep(isProductType ? 'type' : 'select')}
          style={styles.backButtonFull}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        <PrimaryButton onPress={handleNext} disabled={!canProceedToDetails()} style={styles.nextButton}>
          Suivant
        </PrimaryButton>
      </View>
    </AnimatedView>
  );

  const renderStepPricing = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>{isProductType ? 'Licences & Prix' : 'Configuration Tarifaire'}</Text>
        <Text style={styles.stepSubtitle}>
          {isProductType
            ? 'Définissez les prix pour chaque type de licence'
            : 'Choisissez votre modèle de tarification'}
        </Text>
      </View>

      {/* Product Licensing */}
      {isProductType && (
        <>
          {[
            {
              id: 'basic' as LicenseType,
              name: 'Basic',
              features: ['MP3 téléchargement', '2000 streams', 'Crédit obligatoire'],
              suggested: 19.99,
            },
            {
              id: 'premium' as LicenseType,
              name: 'Premium',
              features: ['WAV + MP3', '10000 streams', 'Crédit optionnel'],
              suggested: 49.99,
            },
            {
              id: 'exclusive' as LicenseType,
              name: 'Exclusive',
              features: ['Tous fichiers + Stems', 'Streams illimités', 'Droits exclusifs'],
              suggested: 299.99,
            },
          ].map(license => (
            <View key={license.id} style={styles.licenseCard}>
              <View style={styles.licenseHeader}>
                <Text style={styles.licenseName}>{license.name}</Text>
                <Text style={styles.licenseSuggested}>Suggéré: {license.suggested} F</Text>
              </View>
              <View style={styles.licenseFeatures}>
                {license.features.map(feature => (
                  <View key={feature} style={styles.licenseFeature}>
                    <View style={styles.licenseFeatureDot} />
                    <Text style={styles.licenseFeatureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.licensePriceInput}>
                <DollarSign size={20} color="#A3A3A3" style={styles.priceIcon} />
                <TextInput
                  placeholder={license.suggested.toString()}
                  value={licenses[license.id].price}
                  onChangeText={value => updateLicensePrice(license.id, value)}
                  keyboardType="numeric"
                  style={styles.priceInput}
                  placeholderTextColor="#A3A3A3"
                />
              </View>
            </View>
          ))}

          <View style={styles.infoCard}>
            <LinearGradient
              colors={['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.infoCardGradient}
            >
              <Text style={styles.infoCardText}>
                <Text style={styles.infoCardTextAccent}>💰 Commission plateforme: 5%</Text>
                {'\n'}
                Vous recevrez 95% du prix de vente après chaque transaction
              </Text>
            </LinearGradient>
          </View>
        </>
      )}

      {/* Service Pricing */}
      {isServiceType && (
        <>
          {/* Pricing Type Selection */}
          <View style={styles.pricingTypeSection}>
            <Text style={styles.pricingTypeLabel}>Type de tarification *</Text>
            <View style={styles.pricingTypeOptions}>
              {[
                { id: 'fixed' as PricingType, label: 'Prix fixe', description: 'Un seul prix pour votre service' },
                { id: 'on-demand' as PricingType, label: 'Sur devis', description: 'Négociation selon le projet' },
                {
                  id: 'multi-tier' as PricingType,
                  label: 'Packages multiples',
                  description: 'Basic, Standard, Premium',
                },
              ].map(type => (
                <TouchableOpacity
                  key={type.id}
                  onPress={() => setPricingType(type.id)}
                  style={[styles.pricingTypeCard, pricingType === type.id && styles.pricingTypeCardSelected]}
                  activeOpacity={0.9}
                >
                  <Text style={styles.pricingTypeTitle}>{type.label}</Text>
                  <Text style={styles.pricingTypeDescription}>{type.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Fixed Pricing */}
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

          {/* On-Demand Pricing */}
          {pricingType === 'on-demand' && (
            <View style={styles.infoCard}>
              <LinearGradient
                colors={['rgba(6, 182, 212, 0.1)', 'rgba(139, 92, 246, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.infoCardGradient}
              >
                <Text style={styles.infoCardText}>
                  💬 Les clients vous contacteront directement pour discuter du prix selon leur projet. Vous pourrez
                  négocier via la messagerie intégrée.
                </Text>
              </LinearGradient>
            </View>
          )}

          {/* Multi-Tier Pricing */}
          {pricingType === 'multi-tier' && (
            <View style={styles.multiTierContainer}>
              {multiTierPrices.map((tier, index) => (
                <View key={tier.name} style={styles.tierCard}>
                  <Text style={styles.tierName}>{tier.name}</Text>
                  <InputField
                    label="Prix (F CFA)"
                    placeholder={index === 0 ? '15000' : index === 1 ? '35000' : '65000'}
                    value={tier.price}
                    onChangeText={value => updateMultiTierPrice(index, 'price', value)}
                    keyboardType="numeric"
                  />
                  <View style={styles.textAreaSection}>
                    <Text style={styles.textAreaLabel}>Fonctionnalités incluses</Text>
                    <TextInput
                      value={tier.features}
                      onChangeText={value => updateMultiTierPrice(index, 'features', value)}
                      placeholder="Ex: Mixage de 1 track, 2 révisions..."
                      placeholderTextColor="#A3A3A3"
                      multiline
                      numberOfLines={2}
                      style={[styles.textArea, styles.tierTextArea]}
                      textAlignVertical="top"
                    />
                  </View>
                  <InputField
                    label="Délai de livraison"
                    placeholder="3 jours"
                    value={tier.deliveryDays}
                    onChangeText={value => updateMultiTierPrice(index, 'deliveryDays', value)}
                  />
                </View>
              ))}
            </View>
          )}

          <View style={styles.infoCard}>
            <LinearGradient
              colors={['rgba(34, 197, 94, 0.1)', 'rgba(6, 182, 212, 0.1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.infoCardGradient}
            >
              <Text style={styles.infoCardText}>
                <Text style={styles.infoCardTextAccentGreen}>✨ Services 100% GRATUITS</Text>
                {'\n'}
                Aucune commission sur les réservations. Le paiement se fait directement entre vous et le client.
              </Text>
            </LinearGradient>
          </View>
        </>
      )}

      {/* Navigation */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={() => setStep('details')} style={styles.backButtonFull} activeOpacity={0.8}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        <PrimaryButton onPress={handleNext} disabled={!canProceedToPricing()} style={styles.nextButton}>
          Suivant
        </PrimaryButton>
      </View>
    </AnimatedView>
  );

  const renderStepPreview = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Vérification finale</Text>
        <Text style={styles.stepSubtitle}>Vérifiez toutes les informations avant de publier</Text>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <LinearGradient
            colors={isProductType ? ['#6366F1', '#8B5CF6'] : ['#06B6D4', '#8B5CF6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryIcon}
          >
            {isProductType ? <Music size={32} color="#F5F5F5" /> : <FileAudio size={32} color="#F5F5F5" />}
          </LinearGradient>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>{title}</Text>
            <Text style={styles.summaryType}>{uploadType?.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.summaryDetails}>
          <View style={styles.summaryDetail}>
            <Text style={styles.summaryDetailLabel}>Description</Text>
            <Text style={styles.summaryDetailValue}>{description}</Text>
          </View>

          <View style={styles.summaryDetail}>
            <Text style={styles.summaryDetailLabel}>Genres</Text>
            <View style={styles.summaryTags}>
              {selectedGenres.map(genre => (
                <View key={genre} style={styles.summaryTag}>
                  <Text style={styles.summaryTagText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>

          {isProductType && bpm && (
            <View style={styles.summaryRow}>
              <View style={styles.summaryDetailHalf}>
                <Text style={styles.summaryDetailLabel}>BPM</Text>
                <Text style={styles.summaryDetailValue}>{bpm}</Text>
              </View>
              {musicKey && (
                <View style={styles.summaryDetailHalf}>
                  <Text style={styles.summaryDetailLabel}>Tonalité</Text>
                  <Text style={styles.summaryDetailValue}>{musicKey}</Text>
                </View>
              )}
            </View>
          )}

          {isServiceType && (
            <>
              <View style={styles.summaryDetail}>
                <Text style={styles.summaryDetailLabel}>Type de tarification</Text>
                <Text style={styles.summaryDetailValue}>
                  {pricingType === 'fixed' && 'Prix fixe'}
                  {pricingType === 'on-demand' && 'Sur devis'}
                  {pricingType === 'multi-tier' && 'Packages multiples'}
                </Text>
              </View>
              {availability.serviceTypes.length > 0 && (
                <View style={styles.summaryDetail}>
                  <Text style={styles.summaryDetailLabel}>Prestations</Text>
                  <View style={styles.summaryTags}>
                    {availability.serviceTypes.map(type => (
                      <View key={type} style={[styles.summaryTag, styles.summaryTagService]}>
                        <Text style={[styles.summaryTagText, styles.summaryTagTextService]}>{type}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}
        </View>
      </View>

      <View style={styles.infoCard}>
        <LinearGradient
          colors={['rgba(245, 158, 11, 0.1)', 'rgba(236, 72, 153, 0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.infoCardGradient}
        >
          <Text style={styles.infoCardText}>
            ⚠️ Votre {isProductType ? 'produit' : 'service'} sera examiné par notre équipe avant d'être visible sur le
            marketplace. Vous recevrez une notification dès validation.
          </Text>
        </LinearGradient>
      </View>

      {/* Navigation */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={() => setStep('pricing')} style={styles.backButtonFull} activeOpacity={0.8}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        <PrimaryButton onPress={handleNext} style={styles.nextButton}>
          Publier maintenant
        </PrimaryButton>
      </View>
    </AnimatedView>
  );

  const renderStepSuccess = () => (
    <AnimatedView entering={FadeIn} exiting={FadeOut} style={styles.successContainer}>
      <AnimatedView entering={FadeIn.delay(200)} style={styles.successIcon}>
        <LinearGradient
          colors={['#22C55E', '#06B6D4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.successIconGradient}
        >
          <CheckCircle size={48} color="#F5F5F5" fill="#F5F5F5" />
        </LinearGradient>
      </AnimatedView>
      <AnimatedView entering={FadeIn.delay(300)}>
        <Text style={styles.successTitle}>Publication envoyée !</Text>
      </AnimatedView>
      <AnimatedView entering={FadeIn.delay(400)}>
        <Text style={styles.successMessage}>
          {isProductType ? 'Votre produit est en attente de validation' : 'Votre service est en attente de validation'}
        </Text>
      </AnimatedView>
    </AnimatedView>
  );

  const getStepTitle = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Publier</Text>
          <Text style={styles.headerSubtitle}>{getStepTitle()}</Text>
        </View>
        {renderProgressBar()}
      </View>

      {/* Content */}
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
    marginTop: 16,
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
  scrollContent: {
    paddingBottom: 40,
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
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#404040',
  },
  optionIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
    gap: 4,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  optionTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
  },
  optionDescription: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  freeBadge: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  freeBadgeGradient: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  freeBadgeText: {
    color: '#F5F5F5',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
  },
  statValue: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    color: '#A3A3A3',
    fontSize: 11,
    fontWeight: '400',
  },
  typesContainer: {
    gap: 12,
  },
  typeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 2,
    borderColor: '#404040',
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeContent: {
    flex: 1,
    gap: 4,
  },
  typeTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  typeDescription: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  uploadSection: {
    gap: 8,
  },
  uploadLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  uploadArea: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#404040',
    backgroundColor: '#111111',
    alignItems: 'center',
    gap: 12,
  },
  uploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  uploadSubtitle: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  uploadButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
  },
  uploadButtonText: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
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
  chipsSection: {
    gap: 12,
  },
  chipsLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 16,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '500',
  },
  backButtonFull: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    marginBottom: 0,
  },
  licenseCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 12,
  },
  licenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  licenseName: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
  },
  licenseSuggested: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
  },
  licenseFeatures: {
    gap: 8,
    marginBottom: 12,
  },
  licenseFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  licenseFeatureDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6366F1',
  },
  licenseFeatureText: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  licensePriceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#404040',
    borderRadius: 12,
  },
  priceIcon: {
    marginRight: 12,
  },
  priceInput: {
    flex: 1,
    color: '#F5F5F5',
    fontSize: 16,
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
  infoCardTextAccentGreen: {
    color: '#22C55E',
    fontWeight: '600',
  },
  pricingTypeSection: {
    gap: 12,
  },
  pricingTypeLabel: {
    color: '#D4D4D4',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  pricingTypeOptions: {
    gap: 12,
  },
  pricingTypeCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#404040',
    backgroundColor: '#111111',
    gap: 4,
  },
  pricingTypeCardSelected: {
    borderColor: '#06B6D4',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  pricingTypeTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  pricingTypeDescription: {
    color: '#A3A3A3',
    fontSize: 14,
    fontWeight: '400',
  },
  multiTierContainer: {
    gap: 16,
  },
  tierCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 12,
  },
  tierName: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tierTextArea: {
    minHeight: 80,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#404040',
    gap: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(64, 64, 64, 0.5)',
  },
  summaryIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryContent: {
    flex: 1,
    gap: 4,
  },
  summaryTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryType: {
    color: '#A3A3A3',
    fontSize: 12,
    fontWeight: '400',
    textTransform: 'uppercase',
  },
  summaryDetails: {
    gap: 16,
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
    gap: 12,
  },
  summaryDetailHalf: {
    flex: 1,
    gap: 8,
  },
  summaryTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  summaryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  summaryTagText: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '500',
  },
  summaryTagService: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
  },
  summaryTagTextService: {
    color: '#06B6D4',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 24,
    overflow: 'hidden',
  },
  successIconGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  successMessage: {
    color: '#A3A3A3',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
  },
});
