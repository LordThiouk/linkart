import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  decorators: [
    Story => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          flexWrap: 'wrap' as const,
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['home', 'camera', 'heart', 'star', 'music'],
    },
    size: {
      control: { type: 'number' },
    },
    color: {
      control: { type: 'color' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'home',
    size: 24,
  },
};

export const Colored: Story = {
  args: {
    ...Default.args,
    // La couleur est maintenant héritée du thème via le provider global
    // On peut la surcharger ici si besoin pour le test,
    // mais on retire la valeur codée en dur.
  },
};

export const CustomSize: Story = {
  args: {
    ...Default.args,
    size: 48,
  },
};

export const AllIcons: Story = {
  render: () => (
    <>
      <Icon name="home" size={24} />
      <Icon name="camera" size={24} />
      <Icon name="heart" size={24} />
      <Icon name="star" size={24} />
      <Icon name="music" size={24} />
    </>
  ),
};
