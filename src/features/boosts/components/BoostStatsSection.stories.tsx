import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BoostStatsSection } from './BoostStatsSection';

const meta: Meta<typeof BoostStatsSection> = {
  title: 'features/boosts/BoostStatsSection',
  component: BoostStatsSection,
};

export default meta;
type Story = StoryObj<typeof BoostStatsSection>;

const mockStats = [
  { label: 'Vues', value: '+350%', icon: '👁️' },
  { label: 'Clics', value: '+240%', icon: '🎯' },
  { label: 'Ventes', value: '+180%', icon: '💰' },
];

export const Default: Story = {
  args: {
    title: 'Résultats attendus',
    stats: mockStats,
  },
};
