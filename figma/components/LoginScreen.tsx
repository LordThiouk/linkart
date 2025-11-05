import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Music, Mail, Phone } from 'lucide-react';
import { InputField } from './InputField';
import { PrimaryButton } from './PrimaryButton';

interface LoginScreenProps {
  onSubmit: (contact: string) => void;
}

export function LoginScreen({ onSubmit }: LoginScreenProps) {
  const [contact, setContact] = useState('');
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contact.trim()) {
      setError('Ce champ est requis');
      return;
    }

    if (contactType === 'email' && !contact.includes('@')) {
      setError('Email invalide');
      return;
    }

    if (contactType === 'phone' && contact.replace(/\D/g, '').length < 10) {
      setError('Numéro de téléphone invalide');
      return;
    }

    onSubmit(contact);
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] p-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-center mb-12 mt-8"
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-xl shadow-[#6366F1]/30">
          <Music className="w-8 h-8 text-[#F5F5F5]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-[#F5F5F5]">Bienvenue</h1>
          <p className="text-[#A3A3A3]">Connectez-vous pour continuer</p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111111] rounded-2xl p-6 mb-6"
        >
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setContactType('phone')}
              className={`
                flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2
                transition-all
                ${
                  contactType === 'phone'
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                    : 'bg-[#1A1A1A] text-[#A3A3A3] hover:bg-[#252525]'
                }
              `}
            >
              <Phone className="w-4 h-4" />
              Téléphone
            </button>
            <button
              onClick={() => setContactType('email')}
              className={`
                flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2
                transition-all
                ${
                  contactType === 'email'
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-[#F5F5F5]'
                    : 'bg-[#1A1A1A] text-[#A3A3A3] hover:bg-[#252525]'
                }
              `}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              type={contactType === 'phone' ? 'tel' : 'email'}
              placeholder={contactType === 'phone' ? '+33 6 12 34 56 78' : 'votreemail@exemple.com'}
              value={contact}
              onChange={e => setContact(e.target.value)}
              error={error}
              autoFocus
            />

            <PrimaryButton type="submit" fullWidth>
              Recevoir le code OTP
            </PrimaryButton>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button className="text-[#A3A3A3] hover:text-[#D4D4D4] transition-colors">
            Se connecter avec un autre numéro
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-[#A3A3A3] mt-8"
      >
        En continuant, vous acceptez nos{' '}
        <button className="text-[#6366F1] hover:underline">Conditions d'utilisation</button>
      </motion.div>
    </div>
  );
}
