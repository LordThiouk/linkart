import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LoadingSpinner } from './LoadingSpinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Atoms/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    docs: {
      description: {
        component: 'Composant LoadingSpinner pour afficher un indicateur de chargement.',
      },
    },
  },
  argTypes: {
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

type Story = StoryObj<typeof LoadingSpinner>;

export const Default: Story = {
  args: {
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const WithMessage: Story = {
  args: {
    size: 'medium',
  },
};

export const Colored: Story = {
  args: {
    size: 'medium',
    color: '#1E40AF',
  },
};

export const CustomMessage: Story = {
  args: {
    size: 'medium',
  },
};
