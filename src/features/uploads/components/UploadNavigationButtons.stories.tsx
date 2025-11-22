import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadNavigationButtons } from './UploadNavigationButtons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof UploadNavigationButtons> = {
  title: 'Features/Uploads/UploadNavigationButtons',
  component: UploadNavigationButtons,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onBack: { action: 'onBack' },
    onNext: { action: 'onNext' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof UploadNavigationButtons>;

export const Default: Story = {
  args: {
    onBack: () => {},
    onNext: () => {},
    nextLabel: 'Suivant',
    disabled: false,
    showBack: true,
  },
};

export const PublishButton: Story = {
  args: {
    onBack: () => {},
    onNext: () => {},
    nextLabel: 'Publier maintenant',
    disabled: false,
    showBack: true,
  },
};

export const Disabled: Story = {
  args: {
    onBack: () => {},
    onNext: () => {},
    nextLabel: 'Suivant',
    disabled: true,
    showBack: true,
  },
};

export const NoBackButton: Story = {
  args: {
    onBack: () => {},
    onNext: () => {},
    nextLabel: 'Continuer',
    disabled: false,
    showBack: false,
  },
};
