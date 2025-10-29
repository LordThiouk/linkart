import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ServiceUploadForm } from './ServiceUploadForm';

const meta: Meta<typeof ServiceUploadForm> = {
  title: 'Features/Services/ServiceUploadForm',
  component: ServiceUploadForm,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const FixedPricing: Story = {
  args: {
    loading: false,
  },
};

export const OnDemandPricing: Story = {
  args: {
    loading: false,
  },
};

export const TieredPricing: Story = {
  args: {
    loading: false,
  },
};
