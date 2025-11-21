import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { InfoBanner } from './InfoBanner';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof InfoBanner> = {
  title: 'Features/Uploads/InfoBanner',
  component: InfoBanner,
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
type Story = StoryObj<typeof InfoBanner>;

export const Default: Story = {
  args: {
    message: '💰 Commission plateforme: 5%\nVous recevrez 95% du prix de vente après chaque transaction',
  },
};

export const ServiceFree: Story = {
  args: {
    message:
      '✨ Services 100% GRATUITS\nAucune commission sur les réservations. Le paiement se fait directement entre vous et le client.',
    gradientColors: ['rgba(34, 197, 94, 0.1)', 'rgba(6, 182, 212, 0.1)'],
  },
};

export const ValidationNotice: Story = {
  args: {
    message:
      "⚠️ Votre produit sera examiné par notre équipe avant d'être visible sur le marketplace. Vous recevrez une notification dès validation.",
    gradientColors: ['rgba(245, 158, 11, 0.1)', 'rgba(236, 72, 153, 0.1)'],
  },
};
