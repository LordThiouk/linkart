import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PriceDisplay } from './PriceDisplay';

const meta: Meta<typeof PriceDisplay> = {
  title: 'Molecules/PriceDisplay',
  component: PriceDisplay,
  parameters: {
    docs: {
      description: {
        component: 'Composant pour afficher les prix avec devise et formatage.',
      },
    },
  },
  argTypes: {
    amount: {
      control: { type: 'number' },
    },
    currency: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'color' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PriceDisplay>;

export const Default: Story = {
  args: {
    amount: 15000,
    currency: 'FCFA',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    amount: 5000,
    currency: 'FCFA',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    amount: 50000,
    currency: 'FCFA',
    size: 'large',
  },
};

export const HighPrice: Story = {
  args: {
    amount: 150000,
    currency: 'FCFA',
    size: 'medium',
  },
};

export const LowPrice: Story = {
  args: {
    amount: 1000,
    currency: 'FCFA',
    size: 'medium',
  },
};

export const Colored: Story = {
  args: {
    amount: 25000,
    currency: 'FCFA',
    size: 'medium',
    color: '#10B981',
  },
};

export const DifferentCurrency: Story = {
  args: {
    amount: 25,
    currency: 'USD',
    size: 'medium',
  },
};

export const Free: Story = {
  args: {
    amount: 0,
    currency: 'FCFA',
    size: 'medium',
  },
};
