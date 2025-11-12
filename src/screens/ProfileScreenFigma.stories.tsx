/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProfileScreenFigma } from './ProfileScreenFigma';

const meta: Meta<typeof ProfileScreenFigma> = {
  title: 'Screens/ProfileScreenFigma',
  component: ProfileScreenFigma,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onMyPurchases: { action: 'myPurchases' },
    onBoost: { action: 'boost' },
    onFavorites: { action: 'favorites' },
    onBookings: { action: 'bookings' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileScreenFigma>;

export const Default: Story = {
  args: {
    onMyPurchases: () => {},
    onBoost: () => {},
    onFavorites: () => {},
    onBookings: () => {},
  },
};

export const BeatsTab: Story = {
  args: {
    onMyPurchases: () => {},
    onBoost: () => {},
    onFavorites: () => {},
    onBookings: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Profil avec onglet beats, statistiques et actions rapides.',
      },
    },
  },
};

export const StatsTab: Story = {
  args: {
    onMyPurchases: () => {},
    onBoost: () => {},
    onFavorites: () => {},
    onBookings: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Profil avec onglet stats et performances mensuelles.',
      },
    },
  },
};
