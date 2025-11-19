import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PurchaseHeader } from './PurchaseHeader';

const meta: Meta<typeof PurchaseHeader> = {
  title: 'Features/Purchases/PurchaseHeader',
  component: PurchaseHeader,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onBack: { action: 'onBack' },
  },
};

export default meta;
type Story = StoryObj<typeof PurchaseHeader>;

export const Default: Story = {
  args: {
    // Actions handled by argTypes
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: '3 produits achetés',
    // Actions handled by argTypes
  },
};

export const NoBack: Story = {
  args: {
    subtitle: '3 produits achetés',
  },
};
