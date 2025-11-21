import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadHeader } from './DownloadHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof DownloadHeader> = {
  title: 'Features/Downloads/DownloadHeader',
  component: DownloadHeader,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DownloadHeader>;

export const Default: Story = {
  args: {
    filesCount: 5,
    onBack: () => {},
  },
};

export const SingleFile: Story = {
  args: {
    filesCount: 1,
    onBack: () => {},
  },
};

export const ManyFiles: Story = {
  args: {
    filesCount: 12,
    onBack: () => {},
  },
};

export const NoBackButton: Story = {
  args: {
    filesCount: 5,
  },
};
