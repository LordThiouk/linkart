import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProfileSetupScreenFigma } from './ProfileSetupScreenFigma';

const meta: Meta<typeof ProfileSetupScreenFigma> = {
  title: 'Screens/Auth/ProfileSetupScreenFigma',
  component: ProfileSetupScreenFigma,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSetupScreenFigma>;

export const Default: Story = {
  args: {
    onComplete: () => console.log('Profile setup completed'),
    onSkip: () => console.log('Profile setup skipped'),
  },
};
