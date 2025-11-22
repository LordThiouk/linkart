import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LoadingDots } from './LoadingDots';

const meta: Meta<typeof LoadingDots> = {
  title: 'features/auth/LoadingDots',
  component: LoadingDots,
};

export default meta;
type Story = StoryObj<typeof LoadingDots>;

export const Default: Story = {};
