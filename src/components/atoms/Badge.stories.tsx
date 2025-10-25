import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Badge } from './Badge';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: theme.colors.background,
          }}
        >
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    visible: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'New',
    variant: 'default',
  },
};

export const Success: Story = {
  args: {
    children: 'Active',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

export const Small: Story = {
  args: {
    children: 'S',
    size: 'small',
    variant: 'default',
  },
};

export const Medium: Story = {
  args: {
    children: 'M',
    size: 'medium',
    variant: 'success',
  },
};

export const Large: Story = {
  args: {
    children: 'L',
    size: 'large',
    variant: 'warning',
  },
};

export const Hidden: Story = {
  args: {
    children: 'Hidden',
    visible: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </View>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
      <Badge size="small" variant="success">
        S
      </Badge>
      <Badge size="medium" variant="warning">
        M
      </Badge>
      <Badge size="large" variant="error">
        L
      </Badge>
    </View>
  ),
};
