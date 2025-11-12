import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { BoostCardFigma } from './BoostCardFigma';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof BoostCardFigma> = {
  title: 'Atoms/BoostCardFigma',
  component: BoostCardFigma,
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
    duration: {
      control: { type: 'select' },
      options: ['24h', '7j', '30j'],
    },
    isPopular: {
      control: { type: 'boolean' },
    },
    price: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BoostCardFigma>;

export const TwentyFourHours: Story = {
  args: {
    duration: '24h',
    price: 2000,
    views: '1,500',
    isPopular: false,
    onSelect: () => console.log('24h boost selected'),
  },
};

export const SevenDays: Story = {
  args: {
    duration: '7j',
    price: 5000,
    views: '5,000',
    isPopular: true,
    onSelect: () => console.log('7j boost selected'),
  },
};

export const ThirtyDays: Story = {
  args: {
    duration: '30j',
    price: 15000,
    views: '20,000',
    isPopular: false,
    onSelect: () => console.log('30j boost selected'),
  },
};

export const AllDurations: Story = {
  render: () => (
    <>
      <BoostCardFigma duration="24h" price={2000} views="1,500" isPopular={false} onSelect={() => {}} />
      <BoostCardFigma duration="7j" price={5000} views="5,000" isPopular={true} onSelect={() => {}} />
      <BoostCardFigma duration="30j" price={15000} views="20,000" isPopular={false} onSelect={() => {}} />
    </>
  ),
};
