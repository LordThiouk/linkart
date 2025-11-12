import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View } from 'react-native';
import { HeartIcon } from './HeartIcon';
import { colors, spacing } from '../../theme';

const meta: Meta<typeof HeartIcon> = {
  title: 'Atoms/HeartIcon',
  component: HeartIcon,
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
    showAnimation: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeartIcon>;

export const Default: Story = {
  args: {
    productId: '123',
    size: 'md',
    disabled: false,
    showAnimation: true,
  },
  // Note: Tests interactifs (@storybook/test) non disponibles dans Storybook 9.x
  // Pour tester l'interaction, utilisez @testing-library/react dans vos tests unitaires
};

export const SmallSize: Story = {
  args: {
    productId: '123',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    productId: '123',
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    productId: '123',
    disabled: true,
    size: 'md',
  },
};

export const NoAnimation: Story = {
  args: {
    productId: '123',
    showAnimation: false,
    size: 'md',
  },
};

export const AllSizes: Story = {
  render: () => (
    <>
      <HeartIcon productId="1" size="sm" />
      <HeartIcon productId="2" size="md" />
      <HeartIcon productId="3" size="lg" />
    </>
  ),
};
