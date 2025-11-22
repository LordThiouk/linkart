import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WelcomeContent } from './WelcomeContent';

const meta: Meta<typeof WelcomeContent> = {
  title: 'features/auth/WelcomeContent',
  component: WelcomeContent,
};

export default meta;
type Story = StoryObj<typeof WelcomeContent>;

export const Default: Story = {
  args: {
    title: 'Bienvenue sur SoundMarket',
    description: 'Votre compte a été créé avec succès. Commencez à explorer la meilleure musique.',
  },
};
