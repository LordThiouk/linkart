import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { OTPBackButton } from './OTPBackButton';

const meta: Meta<typeof OTPBackButton> = {
  title: 'features/auth/OTPBackButton',
  component: OTPBackButton,
};

export default meta;
type Story = StoryObj<typeof OTPBackButton>;

export const Default: Story = {
  args: {
    onPress: () => console.log('Back pressed'),
    label: 'Retour',
  },
};
