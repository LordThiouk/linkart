import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoostBottomCTA } from './BoostBottomCTA';

const meta: Meta<typeof BoostBottomCTA> = {
  title: 'features/boosts/BoostBottomCTA',
  component: BoostBottomCTA,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BoostBottomCTA>;

export const Default: Story = {
  args: {
    selectedPlan: '7j',
    price: 12000,
    onPurchase: () => console.log('Purchase pressed'),
  },
};

export const Daily: Story = {
  args: {
    selectedPlan: '24h',
    price: 2500,
    onPurchase: () => console.log('Purchase pressed'),
  },
};
