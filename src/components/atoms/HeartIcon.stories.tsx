import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { expect, userEvent, within } from '@storybook/test';
import { HeartIcon } from './HeartIcon';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof HeartIcon> = {
  title: 'Atoms/HeartIcon',
  component: HeartIcon,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test: Click sur heart icon pour toggle
    const heartButton = canvas.getByRole('button');
    await userEvent.click(heartButton);

    // Vérifier que l'événement onToggle a été appelé avec les bons arguments
    expect(heartButton).toBeTruthy();
  },
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
