/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FavoritesScreenFigma } from './FavoritesScreenFigma';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../theme';

const meta: Meta<typeof FavoritesScreenFigma> = {
  title: 'Screens/FavoritesScreenFigma',
  component: FavoritesScreenFigma,
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
    onBack: { action: 'back' },
    onProductClick: { action: 'productClick' },
    accessToken: { control: 'text' },
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
