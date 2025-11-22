import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadScreenFigma } from './UploadScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof UploadScreenFigma> = {
  title: 'Features/Uploads/UploadScreenFigma',
  component: UploadScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof UploadScreenFigma>;

export const Default: Story = {
  args: {},
};
