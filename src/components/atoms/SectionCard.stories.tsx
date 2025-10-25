import type { Meta, StoryObj } from '@storybook/react-vite';
import { View, Text } from 'react-native';
import { SectionCard } from './SectionCard';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof SectionCard> = {
  title: 'Atoms/SectionCard',
  component: SectionCard,
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
      options: ['elevated', 'outlined', 'filled'],
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'medium', 'large'],
    },
    marginBottom: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof SectionCard>;

export const Elevated: Story = {
  args: {
    children: <Text>This is an elevated card with shadow.</Text>,
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    children: <Text>This is an outlined card with border.</Text>,
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    children: <Text>This is a filled card with background color.</Text>,
    variant: 'filled',
  },
};

export const SmallPadding: Story = {
  args: {
    children: <Text>Card with small padding.</Text>,
    variant: 'elevated',
    padding: 'small',
  },
};

export const LargePadding: Story = {
  args: {
    children: <Text>Card with large padding.</Text>,
    variant: 'elevated',
    padding: 'large',
  },
};

export const NoPadding: Story = {
  args: {
    children: <Text>Card with no padding.</Text>,
    variant: 'outlined',
    padding: 'none',
  },
};

export const CustomMargin: Story = {
  args: {
    children: <Text>Card with custom margin bottom.</Text>,
    variant: 'elevated',
    marginBottom: 32,
  },
};

export const ComplexContent: Story = {
  args: {
    children: (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Product Title</Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 12 }}>
          This is a more complex card with multiple text elements and styling.
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: '600' }}>Price: 15,000 FCFA</Text>
          <Text style={{ color: theme.colors.primary }}>Available</Text>
        </View>
      </View>
    ),
    variant: 'elevated',
    padding: 'medium',
  },
};
