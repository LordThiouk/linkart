import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Bouton personnalisé avec variants et tailles.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Bouton par défaut',
    variant: 'primary',
    onPress: () => console.log('Pressed'),
  },
};

export const Outlined: Story = {
  args: {
    children: 'Bouton outlined',
    variant: 'outline',
    onPress: () => console.log('Pressed'),
  },
};

export const Ghost: Story = {
  args: {
    children: 'Bouton ghost',
    variant: 'ghost',
    onPress: () => console.log('Pressed'),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Bouton désactivé',
    variant: 'primary',
    disabled: true,
    onPress: () => console.log('Pressed'),
  },
};

export const Loading: Story = {
  args: {
    children: 'Bouton en chargement',
    variant: 'primary',
    loading: true,
    onPress: () => console.log('Pressed'),
  },
};

export const Small: Story = {
  args: {
    children: 'Petit bouton',
    variant: 'primary',
    size: 'small',
    onPress: () => console.log('Pressed'),
  },
};

export const Large: Story = {
  args: {
    children: 'Grand bouton',
    variant: 'primary',
    size: 'large',
    onPress: () => console.log('Pressed'),
  },
};
