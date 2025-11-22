import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { LoginScreenFigma } from './LoginScreenFigma';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof LoginScreenFigma> = {
  title: 'features/auth/LoginScreenFigma',
  component: LoginScreenFigma,
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
};

export default meta;
type Story = StoryObj<typeof LoginScreenFigma>;

export const Default: Story = {
  args: {
    onSubmit: contact => console.log('Submit:', contact),
    onBack: () => console.log('Back pressed'),
  },
};
