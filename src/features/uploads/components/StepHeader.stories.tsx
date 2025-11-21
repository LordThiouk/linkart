import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StepHeader } from './StepHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof StepHeader> = {
  title: 'Features/Uploads/StepHeader',
  component: StepHeader,
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
type Story = StoryObj<typeof StepHeader>;

export const Default: Story = {
  args: {
    title: 'Que souhaitez-vous publier ?',
    subtitle: 'Choisissez entre produits (beats/kits) ou services professionnels',
  },
};

export const TypeStep: Story = {
  args: {
    title: 'Type de produit',
    subtitle: 'Sélectionnez le type de contenu musical',
  },
};

export const DetailsStep: Story = {
  args: {
    title: 'Détails du produit',
    subtitle: 'Remplissez les informations de votre production',
  },
};
