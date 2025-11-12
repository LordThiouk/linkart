import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OnboardingCarouselFigma } from './OnboardingCarouselFigma';

const meta: Meta<typeof OnboardingCarouselFigma> = {
  title: 'Molecules/OnboardingCarouselFigma',
  component: OnboardingCarouselFigma,
  decorators: [Story => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingCarouselFigma>;

export const Default: Story = {
  args: {
    onComplete: () => console.log('Onboarding completed'),
  },
};
