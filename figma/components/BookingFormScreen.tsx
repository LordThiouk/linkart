import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Clock, FileText, Upload, CheckCircle } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { InputField } from './InputField';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookingFormScreenProps {
  serviceId: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  packageName: string;
  price: number;
  deliveryTime: string;
  onBack: () => void;
  onSubmit: () => void;
}

export function BookingFormScreen({
  serviceId,
  serviceName,
  providerName,
  providerImage,
  packageName,
  price,
  deliveryTime,
  onBack,
  onSubmit,
}: BookingFormScreenProps) {
  const [step, setStep] = useState<'details' | 'files' | 'review'>('details');
  const [formData, setFormData] = useState({
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

  const handleSubmit = () => {
    // Here you would send the booking request to the backend
    console.log('Booking submitted:', { serviceId, formData, uploadedFiles });
    onSubmit();
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] overflow-y-auto pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-[#404040]/50">
        <div className="px-6 pt-12 pb-4">
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-3 rounded-xl bg-[#111111] border border-[#404040] hover:border-[#6366F1]/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#D4D4D4]" />
            </motion.button>

            <div className="flex-1">
              <h1 className="text-[#F5F5F5]">Réservation</h1>
              <p className="text-[#A3A3A3]">Étape {step === 'details' ? '1' : step === 'files' ? '2' : '3'} sur 3</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-2">
            {['details', 'files', 'review'].map((s, index) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  step === s || (step === 'files' && s === 'details') || (step === 'review' && s !== 'review')
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]'
                    : 'bg-[#404040]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Service Info Card */}
      <div className="px-6 py-4">
        <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
          <div className="flex items-center gap-3 mb-3">
            <ImageWithFallback src={providerImage} alt={providerName} className="w-12 h-12 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="text-[#F5F5F5] truncate">{serviceName}</h3>
              <p className="text-[#A3A3A3]">{providerName}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[#404040]/50">
            <div>
              <p className="text-[#A3A3A3] text-xs">Package</p>
              <p className="text-[#F5F5F5]">{packageName}</p>
            </div>
            <div className="text-right">
              <p className="text-[#A3A3A3] text-xs">Prix</p>
              <p className="text-[#F59E0B]">€{price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-[#A3A3A3] text-xs">Délai</p>
              <p className="text-[#F5F5F5]">{deliveryTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="px-6 py-4 flex-1">
        {step === 'details' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <h2 className="text-[#F5F5F5] mb-2">Détails du projet</h2>
              <p className="text-[#A3A3A3]">
                Décrivez votre projet pour aider le prestataire à mieux comprendre vos besoins
              </p>
            </div>

            <InputField
              label="Nom du projet"
              placeholder="Ex: Mon EP Afrobeat 2025"
              value={formData.projectName}
              onChange={e => setFormData({ ...formData, projectName: e.target.value })}
              icon={FileText}
            />

            <div>
              <label className="block text-[#D4D4D4] mb-2">Description du projet</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez en détail ce que vous attendez du prestataire..."
                rows={6}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#404040] rounded-2xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all resize-none"
              />
            </div>

            <InputField
              label="Date limite souhaitée (optionnel)"
              type="date"
              value={formData.deadline}
              onChange={e => setFormData({ ...formData, deadline: e.target.value })}
              icon={Calendar}
            />

            <div>
              <label className="block text-[#D4D4D4] mb-2">Notes additionnelles (optionnel)</label>
              <textarea
                value={formData.additionalNotes}
                onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Références, style souhaité, informations complémentaires..."
                rows={4}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#404040] rounded-2xl text-[#F5F5F5] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all resize-none"
              />
            </div>
          </motion.div>
        )}

        {step === 'files' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <h2 className="text-[#F5F5F5] mb-2">Fichiers du projet</h2>
              <p className="text-[#A3A3A3]">
                Uploadez vos fichiers audio, références ou tout autre document nécessaire
              </p>
            </div>

            {/* Upload Area */}
            <div className="p-8 rounded-2xl border-2 border-dashed border-[#404040] bg-[#111111] hover:border-[#6366F1] transition-all cursor-pointer text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                <Upload className="w-8 h-8 text-[#F5F5F5]" />
              </div>
              <h3 className="text-[#F5F5F5] mb-2">Glissez vos fichiers ici</h3>
              <p className="text-[#A3A3A3] mb-4">ou cliquez pour parcourir</p>
              <button className="px-6 py-2 rounded-xl bg-[#1A1A1A] text-[#D4D4D4] hover:bg-[#252525] transition-colors">
                Parcourir
              </button>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-[#F5F5F5]">Fichiers uploadés ({uploadedFiles.length})</h3>
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-[#111111] border border-[#404040] flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#6366F1]/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#6366F1]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F5] truncate">{file}</p>
                      <p className="text-[#A3A3A3] text-xs">2.4 MB</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-[#1A1A1A] transition-colors">
                      <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/30">
              <p className="text-[#D4D4D4] text-sm">
                💡 <span className="text-[#6366F1]">Conseil:</span> Plus vos fichiers et descriptions sont précis,
                meilleur sera le résultat final.
              </p>
            </div>
          </motion.div>
        )}

        {step === 'review' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div>
              <h2 className="text-[#F5F5F5] mb-2">Vérification</h2>
              <p className="text-[#A3A3A3]">Vérifiez les informations avant d'envoyer votre demande</p>
            </div>

            {/* Summary Sections */}
            <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
              <h3 className="text-[#F5F5F5] mb-3">Détails du projet</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-[#A3A3A3] text-xs">Nom du projet</p>
                  <p className="text-[#F5F5F5]">{formData.projectName || 'Non spécifié'}</p>
                </div>
                <div>
                  <p className="text-[#A3A3A3] text-xs">Description</p>
                  <p className="text-[#D4D4D4] text-sm">{formData.description || 'Non spécifié'}</p>
                </div>
                {formData.deadline && (
                  <div>
                    <p className="text-[#A3A3A3] text-xs">Date limite</p>
                    <p className="text-[#F5F5F5]">{formData.deadline}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#111111] border border-[#404040]">
              <h3 className="text-[#F5F5F5] mb-3">Résumé de la commande</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#A3A3A3]">Package {packageName}</span>
                  <span className="text-[#F5F5F5]">€{price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#404040]/50">
                  <span className="text-[#F5F5F5]">Total</span>
                  <span className="text-[#F59E0B]">€{price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/10 border border-[#6366F1]/30">
              <p className="text-[#D4D4D4] text-sm">
                ⚠️ Le prestataire examinera votre demande et vous répondra dans les{' '}
                <span className="text-[#6366F1]">{deliveryTime}</span>. Le paiement sera effectué après confirmation de
                sa part.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#404040]/50">
        <div className="max-w-[375px] mx-auto flex gap-3">
          {step !== 'details' && (
            <button
              onClick={() => {
                if (step === 'files') setStep('details');
                else if (step === 'review') setStep('files');
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#111111] border border-[#404040] text-[#D4D4D4] hover:bg-[#1A1A1A] transition-colors"
            >
              Retour
            </button>
          )}

          <PrimaryButton
            onClick={step === 'review' ? handleSubmit : handleNext}
            className="flex-1"
            disabled={step === 'details' && !formData.projectName}
          >
            {step === 'review' ? 'Envoyer la demande' : 'Suivant'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
