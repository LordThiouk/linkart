import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PricingTypeCard } from './PricingTypeCard';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const meta: Meta<typeof PricingTypeCard> = {
  title: 'Features/Uploads/PricingTypeCard',
  component: PricingTypeCard,
  decorators: [
    Story => (
      <SafeAreaProvider>
        <Story />
      </SafeAreaProvider>
    ),
  ],
  argTypes: {
    onPress: { action: 'onPress' },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof PricingTypeCard>;

export const FixedPrice: Story = {
  args: {
    id: 'fixed',
    label: 'Prix fixe',
    description: 'Un seul prix pour votre service',
    selected: true,
    onPress: () => {},
  },
};

export const OnDemand: Story = {
  args: {
    id: 'on-demand',
    label: 'Sur devis',
    description: 'Négociation selon le projet',
    selected: false,
    onPress: () => {},
  },
};

export const MultiTier: Story = {
  args: {
    id: 'multi-tier',
    label: 'Packages multiples',
    description: 'Basic, Standard, Premium',
    selected: false,
    onPress: () => {},
  },
};
