import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { SuccessMessage } from './SuccessMessage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof SuccessMessage> = {
  title: 'Features/Payments/SuccessMessage',
  component: SuccessMessage,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SuccessMessage>;

export const Default: Story = {
  args: {},
};

export const CustomTitle: Story = {
  args: {
    title: 'Transaction réussie !',
    subtitle: 'Votre paiement a été traité avec succès',
  },
};

export const CustomDelay: Story = {
  args: {
    delay: 0,
  },
};
