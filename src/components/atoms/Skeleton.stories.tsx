/**
 * Skeleton Stories
 * Version: 2.0 - Design System
 */

import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Dimensions } from 'react-native';
import Skeleton from './Skeleton';
import { colors, spacing } from '../../theme';

const screenWidth = Dimensions.get('window').width;

const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  decorators: [
    Story => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: 20,
          backgroundColor: colors.background,
        }}
      >
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Story />
        </View>
      </View>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Circle: Story = {
  args: {
    width: 40,
    height: 40,
    variant: 'circle',
  },
};

export const Text: Story = {
  args: {
    width: 200,
    height: 16,
    variant: 'text',
  },
};

export const Card: Story = {
  args: { width: 0, height: 0 },
  render: () => (
    <View style={{ gap: spacing.md, width: '100%' }}>
      <Skeleton width={screenWidth - spacing.lg * 2} height={200} />
      <Skeleton width={(screenWidth - spacing.lg * 2) * 0.8} height={24} />
      <Skeleton width={(screenWidth - spacing.lg * 2) * 0.6} height={16} variant="text" />
    </View>
  ),
};

export const Profile: Story = {
  args: { width: 0, height: 0 },
  render: () => (
    <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
      <Skeleton width={56} height={56} variant="circle" />
      <View style={{ flex: 1, gap: spacing.sm }}>
        <Skeleton width={(screenWidth - spacing.lg * 2) * 0.7} height={20} variant="text" />
        <Skeleton width={(screenWidth - spacing.lg * 2) * 0.5} height={16} variant="text" />
      </View>
    </View>
  ),
};

export const List: Story = {
  args: { width: 0, height: 0 },
  render: () => (
    <View style={{ gap: spacing.lg }}>
      {[1, 2, 3].map(i => (
        <View key={i} style={{ flexDirection: 'row', gap: spacing.md }}>
          <Skeleton width={40} height={40} variant="circle" />
          <View style={{ flex: 1, gap: spacing.xs }}>
            <Skeleton width={(screenWidth - spacing.lg * 2) * 0.8} height={16} />
            <Skeleton width={(screenWidth - spacing.lg * 2) * 0.6} height={12} />
          </View>
        </View>
      ))}
    </View>
  ),
};
