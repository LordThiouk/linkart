import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ContractTermsSection } from './ContractTermsSection';

const meta: Meta<typeof ContractTermsSection> = {
  title: 'features/legal/ContractTermsSection',
  component: ContractTermsSection,
};

export default meta;
type Story = StoryObj<typeof ContractTermsSection>;

const mockTerms = [
  "Droit d'utilisation pour distribution jusqu'à 10 000 streams",
  'Crédit artistique optionnel',
  'Usage commercial autorisé',
  'Pas de revente du beat en tant que tel',
  'Fichiers MP3, WAV et Stems inclus',
  'Support technique pendant 30 jours',
];

export const Default: Story = {
  args: {
    title: "Conditions d'Utilisation",
    terms: mockTerms,
  },
};
