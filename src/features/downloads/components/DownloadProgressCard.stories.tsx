import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadProgressCard } from './DownloadProgressCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof DownloadProgressCard> = {
  title: 'Features/Downloads/DownloadProgressCard',
  component: DownloadProgressCard,
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
type Story = StoryObj<typeof DownloadProgressCard>;

export const Default: Story = {
  args: {
    downloadedCount: 2,
    totalCount: 5,
  },
};

export const HalfProgress: Story = {
  args: {
    downloadedCount: 3,
    totalCount: 6,
  },
};

export const AlmostComplete: Story = {
  args: {
    downloadedCount: 4,
    totalCount: 5,
  },
};

export const Complete: Story = {
  args: {
    downloadedCount: 5,
    totalCount: 5,
  },
};

export const Empty: Story = {
  args: {
    downloadedCount: 0,
    totalCount: 5,
  },
};
