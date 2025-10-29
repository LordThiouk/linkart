import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { MetricItem } from './MetricItem';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof MetricItem> = {
  title: 'Atoms/MetricItem',
  component: MetricItem,
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
    icon: {
      control: { type: 'select' },
      options: ['eye', 'download', 'heart'],
    },
    value: {
      control: { type: 'number' },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    color: {
      control: { type: 'color' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricItem>;

export const Default: Story = {
  args: {
    icon: 'eye',
    value: 1250,
    size: 'sm',
  },
};

export const EyeIcon: Story = {
  args: {
    icon: 'eye',
    value: 1250,
    size: 'sm',
  },
};

export const DownloadIcon: Story = {
  args: {
    icon: 'download',
    value: 42,
    size: 'sm',
  },
};

export const HeartIcon: Story = {
  args: {
    icon: 'heart',
    value: 89,
    size: 'sm',
  },
};

export const LargeValue: Story = {
  args: {
    icon: 'eye',
    value: 1500000,
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    icon: 'heart',
    value: 1250,
    size: 'md',
  },
};

export const CustomColor: Story = {
  args: {
    icon: 'heart',
    value: 89,
    size: 'sm',
    color: '#EC4899',
  },
};

export const StringValue: Story = {
  args: {
    icon: 'download',
    value: 'Custom',
    size: 'sm',
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <MetricItem icon="eye" value={1250} size="sm" />
      <MetricItem icon="download" value={42} size="sm" />
      <MetricItem icon="heart" value={89} size="sm" />
      <MetricItem icon="eye" value={1500000} size="md" />
    </>
  ),
};
