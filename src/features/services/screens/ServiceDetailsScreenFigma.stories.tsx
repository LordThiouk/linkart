import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceDetailsScreenFigma } from './ServiceDetailsScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof ServiceDetailsScreenFigma> = {
  title: 'features/services/ServiceDetailsScreenFigma',
  component: ServiceDetailsScreenFigma,
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
type Story = StoryObj<typeof ServiceDetailsScreenFigma>;

export const Default: Story = {
  args: {
    serviceId: '1',
    onBack: () => console.log('Back pressed'),
    onContact: () => console.log('Contact pressed'),
    onBook: () => console.log('Book pressed'),
    onShare: () => console.log('Share pressed'),
    onSeeAllReviews: () => console.log('See all reviews pressed'),
  },
};
