import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BottomNavigationFigma } from './BottomNavigationFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof BottomNavigationFigma> = {
  title: 'Organisms/BottomNavigationFigma',
  component: BottomNavigationFigma,
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
  argTypes: {
    activeTab: {
      control: { type: 'select' },
      options: ['home', 'marketplace', 'upload', 'wallet', 'profile'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavigationFigma>;

export const Home: Story = {
  args: {
    activeTab: 'home',
    onTabChange: tab => console.log('Tab changed to:', tab),
  },
};

export const Marketplace: Story = {
  args: {
    activeTab: 'marketplace',
    onTabChange: tab => console.log('Tab changed to:', tab),
  },
};

export const Upload: Story = {
  args: {
    activeTab: 'upload',
    onTabChange: tab => console.log('Tab changed to:', tab),
  },
};

export const Wallet: Story = {
  args: {
    activeTab: 'wallet',
    onTabChange: tab => console.log('Tab changed to:', tab),
  },
};

export const Profile: Story = {
  args: {
    activeTab: 'profile',
    onTabChange: tab => console.log('Tab changed to:', tab),
  },
};
