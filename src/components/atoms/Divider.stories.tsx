import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  decorators: [
    Story => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    style: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
};

export const WithCustomStyle: Story = {
  args: {
    style: {
      backgroundColor: 'red',
      height: 2,
    },
  },
};
