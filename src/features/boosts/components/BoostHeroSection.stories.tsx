import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoostHeroSection } from './BoostHeroSection';

const meta: Meta<typeof BoostHeroSection> = {
  title: 'features/boosts/BoostHeroSection',
  component: BoostHeroSection,
};

export default meta;
type Story = StoryObj<typeof BoostHeroSection>;

const mockBenefits = [
  'Mise en avant dans les résultats',
  'Badge "Boosté" sur votre contenu',
  'Statistiques détaillées en temps réel',
  'Ciblage géographique automatique',
];

export const Default: Story = {
  args: {
    title: 'Augmentez votre visibilité',
    subtitle: 'Apparaissez en tête des résultats de recherche et attirez plus de clients',
    benefits: mockBenefits,
  },
};
