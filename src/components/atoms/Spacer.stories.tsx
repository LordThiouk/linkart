import type { Meta, StoryObj } from '@storybook/react-vite';
import { View } from 'react-native';
import { Spacer } from './Spacer';
import { Text } from './Text';

const meta: Meta<typeof Spacer> = {
  title: 'Atoms/Spacer',
  component: Spacer,
  decorators: [
    Story => (
      <View style={{ padding: 20, borderWidth: 1, borderColor: 'grey' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'number', min: 4, max: 128, step: 4 },
    },
    horizontal: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Spacer>;

export const Vertical: Story = {
  render: args => (
    <>
      <Text>Premier élément</Text>
      <Spacer {...args} />
      <Text>Deuxième élément</Text>
    </>
  ),
  args: {
    size: 20,
    horizontal: false,
  },
};

export const Horizontal: Story = {
  render: args => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text>Premier</Text>
      <Spacer {...args} />
      <Text>Deuxième</Text>
    </View>
  ),
  args: {
    size: 20,
    horizontal: true,
  },
};
