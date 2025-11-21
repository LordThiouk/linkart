import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LicenseCard } from './LicenseCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof LicenseCard> = {
  title: 'Features/Uploads/LicenseCard',
  component: LicenseCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof LicenseCard>;

export const BasicLicense: Story = {
  args: {
    licenseType: 'basic',
    name: 'Basic',
    features: ['MP3 téléchargement', '2000 streams', 'Crédit obligatoire'],
    suggestedPrice: 19.99,
    license: { price: '19.99', enabled: true },
    onPriceChange: () => {},
  },
};

export const PremiumLicense: Story = {
  args: {
    licenseType: 'premium',
    name: 'Premium',
    features: ['WAV + MP3', '10000 streams', 'Crédit optionnel'],
    suggestedPrice: 49.99,
    license: { price: '49.99', enabled: true },
    onPriceChange: () => {},
  },
};

export const ExclusiveLicense: Story = {
  args: {
    licenseType: 'exclusive',
    name: 'Exclusive',
    features: ['Tous fichiers + Stems', 'Streams illimités', 'Droits exclusifs'],
    suggestedPrice: 299.99,
    license: { price: '299.99', enabled: true },
    onPriceChange: () => {},
  },
};
