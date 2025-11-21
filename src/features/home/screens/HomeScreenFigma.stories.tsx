import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeScreenFigma } from './HomeScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof HomeScreenFigma> = {
  title: 'Features/Home/HomeScreenFigma',
  component: HomeScreenFigma,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HomeScreenFigma>;

export const Default: Story = {
  args: {
    onSearch: () => {},
    onNotifications: () => {},
    onMessages: () => {},
    onProductClick: () => {},
  },
};
