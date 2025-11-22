import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BeatDetailsScreenFigma } from './BeatDetailsScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BeatDetailsScreenFigma> = {
  title: 'Features/Products/BeatDetailsScreenFigma',
  component: BeatDetailsScreenFigma,
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
type Story = StoryObj<typeof BeatDetailsScreenFigma>;

export const Default: Story = {
  args: {
    beatId: '1',
    onBack: () => console.log('Back pressed'),
    onBuyClick: () => console.log('Buy clicked'),
    hasPurchased: false,
  },
};

export const Purchased: Story = {
  args: {
    beatId: '1',
    onBack: () => console.log('Back pressed'),
    onBuyClick: () => console.log('Buy clicked'),
    hasPurchased: true,
  },
};
