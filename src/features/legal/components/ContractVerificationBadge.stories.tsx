import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ContractVerificationBadge } from './ContractVerificationBadge';

const meta: Meta<typeof ContractVerificationBadge> = {
  title: 'features/legal/ContractVerificationBadge',
  component: ContractVerificationBadge,
};

export default meta;
type Story = StoryObj<typeof ContractVerificationBadge>;

export const Default: Story = {
  args: {
    title: '✓ Contrat Vérifié',
    subtitle: 'Document légal certifié par Linkart',
  },
};
