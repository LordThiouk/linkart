import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { HomeHeader } from './HomeHeader';

const meta: Meta<typeof HomeHeader> = {
  title: 'Features/Home/HomeHeader',
  component: HomeHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HomeHeader>;

export const Default: Story = {
  args: {
    onSearch: () => {},
    onMessages: () => {},
    onNotifications: () => {},
  },
};
