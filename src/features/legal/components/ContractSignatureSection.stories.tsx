import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ContractSignatureSection } from './ContractSignatureSection';

const meta: Meta<typeof ContractSignatureSection> = {
  title: 'features/legal/ContractSignatureSection',
  component: ContractSignatureSection,
};

export default meta;
type Story = StoryObj<typeof ContractSignatureSection>;

export const Default: Story = {
  args: {
    title: 'Signature Numérique Vérifiée',
    date: '01/11/2024 à 14:30',
    legalNotice:
      "Ce contrat est régi par les lois de la République de Côte d'Ivoire. En acceptant cette licence, vous reconnaissez avoir lu et accepté tous les termes ci-dessus. Pour toute question juridique, contactez legal@linkart.com",
  },
};
