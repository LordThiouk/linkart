import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadOptionCard } from './UploadOptionCard';
import { Music, FileAudio } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/theme';

const meta: Meta<typeof UploadOptionCard> = {
  title: 'Features/Uploads/UploadOptionCard',
  component: UploadOptionCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof UploadOptionCard>;

export const ProductOption: Story = {
  args: {
    title: 'Produit Musical',
    description: 'Beats, Kits, Samples - Commission 5% par vente',
    icon: Music,
    gradientColors: [colors.primary, colors.primaryDark],
    onPress: () => {},
  },
};

export const ServiceOption: Story = {
  args: {
    title: 'Service Professionnel',
    description: 'Mixing, Mastering, Recording - Sans commission',
    icon: FileAudio,
    gradientColors: [colors.cyan, colors.primaryDark],
    badge: 'GRATUIT',
    onPress: () => {},
  },
};
