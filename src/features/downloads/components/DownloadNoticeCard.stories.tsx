import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadNoticeCard } from './DownloadNoticeCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof DownloadNoticeCard> = {
  title: 'Features/Downloads/DownloadNoticeCard',
  component: DownloadNoticeCard,
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
type Story = StoryObj<typeof DownloadNoticeCard>;

export const Default: Story = {
  args: {
    message: 'Téléchargez tous vos fichiers maintenant. Les liens expirent après 30 jours.',
  },
};

export const CustomTitle: Story = {
  args: {
    title: '⚠️ Attention',
    message: 'Ce fichier sera supprimé dans 7 jours.',
    iconColor: '#F59E0B',
  },
};
