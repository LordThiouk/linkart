/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeScreenFigma } from './HomeScreenFigma';

const meta: Meta<typeof HomeScreenFigma> = {
  title: 'Screens/HomeScreenFigma',
  component: HomeScreenFigma,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onSearch: { action: 'search' },
    onNotifications: { action: 'notifications' },
    onProductClick: { action: 'productClick' },
    onMessages: { action: 'messages' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSearch: () => {},
    onNotifications: () => {},
    onProductClick: () => {},
    onMessages: () => {},
  },
};

export const WithContent: Story = {
  args: {
    onSearch: () => {},
    onNotifications: () => {},
    onProductClick: () => {},
    onMessages: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: "Écran d'accueil avec hero banner, playlists, produits et services.",
      },
    },
  },
};
