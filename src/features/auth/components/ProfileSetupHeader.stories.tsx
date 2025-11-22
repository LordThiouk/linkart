import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProfileSetupHeader } from './ProfileSetupHeader';

const meta: Meta<typeof ProfileSetupHeader> = {
  title: 'features/auth/ProfileSetupHeader',
  component: ProfileSetupHeader,
};

export default meta;
type Story = StoryObj<typeof ProfileSetupHeader>;

export const Default: Story = {
  args: {
    title: 'Configurez votre profil',
    subtitle: 'Personnalisez votre expérience',
  },
};
