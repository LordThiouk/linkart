import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PaymentHeader } from './PaymentHeader';

const meta: Meta<typeof PaymentHeader> = {
  title: 'Features/Payments/PaymentHeader',
  component: PaymentHeader,
  args: {
    title: 'Paiement sécurisé',
    subtitle: 'Choisissez votre méthode de paiement',
  },
  argTypes: {
    onBack: { action: 'onBack' },
  },
};

export default meta;

type Story = StoryObj<typeof PaymentHeader>;

export const Default: Story = {};

export const WithoutBack: Story = {
  args: {
    onBack: undefined,
  },
};

export const DisabledBack: Story = {
  args: {
    disabled: true,
  },
};
