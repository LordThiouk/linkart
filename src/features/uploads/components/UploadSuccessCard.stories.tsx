import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { UploadSuccessCard } from './UploadSuccessCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof UploadSuccessCard> = {
  title: 'Features/Uploads/UploadSuccessCard',
  component: UploadSuccessCard,
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
type Story = StoryObj<typeof UploadSuccessCard>;

export const ProductSuccess: Story = {
  args: {
    isProductType: true,
  },
};

export const ServiceSuccess: Story = {
  args: {
    isProductType: false,
  },
};
