import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music2, DollarSign, Users } from 'lucide-react';
import { OnboardingSlide } from './OnboardingSlide';
import { PrimaryButton } from './PrimaryButton';

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'Découvrez la musique',
    description:
      'Explorez des milliers de beats, instrumentaux et sons uniques créés par des artistes talentueux du monde entier.',
    gradient: 'from-[#6366F1] to-[#8B5CF6]',
    icon: <Music2 className="w-16 h-16 text-[#F5F5F5]" />,
  },
  {
    title: 'Vendez vos beats',
    description:
      "Monétisez votre créativité. Publiez vos productions et gagnez de l'argent en vendant vos beats à d'autres artistes.",
    gradient: 'from-[#F59E0B] to-[#EC4899]',
    icon: <DollarSign className="w-16 h-16 text-[#F5F5F5]" />,
  },
  {
    title: 'Connectez avec des artistes',
    description: 'Rejoignez une communauté créative. Collaborez, partagez et créez des connexions authentiques.',
    gradient: 'from-[#8B5CF6] via-[#EC4899] to-[#06B6D4]',
    icon: <Users className="w-16 h-16 text-[#F5F5F5]" />,
  },
];

export function OnboardingCarousel({ onComplete }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <OnboardingSlide {...slides[currentSlide]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className="transition-all"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]' : 'w-2 bg-[#404040]'
                }`}
              />
            </button>
          ))}
        </div>

        <PrimaryButton onClick={onComplete} fullWidth>
          Commencer
        </PrimaryButton>

        {currentSlide > 0 && (
          <button onClick={handlePrevious} className="w-full text-[#A3A3A3] hover:text-[#D4D4D4] transition-colors">
            Retour
          </button>
        )}
      </div>
    </div>
  );
}
