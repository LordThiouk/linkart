import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Composant Avatar pour afficher les photos de profil des utilisateurs.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    uri: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    uri: 'https://via.placeholder.com/100',
    size: 40,
  },
};

export const WithLabel: Story = {
  args: {
    name: 'JD',
    size: 40,
  },
};

export const Small: Story = {
  args: {
    uri: 'https://via.placeholder.com/50',
    size: 24,
  },
};

export const Large: Story = {
  args: {
    uri: 'https://via.placeholder.com/150',
    size: 64,
  },
};

export const NoImage: Story = {
  args: {
    name: 'AB',
    size: 40,
  },
};
