import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceDetailsScreenFigma } from './ServiceDetailsScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { theme } from '../../theme';

const meta: Meta<typeof ServiceDetailsScreenFigma> = {
  title: 'Screens/Services/ServiceDetailsScreenFigma',
  component: ServiceDetailsScreenFigma,
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
type Story = StoryObj<typeof ServiceDetailsScreenFigma>;

export const Default: Story = {
  args: {
    serviceId: '1',
    onBack: () => console.log('Back pressed'),
    onContact: () => console.log('Contact pressed'),
    onBook: () => console.log('Book pressed'),
  },
};
