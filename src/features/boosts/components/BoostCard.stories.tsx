import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { BoostCard } from './BoostCard';
import { BoostOption } from '../hooks/useBoosts';

const meta: Meta<typeof BoostCard> = {
  title: 'Features/Boosts/BoostCard',
  component: BoostCard,
  decorators: [
    Story => (
      <View style={{ width: 300, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    boostOption: { control: 'object' },
    isSelected: { control: 'boolean' },
    onSelect: { action: 'selected' },
  },
};

export default meta;

type Story = StoryObj<typeof BoostCard>;

const sampleBoost: BoostOption = {
  id: '1',
  name: 'Boost 7 Jours',
  description: 'Mettez votre produit en avant pendant une semaine.',
  price: 5000,
  duration: 7,
  icon: 'rocket-launch',
};

export const Default: Story = {
  args: {
    boostOption: sampleBoost,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    boostOption: sampleBoost,
    isSelected: true,
  },
};
