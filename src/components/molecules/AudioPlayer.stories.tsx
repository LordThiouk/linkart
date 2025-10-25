import type { Meta, StoryObj } from '@storybook/react-vite';
import { AudioPlayer } from './AudioPlayer';

const meta: Meta<typeof AudioPlayer> = {
  title: 'Molecules/AudioPlayer',
  component: AudioPlayer,
  parameters: {
    docs: {
      description: {
        component: 'Lecteur audio pour les previews de 30 secondes maximum.',
      },
    },
  },
  argTypes: {
    uri: {
      control: { type: 'text' },
    },
    duration: {
      control: { type: 'number' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
  args: {
    uri: 'https://example.com/audio.mp3',
    duration: 30,
  },
};

export const ShortPreview: Story = {
  args: {
    uri: 'https://example.com/short-preview.mp3',
    duration: 15,
  },
};

export const LongPreview: Story = {
  args: {
    uri: 'https://example.com/long-preview.mp3',
    duration: 30,
  },
};
