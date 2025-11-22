import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FeaturedServicesScreenFigma } from './FeaturedServicesScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof FeaturedServicesScreenFigma> = {
  title: 'features/featured-services/FeaturedServicesScreenFigma',
  component: FeaturedServicesScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeaturedServicesScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => console.log('Back pressed'),
    onServicePress: serviceId => console.log('Service pressed:', serviceId),
  },
};
