import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadPreviewCard } from './UploadPreviewCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof UploadPreviewCard> = {
  title: 'Features/Uploads/UploadPreviewCard',
  component: UploadPreviewCard,
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
type Story = StoryObj<typeof UploadPreviewCard>;

export const ProductPreview: Story = {
  args: {
    title: 'Afrobeat Summer Vibes',
    uploadType: 'beat',
    description:
      'Production complète avec des influences afrobeat, idéale pour l’été. Utilise des instruments traditionnels et modernes.',
    genres: ['Afrobeat', 'Trap', 'Hip-Hop'],
    isProductType: true,
    bpm: '120',
    musicKey: 'Am',
  },
};

export const ServicePreview: Story = {
  args: {
    title: 'Mixing & Mastering Professionnel',
    uploadType: 'service',
    description:
      'Service professionnel de mixing et mastering pour vos productions. Plus de 10 ans d’expérience dans l’industrie.',
    genres: ['Mixing', 'Mastering'],
    isProductType: false,
    pricingType: 'multi-tier',
    serviceTypes: ['Mixing', 'Mastering', 'Production'],
  },
};
