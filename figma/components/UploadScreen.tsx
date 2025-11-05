import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Music,
  FileAudio,
  CheckCircle,
  DollarSign,
  Tag,
  Clock,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  Package,
} from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { InputField } from './InputField';
import { CategoryChip } from './CategoryChip';

type ProductType = 'beat' | 'kit' | 'sample' | 'service' | null;
type PricingType = 'fixed' | 'on-demand' | 'multi-tier';
type LicenseType = 'basic' | 'premium' | 'exclusive';

export function UploadScreen() {
  const [step, setStep] = useState<'select' | 'type' | 'details' | 'pricing' | 'preview' | 'success'>('select');
  const [uploadType, setUploadType] = useState<ProductType>(null);

  // Common fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [previewFile, setPreviewFile] = useState<string>('');
  const [fullFile, setFullFile] = useState<string>('');

  // Beat/Kit/Sample specific fields
  const [bpm, setBpm] = useState('');
  const [musicKey, setMusicKey] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [licenses, setLicenses] = useState({
    basic: { price: '19.99', enabled: true },
    premium: { price: '49.99', enabled: true },
    exclusive: { price: '299.99', enabled: true },
  });

  // Service specific fields
  const [pricingType, setPricingType] = useState<PricingType>('fixed');
  const [servicePrice, setServicePrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [portfolioImages, setPortfolioImages] = useState<string[]>([]);
  const [availability, setAvailability] = useState({
    zones: [] as string[],
    schedule: '',
    serviceTypes: [] as string[],
  });
  const [multiTierPrices, setMultiTierPrices] = useState([
    { name: 'Basic', price: '', features: '', deliveryDays: '' },
    { name: 'Standard', price: '', features: '', deliveryDays: '' },
    { name: 'Premium', price: '', features: '', deliveryDays: '' },
  ]);

  const genres = ['Afrobeat', 'Amapiano', 'Trap', 'Hip-Hop', 'R&B', 'Drill', 'Dancehall', 'Gospel', 'Lo-fi', 'EDM'];
  const zones = ['Dakar', 'Abidjan', 'Lagos', 'Accra', 'Bamako', 'Cotonou', 'Lomé', 'Ouagadougou'];
  const serviceTypes = ['Recording', 'Mixing', 'Mastering', 'Production', 'Beat Making', 'Vocal Coaching'];

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
    setPreviewFile('');
    setFullFile('');
    setBpm('');
    setMusicKey('');
    setTags([]);
    setServicePrice('');
    setDeliveryTime('');
    setPortfolioImages([]);
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

  const updateMultiTierPrice = (index: number, field: string, value: string) => {
    setMultiTierPrices(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const isProductType = uploadType === 'beat' || uploadType === 'kit' || uploadType === 'sample';
  const isServiceType = uploadType === 'service';

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] pb-20 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-[#F5F5F5] mb-1">Publier</h1>
            <p className="text-[#A3A3A3]">
              {step === 'select' && 'Partagez votre talent'}
              {step === 'type' && 'Choisissez le type'}
              {step === 'details' && 'Détails du produit'}
              {step === 'pricing' && 'Configuration tarifaire'}
              {step === 'preview' && 'Vérification'}
            </p>
          </motion.div>

          {/* Progress Indicator */}
          {step !== 'select' && step !== 'success' && (
            <div className="flex gap-2 mt-4">
              {['type', 'details', 'pricing', 'preview'].map((s, index) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    ['type', 'details', 'pricing', 'preview'].indexOf(step) >= index
                      ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                      : 'bg-[#404040]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step: Select Product or Service */}
        {step === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 py-8 space-y-6"
          >
            <div>
              <h2 className="text-[#F5F5F5] mb-2">Que souhaitez-vous publier ?</h2>
              <p className="text-[#A3A3A3]">Choisissez entre produits (beats/kits) ou services professionnels</p>
            </div>

            <div className="space-y-4">
              {/* Upload Product (Beat/Kit/Sample) */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep('type')}
                className="w-full p-6 rounded-2xl bg-[#111111] border-2 border-[#404040] hover:border-[#6366F1] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Music className="w-8 h-8 text-[#F5F5F5]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#F5F5F5] mb-2">Produit Musical</h3>
                    <p className="text-[#A3A3A3]">Beats, Kits, Samples - Commission 5% par vente</p>
                  </div>
                </div>
              </motion.button>

              {/* Upload Service */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleProductTypeSelect('service')}
                className="w-full p-6 rounded-2xl bg-[#111111] border-2 border-[#404040] hover:border-[#06B6D4] transition-all text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileAudio className="w-8 h-8 text-[#F5F5F5]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-[#F5F5F5]">Service Professionnel</h3>
                      <span
                        className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#22C55E] to-[#06B6D4] text-[#F5F5F5]"
                        style={{ fontSize: '10px' }}
                      >
                        GRATUIT
                      </span>
                    </div>
                    <p className="text-[#A3A3A3]">Mixing, Mastering, Recording - Sans commission</p>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
                { label: 'Ventes', value: '0' },
                { label: 'Revenus', value: '0 F' },
                { label: 'Vues', value: '0' },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl bg-[#111111] border border-[#404040] text-center">
                  <div className="text-[#F5F5F5] mb-1">{stat.value}</div>
                  <div className="text-[#A3A3A3]" style={{ fontSize: '11px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step: Select Product Type (Beat/Kit/Sample) */}
        {step === 'type' && (
          <motion.div
            key="type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 py-8 space-y-6"
          >
            <div>
              <h2 className="text-[#F5F5F5] mb-2">Type de produit</h2>
              <p className="text-[#A3A3A3]">Sélectionnez le type de contenu musical</p>
            </div>

            <div className="space-y-3">
              {[
                {
                  type: 'beat',
                  label: 'Beat / Instrumental',
                  icon: Music,
                  description: 'Production complète prête à utiliser',
                },
                { type: 'kit', label: 'Kit de Sons', icon: Package, description: 'Collection de samples et loops' },
                { type: 'sample', label: 'Sample Pack', icon: Briefcase, description: 'Samples individuels ou packs' },
              ].map(item => (
                <motion.button
                  key={item.type}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleProductTypeSelect(item.type as ProductType)}
                  className="w-full p-5 rounded-2xl bg-[#111111] border-2 border-[#404040] hover:border-[#6366F1] transition-all text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-[#F5F5F5]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#F5F5F5] mb-1">{item.label}</h3>
                      <p className="text-[#A3A3A3] text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setStep('select')}
              className="w-full py-3 px-4 rounded-2xl bg-[#111111] border border-[#404040] text-[#D4D4D4] hover:bg-[#1A1A1A] transition-colors"
            >
              Retour
            </button>
          </motion.div>
        )}

        {/* Step: Details */}
        {step === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 py-8 space-y-6"
          >
            {/* File Upload Areas */}
            {isProductType && (
              <>
                {/* Preview File (30s max) */}
                <div>
                  <label className="block text-[#D4D4D4] mb-2">Preview Audio (30s max) *</label>
                  <div className="p-6 rounded-2xl border-2 border-dashed border-[#404040] bg-[#111111] hover:border-[#6366F1] transition-all cursor-pointer">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                        <Upload className="w-6 h-6 text-[#F5F5F5]" />
                      </div>
                      <p className="text-[#F5F5F5] mb-1">Preview (30s)</p>
                      <p className="text-[#A3A3A3] text-sm">MP3 uniquement (Max 5MB)</p>
                      <button className="mt-3 px-4 py-2 rounded-xl bg-[#1A1A1A] text-[#D4D4D4] hover:bg-[#252525] transition-colors text-sm">
                        Parcourir
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full File */}
                <div>
                  <label className="block text-[#D4D4D4] mb-2">Fichier Complet *</label>
                  <div className="p-6 rounded-2xl border-2 border-dashed border-[#404040] bg-[#111111] hover:border-[#6366F1] transition-all cursor-pointer">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center">
                        <FileAudio className="w-6 h-6 text-[#F5F5F5]" />
                      </div>
                      <p className="text-[#F5F5F5] mb-1">Fichier complet (WAV/MP3/AIFF)</p>
                      <p className="text-[#A3A3A3] text-sm">Haute qualité (Max 100MB)</p>
                      <button className="mt-3 px-4 py-2 rounded-xl bg-[#1A1A1A] text-[#D4D4D4] hover:bg-[#252525] transition-colors text-sm">
                        Parcourir
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Service Portfolio */}
            {isServiceType && (
              <div>
                <label className="block text-[#D4D4D4] mb-2">Portfolio / Exemples de travaux</label>
                <div className="p-6 rounded-2xl border-2 border-dashed border-[#404040] bg-[#111111] hover:border-[#06B6D4] transition-all cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center">
                      <Upload className="w-6 h-6 text-[#F5F5F5]" />
                    </div>
                    <p className="text-[#F5F5F5] mb-1">Images ou audio</p>
                    <p className="text-[#A3A3A3] text-sm">JPG, PNG, MP3 (Max 10MB chacun)</p>
                    <button className="mt-3 px-4 py-2 rounded-xl bg-[#1A1A1A] text-[#D4D4D4] hover:bg-[#252525] transition-colors text-sm">
                      Parcourir
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Common Fields */}
            <InputField
              label="Titre *"
              placeholder={isProductType ? 'Ex: Afrobeat Summer Vibes' : 'Ex: Mixing & Mastering Professionnel'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              icon={Tag}
            />

            <div>
              <label className="block text-[#D4D4D4] mb-2">Description *</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={
                  isProductType
                    ? "Décrivez votre production, l'ambiance, les instruments utilisés..."
                    : 'Décrivez vos services, votre expérience, votre méthode de travail...'
                }
                rows={5}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#404040] rounded-2xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all resize-none"
              />
            </div>

            {/* Genre Selection */}
            <div>
              <label className="block text-[#D4D4D4] mb-3">Genre(s) Musical * (sélectionnez au moins 1)</label>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <CategoryChip
                    key={genre}
                    label={genre}
                    selected={selectedGenres.includes(genre)}
                    onClick={() => toggleGenre(genre)}
                  />
                ))}
              </div>
            </div>

            {/* Product-specific fields */}
            {isProductType && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="BPM *"
                    placeholder="120"
                    value={bpm}
                    onChange={e => setBpm(e.target.value)}
                    type="number"
                  />
                  <InputField
                    label="Tonalité"
                    placeholder="Am"
                    value={musicKey}
                    onChange={e => setMusicKey(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[#D4D4D4] mb-2">Tags (séparés par virgule)</label>
                  <input
                    type="text"
                    placeholder="dancehall, summer, vibes, uptempo"
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#404040] rounded-2xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                  />
                </div>
              </>
            )}

            {/* Service-specific fields */}
            {isServiceType && (
              <>
                <div>
                  <label className="block text-[#D4D4D4] mb-3">Types de prestations *</label>
                  <div className="flex flex-wrap gap-2">
                    {serviceTypes.map(type => (
                      <CategoryChip
                        key={type}
                        label={type}
                        selected={availability.serviceTypes.includes(type)}
                        onClick={() => toggleServiceType(type)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#D4D4D4] mb-3">Zones géographiques disponibles</label>
                  <div className="flex flex-wrap gap-2">
                    {zones.map(zone => (
                      <CategoryChip
                        key={zone}
                        label={zone}
                        selected={availability.zones.includes(zone)}
                        onClick={() => toggleZone(zone)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(isProductType ? 'type' : 'select')}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#111111] border border-[#404040] text-[#D4D4D4] hover:bg-[#1A1A1A] transition-colors"
              >
                Retour
              </button>
              <PrimaryButton
                onClick={handleNext}
                disabled={!title || !description || selectedGenres.length === 0 || (isProductType && !bpm)}
                className="flex-1"
              >
                Suivant
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Step: Pricing */}
        {step === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 py-8 space-y-6"
          >
            <div>
              <h2 className="text-[#F5F5F5] mb-2">{isProductType ? 'Licences & Prix' : 'Configuration Tarifaire'}</h2>
              <p className="text-[#A3A3A3]">
                {isProductType
                  ? 'Définissez les prix pour chaque type de licence'
                  : 'Choisissez votre modèle de tarification'}
              </p>
            </div>

            {/* Product Licensing */}
            {isProductType && (
              <div className="space-y-4">
                {[
                  {
                    id: 'basic',
                    name: 'Basic',
                    features: ['MP3 téléchargement', '2000 streams', 'Crédit obligatoire'],
                    suggested: 19.99,
                  },
                  {
                    id: 'premium',
                    name: 'Premium',
                    features: ['WAV + MP3', '10000 streams', 'Crédit optionnel'],
                    suggested: 49.99,
                  },
                  {
                    id: 'exclusive',
                    name: 'Exclusive',
                    features: ['Tous fichiers + Stems', 'Streams illimités', 'Droits exclusifs'],
                    suggested: 299.99,
                  },
                ].map(license => (
                  <div key={license.id} className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-[#F5F5F5]">{license.name}</h3>
                      <span className="text-[#A3A3A3] text-sm">Suggéré: {license.suggested} F</span>
                    </div>
                    <ul className="space-y-1 mb-3">
                      {license.features.map(feature => (
                        <li key={feature} className="text-[#A3A3A3] text-sm flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#6366F1]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
                      <input
                        type="number"
                        placeholder={license.suggested.toString()}
                        value={licenses[license.id as LicenseType].price}
                        onChange={e =>
                          setLicenses(prev => ({
                            ...prev,
                            [license.id]: { ...prev[license.id as LicenseType], price: e.target.value },
                          }))
                        }
                        className="w-full pl-12 pr-4 py-3 bg-[#1A1A1A] border border-[#404040] rounded-xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
                      />
                    </div>
                  </div>
                ))}

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/30">
                  <p className="text-[#D4D4D4] text-sm">
                    <span className="text-[#6366F1]">💰 Commission plateforme: 5%</span>
                    <br />
                    Vous recevrez 95% du prix de vente après chaque transaction
                  </p>
                </div>
              </div>
            )}

            {/* Service Pricing */}
            {isServiceType && (
              <>
                {/* Pricing Type Selection */}
                <div>
                  <label className="block text-[#D4D4D4] mb-3">Type de tarification *</label>
                  <div className="space-y-3">
                    {[
                      { id: 'fixed', label: 'Prix fixe', description: 'Un seul prix pour votre service' },
                      { id: 'on-demand', label: 'Sur devis', description: 'Négociation selon le projet' },
                      { id: 'multi-tier', label: 'Packages multiples', description: 'Basic, Standard, Premium' },
                    ].map(type => (
                      <motion.button
                        key={type.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPricingType(type.id as PricingType)}
                        className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                          pricingType === type.id
                            ? 'border-[#06B6D4] bg-[#06B6D4]/10'
                            : 'border-[#404040] bg-[#111111] hover:border-[#06B6D4]/50'
                        }`}
                      >
                        <h3 className="text-[#F5F5F5] mb-1">{type.label}</h3>
                        <p className="text-[#A3A3A3] text-sm">{type.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Fixed Pricing */}
                {pricingType === 'fixed' && (
                  <>
                    <InputField
                      label="Prix du service (F CFA)"
                      placeholder="25000"
                      value={servicePrice}
                      onChange={e => setServicePrice(e.target.value)}
                      type="number"
                      icon={DollarSign}
                    />
                    <InputField
                      label="Délai de livraison moyen"
                      placeholder="3-5 jours"
                      value={deliveryTime}
                      onChange={e => setDeliveryTime(e.target.value)}
                      icon={Clock}
                    />
                  </>
                )}

                {/* On-Demand Pricing */}
                {pricingType === 'on-demand' && (
                  <div className="p-4 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/30">
                    <p className="text-[#D4D4D4] text-sm">
                      💬 Les clients vous contacteront directement pour discuter du prix selon leur projet. Vous pourrez
                      négocier via la messagerie intégrée.
                    </p>
                  </div>
                )}

                {/* Multi-Tier Pricing */}
                {pricingType === 'multi-tier' && (
                  <div className="space-y-4">
                    {multiTierPrices.map((tier, index) => (
                      <div key={tier.name} className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
                        <h3 className="text-[#F5F5F5] mb-3">{tier.name}</h3>
                        <div className="space-y-3">
                          <InputField
                            label="Prix (F CFA)"
                            placeholder={index === 0 ? '15000' : index === 1 ? '35000' : '65000'}
                            value={tier.price}
                            onChange={e => updateMultiTierPrice(index, 'price', e.target.value)}
                            type="number"
                            icon={DollarSign}
                          />
                          <div>
                            <label className="block text-[#D4D4D4] mb-2 text-sm">Fonctionnalités incluses</label>
                            <textarea
                              value={tier.features}
                              onChange={e => updateMultiTierPrice(index, 'features', e.target.value)}
                              placeholder="Ex: Mixage de 1 track, 2 révisions..."
                              rows={2}
                              className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#404040] rounded-xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 transition-all resize-none text-sm"
                            />
                          </div>
                          <InputField
                            label="Délai de livraison"
                            placeholder="3 jours"
                            value={tier.deliveryDays}
                            onChange={e => updateMultiTierPrice(index, 'deliveryDays', e.target.value)}
                            icon={Clock}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#22C55E]/10 to-[#06B6D4]/10 border border-[#22C55E]/30">
                  <p className="text-[#D4D4D4] text-sm">
                    <span className="text-[#22C55E]">✨ Services 100% GRATUITS</span>
                    <br />
                    Aucune commission sur les réservations. Le paiement se fait directement entre vous et le client.
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep('details')}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#111111] border border-[#404040] text-[#D4D4D4] hover:bg-[#1A1A1A] transition-colors"
              >
                Retour
              </button>
              <PrimaryButton
                onClick={handleNext}
                disabled={
                  isProductType
                    ? !licenses.basic.price && !licenses.premium.price && !licenses.exclusive.price
                    : pricingType === 'fixed' && !servicePrice
                }
                className="flex-1"
              >
                Suivant
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Step: Preview/Review */}
        {step === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6 py-8 space-y-6"
          >
            <div>
              <h2 className="text-[#F5F5F5] mb-2">Vérification finale</h2>
              <p className="text-[#A3A3A3]">Vérifiez toutes les informations avant de publier</p>
            </div>

            {/* Summary Card */}
            <div className="p-5 rounded-2xl bg-[#111111] border border-[#404040]">
              <div className="flex items-start gap-4 mb-4 pb-4 border-b border-[#404040]/50">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                  {isProductType ? (
                    <Music className="w-8 h-8 text-[#F5F5F5]" />
                  ) : (
                    <FileAudio className="w-8 h-8 text-[#F5F5F5]" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#F5F5F5] mb-1">{title}</h3>
                  <p className="text-[#A3A3A3] text-sm">{uploadType?.toUpperCase()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[#A3A3A3] text-sm mb-1">Description</p>
                  <p className="text-[#D4D4D4] text-sm">{description}</p>
                </div>

                <div>
                  <p className="text-[#A3A3A3] text-sm mb-1">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGenres.map(genre => (
                      <span key={genre} className="px-2 py-1 rounded-lg bg-[#6366F1]/20 text-[#6366F1] text-xs">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {isProductType && bpm && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[#A3A3A3] text-sm mb-1">BPM</p>
                      <p className="text-[#F5F5F5]">{bpm}</p>
                    </div>
                    {musicKey && (
                      <div>
                        <p className="text-[#A3A3A3] text-sm mb-1">Tonalité</p>
                        <p className="text-[#F5F5F5]">{musicKey}</p>
                      </div>
                    )}
                  </div>
                )}

                {isServiceType && (
                  <>
                    <div>
                      <p className="text-[#A3A3A3] text-sm mb-1">Type de tarification</p>
                      <p className="text-[#F5F5F5]">
                        {pricingType === 'fixed' && 'Prix fixe'}
                        {pricingType === 'on-demand' && 'Sur devis'}
                        {pricingType === 'multi-tier' && 'Packages multiples'}
                      </p>
                    </div>
                    {availability.serviceTypes.length > 0 && (
                      <div>
                        <p className="text-[#A3A3A3] text-sm mb-1">Prestations</p>
                        <div className="flex flex-wrap gap-2">
                          {availability.serviceTypes.map(type => (
                            <span key={type} className="px-2 py-1 rounded-lg bg-[#06B6D4]/20 text-[#06B6D4] text-xs">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-[#EC4899]/10 border border-[#F59E0B]/30">
              <p className="text-[#D4D4D4] text-sm">
                ⚠️ Votre {isProductType ? 'produit' : 'service'} sera examiné par notre équipe avant d'être visible sur
                le marketplace. Vous recevrez une notification dès validation.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('pricing')}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#111111] border border-[#404040] text-[#D4D4D4] hover:bg-[#1A1A1A] transition-colors"
              >
                Retour
              </button>
              <PrimaryButton onClick={handleNext} className="flex-1">
                Publier maintenant
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* Step: Success */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex items-center justify-center h-full px-6 py-8"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#22C55E] to-[#06B6D4] flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-[#F5F5F5]" />
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#F5F5F5] mb-2"
              >
                Publication envoyée !
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-[#A3A3A3]"
              >
                {isProductType
                  ? 'Votre produit est en attente de validation'
                  : 'Votre service est en attente de validation'}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
