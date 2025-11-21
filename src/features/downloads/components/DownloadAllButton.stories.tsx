import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadAllButton } from './DownloadAllButton';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof DownloadAllButton> = {
  title: 'Features/Downloads/DownloadAllButton',
  component: DownloadAllButton,
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
type Story = StoryObj<typeof DownloadAllButton>;

export const Default: Story = {
  args: {
    onPress: () => {},
    disabled: false,
    downloading: false,
  },
};

export const Downloading: Story = {
  args: {
    onPress: () => {},
    disabled: false,
    downloading: true,
  },
};

export const Disabled: Story = {
  args: {
    onPress: () => {},
    disabled: true,
    downloading: false,
  },
};
