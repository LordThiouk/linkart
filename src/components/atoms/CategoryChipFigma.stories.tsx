import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { CategoryChipFigma } from './CategoryChipFigma';
import { Music, TrendingUp, Radio, Heart } from 'lucide-react-native';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof CategoryChipFigma> = {
  title: 'Atoms/CategoryChipFigma',
  component: CategoryChipFigma,
  decorators: [
    Story => (
      <View style={{ flex: 1, padding: spacing.lg, backgroundColor: colors.background }}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selected: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryChipFigma>;

export const Default: Story = {
  args: {
    label: 'Trap',
    selected: false,
    onPress: () => console.log('Chip pressed'),
  },
};

export const Selected: Story = {
  args: {
    label: 'Trap',
    selected: true,
    onPress: () => console.log('Chip pressed'),
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Explore',
    icon: Music,
    selected: false,
    onPress: () => console.log('Chip pressed'),
  },
};

export const SelectedWithIcon: Story = {
  args: {
    label: 'Explore',
    icon: Music,
    selected: true,
    onPress: () => console.log('Chip pressed'),
  },
};

export const AllCategories: Story = {
  render: () => (
    <>
      <CategoryChipFigma label="Trap" icon={Music} selected={false} />
      <CategoryChipFigma label="Trending" icon={TrendingUp} selected={true} />
      <CategoryChipFigma label="Radio" icon={Radio} selected={false} />
      <CategoryChipFigma label="Favorites" icon={Heart} selected={false} />
    </>
  ),
};
