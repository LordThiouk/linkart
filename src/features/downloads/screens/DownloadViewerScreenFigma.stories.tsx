import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadViewerScreenFigma } from './DownloadViewerScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof DownloadViewerScreenFigma> = {
  title: 'Features/Downloads/DownloadViewerScreenFigma',
  component: DownloadViewerScreenFigma,
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
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof DownloadViewerScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => {},
  },
};

export const NoBackButton: Story = {
  args: {},
};
