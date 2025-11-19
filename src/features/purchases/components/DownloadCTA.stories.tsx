import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadCTA } from './DownloadCTA';

const meta: Meta<typeof DownloadCTA> = {
  title: 'Features/Purchases/DownloadCTA',
  component: DownloadCTA,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onPress: { action: 'onPress' },
  },
};

export default meta;
type Story = StoryObj<typeof DownloadCTA>;

export const NotDownloaded: Story = {
  args: {
    downloaded: false,
    // Actions handled by argTypes
  },
};

export const Downloaded: Story = {
  args: {
    downloaded: true,
    // Actions handled by argTypes
  },
};
