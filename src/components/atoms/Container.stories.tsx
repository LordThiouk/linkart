import type { Meta, StoryObj } from '@storybook/react-vite';
import { View, Text } from 'react-native';
import { Container } from './Container';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <Story />
        </View>
      </PaperProvider>
    ),
  ],
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large', 'xl'],
    },
    backgroundColor: { control: 'color' },
    flex: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: <Text>Default container with medium padding</Text>,
  },
};

export const NoPadding: Story = {
  args: {
    children: <Text>Container with no padding</Text>,
    padding: 'none',
  },
};

export const SmallPadding: Story = {
  args: {
    children: <Text>Container with small padding</Text>,
    padding: 'small',
  },
};

export const LargePadding: Story = {
  args: {
    children: <Text>Container with large padding</Text>,
    padding: 'large',
  },
};

export const XLPadding: Story = {
  args: {
    children: <Text>Container with extra large padding</Text>,
    padding: 'xl',
  },
};

export const CustomBackground: Story = {
  args: {
    children: <Text style={{ color: 'white' }}>Container with custom background</Text>,
    backgroundColor: theme.colors.primary,
  },
};

export const NestedContent: Story = {
  args: {
    children: (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Nested Content</Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 12 }}>
          This container has nested content with proper spacing.
        </Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 1, height: 40, backgroundColor: theme.colors.primary, borderRadius: 8 }} />
          <View style={{ flex: 1, height: 40, backgroundColor: theme.colors.secondary, borderRadius: 8 }} />
        </View>
      </View>
    ),
    padding: 'large',
  },
};
