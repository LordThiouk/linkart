import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FavoritesHeader } from './FavoritesHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof FavoritesHeader> = {
  title: 'Features/Favorites/FavoritesHeader',
  component: FavoritesHeader,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof FavoritesHeader>;

export const Default: Story = {
  args: {
    favoritesCount: 5,
    onBack: () => {},
  },
};

export const SingleFavorite: Story = {
  args: {
    favoritesCount: 1,
    onBack: () => {},
  },
};

export const ManyFavorites: Story = {
  args: {
    favoritesCount: 42,
    onBack: () => {},
  },
};

export const NoFavorites: Story = {
  args: {
    favoritesCount: 0,
    onBack: () => {},
  },
};
