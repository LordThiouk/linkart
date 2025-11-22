import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadFileArea } from './UploadFileArea';
import { Upload, FileAudio } from 'lucide-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/theme';

const meta: Meta<typeof UploadFileArea> = {
  title: 'Features/Uploads/UploadFileArea',
  component: UploadFileArea,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onPress: { action: 'onPress' },
    onBrowse: { action: 'onBrowse' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof UploadFileArea>;

export const PreviewAudio: Story = {
  args: {
    label: 'Preview Audio (30s max) *',
    title: 'Preview (30s)',
    subtitle: 'MP3 uniquement (Max 5MB)',
    icon: Upload,
    gradientColors: [colors.primary, colors.primaryDark],
    onPress: () => {},
    onBrowse: () => {},
  },
};

export const FullFile: Story = {
  args: {
    label: 'Fichier Complet *',
    title: 'Fichier complet (WAV/MP3/AIFF)',
    subtitle: 'Haute qualité (Max 100MB)',
    icon: FileAudio,
    gradientColors: [colors.primaryDark, colors.accent],
    onPress: () => {},
    onBrowse: () => {},
  },
};

export const Portfolio: Story = {
  args: {
    label: 'Portfolio / Exemples de travaux',
    title: 'Images ou audio',
    subtitle: 'JPG, PNG, MP3 (Max 10MB chacun)',
    icon: Upload,
    gradientColors: [colors.cyan, colors.primaryDark],
    onPress: () => {},
    onBrowse: () => {},
  },
};
