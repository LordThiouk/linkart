import type { Meta, StoryObj } from '@storybook/react-vite';
import { View, Text } from 'react-native';
import { StatCard } from './StatCard';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof StatCard> = {
  title: 'Atoms/StatCard',
  component: StatCard,
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
    flex: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof StatCard>;

export const Elevated: Story = {
  args: {
    children: <Text>This is an elevated stat card.</Text>,
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    children: <Text>This is an outlined stat card.</Text>,
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    children: <Text>This is a filled stat card.</Text>,
    variant: 'filled',
  },
};

export const StatContent: Story = {
  args: {
    children: (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.primary }}>1,250</Text>
        <Text style={{ fontSize: 14, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Ventes totales</Text>
      </View>
    ),
    variant: 'elevated',
    padding: 'medium',
  },
};

export const MultipleStats: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <StatCard variant="elevated" flex={1}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.primary }}>45</Text>
          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Produits</Text>
        </View>
      </StatCard>
      <StatCard variant="elevated" flex={1}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: (theme.colors as any).success || '#22C55E' }}>
            1.2K
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Vues</Text>
        </View>
      </StatCard>
      <StatCard variant="elevated" flex={1}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.secondary }}>4.8</Text>
          <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>Note</Text>
        </View>
      </StatCard>
    </View>
  ),
};
