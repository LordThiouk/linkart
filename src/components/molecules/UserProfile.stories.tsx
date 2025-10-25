import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserProfile } from './UserProfile';

const meta: Meta<typeof UserProfile> = {
  title: 'Molecules/UserProfile',
  component: UserProfile,
  parameters: {
    docs: {
      description: {
        component: 'Mini profil utilisateur avec avatar, nom et rating.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    avatarUri: {
      control: { type: 'text' },
    },
    rating: {
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
    },
    isVerified: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  args: {
    name: 'Beatmaker Pro',
    avatarUri: 'https://via.placeholder.com/100',
    rating: 4.5,
    isVerified: true,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    name: 'DJ Sen',
    avatarUri: 'https://via.placeholder.com/50',
    rating: 3.8,
    isVerified: false,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    name: 'Studio Master',
    avatarUri: 'https://via.placeholder.com/150',
    rating: 5.0,
    isVerified: true,
    size: 'large',
  },
};

export const NoAvatar: Story = {
  args: {
    name: 'Anonyme',
    rating: 2.5,
    isVerified: false,
    size: 'medium',
  },
};

export const HighRating: Story = {
  args: {
    name: 'Top Producer',
    avatarUri: 'https://via.placeholder.com/100',
    rating: 4.9,
    isVerified: true,
    size: 'medium',
  },
};

export const NewUser: Story = {
  args: {
    name: 'Nouveau Créateur',
    avatarUri: 'https://via.placeholder.com/100',
    rating: 0,
    isVerified: false,
    size: 'medium',
  },
};

export const Unverified: Story = {
  args: {
    name: 'Créateur Non Vérifié',
    avatarUri: 'https://via.placeholder.com/100',
    rating: 3.2,
    isVerified: false,
    size: 'medium',
  },
};
