import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoostSelector } from './BoostSelector';

const meta: Meta<typeof BoostSelector> = {
  title: 'Features/Boosts/BoostSelector',
  component: BoostSelector,
  parameters: {
    docs: {
      description: {
        component: 'Sélecteur de boost avec options et prix.',
      },
    },
  },
  argTypes: {
    productId: {
      control: { type: 'text' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    onBoostSelected: {
      action: 'onBoostSelected',
    },
    onPurchase: {
      action: 'onPurchase',
    },
  },
};

export default meta;

type Story = StoryObj<typeof BoostSelector>;

export const Default: Story = {
  args: {
    productId: 'product-123',
    loading: false,
    onBoostSelected: boost => console.log('Boost selected:', boost),
    onPurchase: boost => console.log('Purchase boost:', boost),
  },
};

export const Loading: Story = {
  args: {
    productId: 'product-123',
    loading: true,
    onBoostSelected: boost => console.log('Boost selected:', boost),
    onPurchase: boost => console.log('Purchase boost:', boost),
  },
};

export const ProfileBoost: Story = {
  args: {
    productId: undefined,
    loading: false,
    onBoostSelected: boost => console.log('Boost selected:', boost),
    onPurchase: boost => console.log('Purchase boost:', boost),
  },
};
