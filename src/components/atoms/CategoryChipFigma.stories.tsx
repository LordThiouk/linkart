import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { CategoryChipFigma } from './CategoryChipFigma';
import { PaperProvider } from 'react-native-paper';
import { Music, TrendingUp, Radio, Heart } from 'lucide-react-native';
import { theme } from '../../theme';

const meta: Meta<typeof CategoryChipFigma> = {
  title: 'Atoms/CategoryChipFigma',
  component: CategoryChipFigma,
  decorators: [
    Story => (
      <PaperProvider theme={theme}>
        <Story />
      </PaperProvider>
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
