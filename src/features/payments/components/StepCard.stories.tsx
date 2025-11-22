import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { StepCard } from './StepCard';
import { FileText, Download, CheckCircle } from 'lucide-react-native';
import { colors } from '@/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof StepCard> = {
  title: 'Features/Payments/StepCard',
  component: StepCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StepCard>;

export const ContractStep: Story = {
  args: {
    icon: FileText,
    title: 'Contrat de licence disponible',
    description: 'Téléchargez votre contrat PDF depuis "Mes Achats"',
    gradientColors: [colors.primary, colors.primaryDark],
  },
};

export const DownloadStep: Story = {
  args: {
    icon: Download,
    title: 'Fichiers prêts au téléchargement',
    description: 'Téléchargez vos fichiers audio haute qualité',
    gradientColors: [colors.success, colors.successDark],
  },
};

export const SuccessStep: Story = {
  args: {
    icon: CheckCircle,
    title: 'Paiement confirmé',
    description: 'Votre transaction a été validée avec succès',
    gradientColors: [colors.success, colors.successDark],
  },
};
