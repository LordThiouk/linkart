import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FavoritesScreenFigma } from './FavoritesScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof FavoritesScreenFigma> = {
  title: 'Features/Favorites/FavoritesScreenFigma',
  component: FavoritesScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
    onProductClick: { action: 'onProductClick' },
  },
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    accessToken: 'mock-token',
  },
};

export default meta;
type Story = StoryObj<typeof FavoritesScreenFigma>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onProductClick: () => {},
    accessToken: 'mock-token',
  },
};

export const Empty: Story = {
  args: {
    onBack: () => {},
    onProductClick: () => {},
    accessToken: null,
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran favoris vide avec état empty et invitation à ajouter des favoris.',
      },
    },
  },
};

export const WithFavorites: Story = {
  args: {
    onBack: () => {},
    onProductClick: () => {},
    accessToken: 'mock-token',
  },
  parameters: {
    docs: {
      description: {
        story: 'Écran favoris avec grille de beats favoris (2 colonnes).',
      },
    },
  },
};
