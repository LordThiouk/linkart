import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { ProfileStat, ProfileStatsGrid } from './ProfileStatsGrid';
import { TrendingUp, Music, Star, Award } from 'lucide-react-native';
import { colors } from '@/theme';

const stats = [
  { icon: TrendingUp, label: 'Vues totales', value: '12.4K', colors: [colors.primary, colors.primaryDark] },
  { icon: Music, label: 'Beats publiés', value: '24', colors: [colors.accent, colors.secondary] },
  { icon: Star, label: 'Note moyenne', value: '4.8', colors: [colors.secondary, colors.accent] },
  { icon: Award, label: 'Ventes', value: '47', colors: [colors.cyan, colors.primaryDark] },
];

const meta: Meta<typeof ProfileStatsGrid> = {
  title: 'Features/Profile/ProfileStatsGrid',
  component: ProfileStatsGrid,
  decorators: [
    Story => (
      <View style={{ padding: 16, backgroundColor: '#0A0A0A', minHeight: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileStatsGrid>;

export const Default: Story = {
  args: {
    stats: stats as ProfileStat[],
  },
};

export const TwoStats: Story = {
  args: {
    stats: stats.slice(0, 2) as ProfileStat[],
  },
};
