import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { ProductMetrics } from './ProductMetrics';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof ProductMetrics> = {
  title: 'Molecules/ProductMetrics',
  component: ProductMetrics,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductMetrics>;

export const Default: Story = {
  args: {
    viewCount: 1250,
    downloadCount: 42,
    likeCount: 89,
    size: 'sm',
    layout: 'horizontal',
  },
};

export const SmallValues: Story = {
  args: {
    viewCount: 42,
    downloadCount: 8,
    likeCount: 15,
    size: 'sm',
    layout: 'horizontal',
  },
};

export const LargeValues: Story = {
  args: {
    viewCount: 1500000,
    downloadCount: 2500000,
    likeCount: 5000000,
    size: 'sm',
    layout: 'horizontal',
  },
};

export const MediumSize: Story = {
  args: {
    viewCount: 1250,
    downloadCount: 42,
    likeCount: 89,
    size: 'md',
    layout: 'horizontal',
  },
};

export const VerticalLayout: Story = {
  args: {
    viewCount: 1250,
    downloadCount: 42,
    likeCount: 89,
    size: 'sm',
    layout: 'vertical',
  },
};

export const ZeroValues: Story = {
  args: {
    viewCount: 0,
    downloadCount: 0,
    likeCount: 0,
    size: 'sm',
    layout: 'horizontal',
  },
};

export const MixedValues: Story = {
  args: {
    viewCount: 999,
    downloadCount: 1000,
    likeCount: 1000000,
    size: 'sm',
    layout: 'horizontal',
  },
};

export const AllLayouts: Story = {
  render: () => (
    <>
      <ProductMetrics viewCount={1250} downloadCount={42} likeCount={89} size="sm" layout="horizontal" />
      <ProductMetrics viewCount={1250} downloadCount={42} likeCount={89} size="sm" layout="vertical" />
    </>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <>
      <ProductMetrics viewCount={1250} downloadCount={42} likeCount={89} size="sm" layout="horizontal" />
      <ProductMetrics viewCount={1250} downloadCount={42} likeCount={89} size="md" layout="horizontal" />
    </>
  ),
};
