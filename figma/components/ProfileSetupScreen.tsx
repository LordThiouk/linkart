import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, ShoppingBag, Headphones, Users } from 'lucide-react';
import { InputField } from './InputField';
import { RoleCard } from './RoleCard';
import { PrimaryButton } from './PrimaryButton';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileSetupScreenProps {
  onComplete: () => void;
  onSkip: () => void;
}

type Role = 'buyer' | 'seller' | 'both' | null;

export function ProfileSetupScreen({ onComplete, onSkip }: ProfileSetupScreenProps) {
  const [artistName, setArtistName] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (artistName && selectedRole) {
      onComplete();
    }
  };

  const roles = [
    {
      id: 'buyer' as Role,
      icon: Headphones,
      title: 'Acheteur',
      description: 'Je cherche des beats et des sons pour mes projets',
    },
    {
      id: 'seller' as Role,
      icon: ShoppingBag,
      title: 'Vendeur',
      description: 'Je veux vendre mes productions et beats',
    },
    {
      id: 'both' as Role,
      icon: Users,
      title: 'Les deux',
      description: "J'achète et je vends de la musique",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] overflow-y-auto">
      <div className="p-8 space-y-8">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
          <h1 className="mb-2 text-[#F5F5F5]">Configurez votre profil</h1>
          <p className="text-[#A3A3A3]">Personnalisez votre expérience</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="relative">
            <input type="file" id="profile-image" accept="image/*" onChange={handleImageUpload} className="hidden" />
            <label htmlFor="profile-image" className="cursor-pointer block">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#1A1A1A] border-2 border-[#404040] hover:border-[#6366F1] transition-colors flex items-center justify-center">
                {profileImage ? (
                  <ImageWithFallback src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="w-8 h-8 text-[#A3A3A3]" />
                )}
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg">
                <Upload className="w-4 h-4 text-[#F5F5F5]" />
              </div>
            </label>
          </div>
          <p className="text-[#A3A3A3]">Ajouter une photo de profil</p>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <InputField
            label="Nom d'artiste"
            placeholder="Entrez votre nom d'artiste"
            value={artistName}
            onChange={e => setArtistName(e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <label className="block text-[#D4D4D4]">Votre rôle</label>
          <div className="space-y-3">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <RoleCard
                  icon={role.icon}
                  title={role.title}
                  description={role.description}
                  selected={selectedRole === role.id}
                  onClick={() => setSelectedRole(role.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 pt-4"
        >
          <PrimaryButton onClick={handleContinue} fullWidth disabled={!artistName || !selectedRole}>
            Continuer
          </PrimaryButton>

          <button onClick={onSkip} className="w-full text-[#A3A3A3] hover:text-[#D4D4D4] transition-colors">
            Passer pour l'instant
          </button>
        </motion.div>
      </div>
    </div>
  );
}
