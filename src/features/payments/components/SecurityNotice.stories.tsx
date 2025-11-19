import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SecurityNotice } from './SecurityNotice';

const meta: Meta<typeof SecurityNotice> = {
  title: 'Features/Payments/SecurityNotice',
  component: SecurityNotice,
  args: {
    title: 'Paiement 100% sécurisé',
    description:
      'Vos informations bancaires sont chiffrées et sécurisées. Nous ne stockons jamais vos données de paiement.',
  },
};

export default meta;

type Story = StoryObj<typeof SecurityNotice>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    title: 'Transactions protégées',
    description: 'Chaque paiement est vérifié et protégé par Linkart pour éviter toute fraude.',
  },
};
