/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProfileScreenFigma } from './ProfileScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

const meta: Meta<typeof ProfileScreenFigma> = {
  title: 'Screens/ProfileScreenFigma',
  component: ProfileScreenFigma,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
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
