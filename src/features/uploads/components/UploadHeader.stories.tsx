import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadHeader } from './UploadHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof UploadHeader> = {
  title: 'Features/Uploads/UploadHeader',
  component: UploadHeader,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof UploadHeader>;

export const SelectStep: Story = {
  args: {
    currentStep: 'select',
  },
};

export const TypeStep: Story = {
  args: {
    currentStep: 'type',
  },
};

export const DetailsStep: Story = {
  args: {
    currentStep: 'details',
  },
};

export const PricingStep: Story = {
  args: {
    currentStep: 'pricing',
  },
};

export const PreviewStep: Story = {
  args: {
    currentStep: 'preview',
  },
};

export const SuccessStep: Story = {
  args: {
    currentStep: 'success',
  },
};
