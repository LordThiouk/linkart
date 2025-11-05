import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { DownloadViewerScreenFigma } from './DownloadViewerScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof DownloadViewerScreenFigma> = {
  title: 'Screens/Downloads/DownloadViewerScreenFigma',
  component: DownloadViewerScreenFigma,
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
type Story = StoryObj<typeof DownloadViewerScreenFigma>;

export const Default: Story = {
  args: {
    purchaseId: 'p1',
    onBack: () => console.log('Back pressed'),
  },
};
