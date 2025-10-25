import type { Meta, StoryObj } from '@storybook/react-vite';
import { View, Text } from 'react-native';
import { ProductCard } from './ProductCard';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof ProductCard> = {
  title: 'Atoms/ProductCard',
  component: ProductCard,
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

type Story = StoryObj<typeof ProductCard>;

export const Elevated: Story = {
  args: {
    children: <Text>This is an elevated product card.</Text>,
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    children: <Text>This is an outlined product card.</Text>,
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    children: <Text>This is a filled product card.</Text>,
    variant: 'filled',
  },
};

export const SmallPadding: Story = {
  args: {
    children: <Text>Product card with small padding.</Text>,
    variant: 'elevated',
    padding: 'small',
  },
};

export const LargePadding: Story = {
  args: {
    children: <Text>Product card with large padding.</Text>,
    variant: 'elevated',
    padding: 'large',
  },
};

export const ProductContent: Story = {
  args: {
    children: (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Afrobeat Masterpiece</Text>
        <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 12 }}>
          Beat moderne avec influences afro et trap
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.primary }}>15,000 FCFA</Text>
          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant }}>BPM: 140</Text>
        </View>
      </View>
    ),
    variant: 'elevated',
    padding: 'medium',
  },
};
