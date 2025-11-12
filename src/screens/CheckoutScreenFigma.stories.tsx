/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CheckoutScreenFigma } from './CheckoutScreenFigma';

const meta: Meta<typeof CheckoutScreenFigma> = {
  title: 'Screens/CheckoutScreenFigma',
  component: CheckoutScreenFigma,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onBack: { action: 'back' },
    onProceedToPayment: { action: 'proceedToPayment' },
    productId: { control: 'text' },
    productTitle: { control: 'text' },
    productType: {
      control: 'select',
      options: ['beat', 'kit', 'sample'],
    },
    artistName: { control: 'text' },
    coverImage: { control: 'text' },
  },
  args: {
    productId: '1',
    productTitle: 'Midnight Vibes',
    productType: 'beat',
    artistName: 'DJ Shadow',
    coverImage: 'https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?w=400',
    selectedLicense: {
      name: 'Premium',
      price: 49000,
      features: ['MP3 & WAV & Stems', '10000 streams', 'Crédit optionnel'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onProceedToPayment: () => {},
  },
};

export const WithPromo: Story = {
  args: {
    onBack: () => {},
    onProceedToPayment: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran de checkout avec code promo, résumé prix et bouton de paiement.',
      },
    },
  },
};
