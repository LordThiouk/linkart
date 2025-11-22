import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { WelcomeFeaturesGrid } from './WelcomeFeaturesGrid';
import { Music, TrendingUp, Radio, Heart } from 'lucide-react-native';
import { colors } from '@/theme';

const meta: Meta<typeof WelcomeFeaturesGrid> = {
  title: 'features/auth/WelcomeFeaturesGrid',
  component: WelcomeFeaturesGrid,
};

export default meta;
type Story = StoryObj<typeof WelcomeFeaturesGrid>;

const mockFeatures = [
  { icon: Music, label: 'Explore', gradient: [colors.primary, colors.primaryDark] as [string, string] },
  { icon: TrendingUp, label: 'Trending', gradient: [colors.secondary, colors.accent] as [string, string] },
  { icon: Radio, label: 'Radio', gradient: [colors.primaryDark, colors.accent] as [string, string] },
  { icon: Heart, label: 'Favorites', gradient: [colors.accent, colors.cyan] as [string, string] },
];

export const Default: Story = {
  args: {
    features: mockFeatures,
    onFeaturePress: feature => console.log('Feature pressed:', feature.label),
  },
};
