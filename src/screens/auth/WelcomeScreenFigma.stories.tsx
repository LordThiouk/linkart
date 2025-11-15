import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WelcomeScreenFigma } from './WelcomeScreenFigma';

const meta: Meta<typeof WelcomeScreenFigma> = {
  title: 'Screens/Auth/WelcomeScreenFigma',
  component: WelcomeScreenFigma,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeScreenFigma>;

export const Default: Story = {
  args: {
    onStart: () => console.log('Start exploration pressed'),
  },
};
