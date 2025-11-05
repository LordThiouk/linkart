import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadScreenFigma } from './UploadScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof UploadScreenFigma> = {
  title: 'Screens/Upload/UploadScreenFigma',
  component: UploadScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Story />
        </PaperProvider>
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
