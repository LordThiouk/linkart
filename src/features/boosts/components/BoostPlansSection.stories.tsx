import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { BoostPlansSection } from './BoostPlansSection';

const meta: Meta<typeof BoostPlansSection> = {
  title: 'features/boosts/BoostPlansSection',
  component: BoostPlansSection,
};

export default meta;
type Story = StoryObj<typeof BoostPlansSection>;

const mockPlans = [
  {
    duration: '24h' as const,
    price: 2500,
    views: '500-1000',
    isPopular: false,
  },
  {
    duration: '7j' as const,
    price: 12000,
    views: '5k-10k',
    isPopular: true,
  },
  {
    duration: '30j' as const,
    price: 35000,
    views: '25k-50k',
    isPopular: false,
  },
];

export const Default: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState<'24h' | '7j' | '30j' | null>(null);
    return <BoostPlansSection plans={mockPlans} selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />;
  },
};
