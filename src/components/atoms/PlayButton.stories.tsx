/* eslint-disable @typescript-eslint/no-empty-function */
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { PlayButton } from './PlayButton';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof PlayButton> = {
  title: 'Atoms/PlayButton',
  component: PlayButton,
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
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlayButton>;

export const Default: Story = {
  args: {
    isPlaying: false,
    size: 'md',
    onPress: () => console.log('Play button pressed'),
  },
};

export const Playing: Story = {
  args: {
    isPlaying: true,
    size: 'md',
    onPress: () => console.log('Pause button pressed'),
  },
};

export const SmallSize: Story = {
  args: {
    isPlaying: false,
    size: 'sm',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPress: () => {},
  },
};

export const LargeSize: Story = {
  args: {
    isPlaying: false,
    size: 'lg',
    onPress: () => {},
  },
};

export const Disabled: Story = {
  args: {
    isPlaying: false,
    disabled: true,
    size: 'md',
    onPress: () => {},
  },
};

export const NoAnimation: Story = {
  args: {
    isPlaying: false,
    size: 'md',
    onPress: () => {},
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <PlayButton isPlaying={false} size="sm" onPress={() => {}} />
      <PlayButton isPlaying={true} size="md" onPress={() => {}} />
      <PlayButton isPlaying={false} size="lg" onPress={() => {}} />
    </>
  ),
};
