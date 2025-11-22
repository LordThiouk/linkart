import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ContractDetailsCard } from './ContractDetailsCard';
import { FileText } from 'lucide-react-native';
import { colors } from '@/theme';

const meta: Meta<typeof ContractDetailsCard> = {
  title: 'features/legal/ContractDetailsCard',
  component: ContractDetailsCard,
};

export default meta;
type Story = StoryObj<typeof ContractDetailsCard>;

export const Product: Story = {
  args: {
    type: 'product',
    title: 'Produit',
    icon: <FileText size={20} color={colors.primary} />,
    rows: [
      { label: 'Titre', value: 'Midnight Vibes' },
      { label: 'Type', value: 'Beat Instrumental' },
      { label: 'Licence', value: '', badge: 'Premium License' },
    ],
  },
};

export const Parties: Story = {
  args: {
    type: 'parties',
    title: 'Parties',
    parties: [
      {
        title: '👤 Acheteur (Licencié)',
        name: 'Jean Kouassi',
        details: ['jean.kouassi@email.com', '+225 07 XX XX XX XX'],
      },
      {
        title: '🎵 Vendeur (Licenciant)',
        titleColor: colors.accent,
        name: 'DJ Shadow Productions',
        details: ['DJ Shadow', 'djshadow@linkart.com'],
      },
    ],
  },
};

export const Transaction: Story = {
  args: {
    type: 'transaction',
    title: 'Détails de la Transaction',
    rows: [
      { label: "Date d'achat", value: '01/11/2024' },
      { label: 'Montant payé', value: '49 000 F CFA', isPrice: true },
      { label: 'Méthode de paiement', value: 'Wallet Linkart' },
    ],
  },
};
