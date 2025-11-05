import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield } from 'lucide-react';
import { OTPField } from './OTPField';
import { PrimaryButton } from './PrimaryButton';

interface OTPVerificationScreenProps {
  contact: string;
  onVerify: () => void;
  onBack: () => void;
}

export function OTPVerificationScreen({ contact, onVerify, onBack }: OTPVerificationScreenProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError(true);
      // Simulate vibration feedback
      if (window.navigator.vibrate) {
        window.navigator.vibrate(200);
      }
      setTimeout(() => setError(false), 500);
      return;
    }

    // Simulate verification
    onVerify();
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(30);
      setCanResend(false);
      setOtp('');
      setError(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A] p-8">
      <motion.button
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={onBack}
        className="self-start mb-8 text-[#A3A3A3] hover:text-[#D4D4D4] transition-colors"
      >
        ← Retour
      </motion.button>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-center mb-12"
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] shadow-xl shadow-[#EC4899]/30">
          <Shield className="w-8 h-8 text-[#F5F5F5]" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1"
      >
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-[#F5F5F5]">Entrez le code</h1>
          <p className="text-[#A3A3A3]">
            Code envoyé à <span className="text-[#D4D4D4]">{contact}</span>
          </p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <OTPField value={otp} onChange={setOtp} error={error} />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#EF4444] text-center"
            >
              Code invalide. Veuillez réessayer.
            </motion.p>
          )}

          <PrimaryButton onClick={handleVerify} fullWidth disabled={otp.length !== 6}>
            Vérifier
          </PrimaryButton>

          <div className="text-center">
            {canResend ? (
              <button onClick={handleResend} className="text-[#6366F1] hover:text-[#8B5CF6] transition-colors">
                Renvoyer le code
              </button>
            ) : (
              <p className="text-[#A3A3A3]">Renvoyer le code dans {resendTimer}s</p>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-[#A3A3A3] space-y-2"
      >
        <p>Vous n'avez pas reçu le code ?</p>
        <button onClick={onBack} className="text-[#6366F1] hover:underline">
          Changer le numéro
        </button>
      </motion.div>
    </div>
  );
}
