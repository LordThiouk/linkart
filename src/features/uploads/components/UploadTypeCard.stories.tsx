import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadTypeCard } from './UploadTypeCard';
import { Music, Package, Briefcase } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof UploadTypeCard> = {
  title: 'Features/Uploads/UploadTypeCard',
  component: UploadTypeCard,
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
type Story = StoryObj<typeof UploadTypeCard>;

export const BeatType: Story = {
  args: {
    label: 'Beat / Instrumental',
    description: 'Production complète prête à utiliser',
    icon: Music,
    onPress: () => {},
  },
};

export const KitType: Story = {
  args: {
    label: 'Kit de Sons',
    description: 'Collection de samples et loops',
    icon: Package,
    onPress: () => {},
  },
};

export const SampleType: Story = {
  args: {
    label: 'Sample Pack',
    description: 'Samples individuels ou packs',
    icon: Briefcase,
    onPress: () => {},
  },
};
