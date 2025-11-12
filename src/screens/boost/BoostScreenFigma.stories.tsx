import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoostScreenFigma } from './BoostScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BoostScreenFigma> = {
  title: 'Screens/Boost/BoostScreenFigma',
  component: BoostScreenFigma,
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
type Story = StoryObj<typeof BoostScreenFigma>;

export const ProductBoost: Story = {
  args: {
    itemType: 'product',
    itemName: 'Midnight Vibes',
    onBack: () => console.log('Back pressed'),
  },
};

export const ProfileBoost: Story = {
  args: {
    itemType: 'profile',
    itemName: 'DJ Shadow',
    onBack: () => console.log('Back pressed'),
  },
};
