import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PricingTiers } from './PricingTiers';

const meta: Meta<typeof PricingTiers> = {
  title: 'features/services/PricingTiers',
  component: PricingTiers,
};

export default meta;
type Story = StoryObj<typeof PricingTiers>;

const mockTiers = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49.99,
    deliveryTime: '5 jours',
    features: ["Mixage d'une track", '2 révisions incluses', 'Fichier WAV haute qualité', 'Support par email'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 99.99,
    deliveryTime: '3 jours',
    features: [
      'Mixage + Mastering',
      '4 révisions incluses',
      'WAV + MP3 320kbps',
      'Support prioritaire',
      'Stem mastering disponible',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199.99,
    deliveryTime: '2 jours',
    features: [
      'Mixage + Mastering avancé',
      'Révisions illimitées',
      'Tous formats (WAV, MP3, FLAC)',
      'Support 24/7',
      'Consultation téléphonique',
      'Mastering vinyl-ready',
    ],
  },
];

export const Default: Story = {
  args: {
    tiers: mockTiers,
    selectedTierId: 'standard',
    onSelectTier: tierId => console.log('Selected tier:', tierId),
  },
};

export const BasicSelected: Story = {
  args: {
    tiers: mockTiers,
    selectedTierId: 'basic',
    onSelectTier: tierId => console.log('Selected tier:', tierId),
  },
};
