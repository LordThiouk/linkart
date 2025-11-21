import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FileCard } from './FileCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof FileCard> = {
  title: 'Features/Downloads/FileCard',
  component: FileCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onDownload: { action: 'onDownload' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof FileCard>;

export const AudioFile: Story = {
  args: {
    file: {
      id: 'f1',
      name: 'Midnight_Vibes_MP3.mp3',
      size: '8.5 MB',
      type: 'audio',
      format: 'MP3',
    },
    isDownloaded: false,
    isDownloading: false,
    onDownload: () => {},
  },
};

export const ArchiveFile: Story = {
  args: {
    file: {
      id: 'f2',
      name: 'Midnight_Vibes_Stems.zip',
      size: '156.8 MB',
      type: 'archive',
      format: 'ZIP',
    },
    isDownloaded: false,
    isDownloading: false,
    onDownload: () => {},
  },
};

export const DocumentFile: Story = {
  args: {
    file: {
      id: 'f3',
      name: 'License_Contract.pdf',
      size: '125 KB',
      type: 'document',
      format: 'PDF',
    },
    isDownloaded: false,
    isDownloading: false,
    onDownload: () => {},
  },
};

export const Downloading: Story = {
  args: {
    file: {
      id: 'f1',
      name: 'Midnight_Vibes_MP3.mp3',
      size: '8.5 MB',
      type: 'audio',
      format: 'MP3',
    },
    isDownloaded: false,
    isDownloading: true,
    onDownload: () => {},
  },
};

export const Downloaded: Story = {
  args: {
    file: {
      id: 'f1',
      name: 'Midnight_Vibes_MP3.mp3',
      size: '8.5 MB',
      type: 'audio',
      format: 'MP3',
    },
    isDownloaded: true,
    isDownloading: false,
    onDownload: () => {},
  },
};
