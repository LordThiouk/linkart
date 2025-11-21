import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { FavoritesEmptyState } from './FavoritesEmptyState';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof FavoritesEmptyState> = {
  title: 'Features/Favorites/FavoritesEmptyState',
  component: FavoritesEmptyState,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FavoritesEmptyState>;

export const Default: Story = {};
