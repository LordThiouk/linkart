import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoostScreenFigma } from './BoostScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BoostScreenFigma> = {
  title: 'features/boosts/BoostScreenFigma',
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

export const Product: Story = {
  args: {
    itemType: 'product',
    itemName: 'Dark Trap Energy',
    onBack: () => console.log('Back pressed'),
  },
};

export const Profile: Story = {
  args: {
    itemType: 'profile',
    itemName: 'BeatKing',
    onBack: () => console.log('Back pressed'),
  },
};
