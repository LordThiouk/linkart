import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LicenseContractScreenFigma } from './LicenseContractScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof LicenseContractScreenFigma> = {
  title: 'Screens/Legal/LicenseContractScreenFigma',
  component: LicenseContractScreenFigma,
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
type Story = StoryObj<typeof LicenseContractScreenFigma>;

export const Default: Story = {
  args: {
    purchaseId: 'p1',
    onBack: () => console.log('Back pressed'),
  },
};
