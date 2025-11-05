import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { BeatCardFigma, BeatCardFigmaProps } from './BeatCardFigma';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../../theme';

const meta: Meta<typeof BeatCardFigma> = {
  title: 'Atoms/BeatCardFigma',
  component: BeatCardFigma,
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
    isPlaying: {
      control: { type: 'boolean' },
    },
    isLiked: {
      control: { type: 'boolean' },
    },
    bpm: {
      control: { type: 'number' },
    },
    price: {
      control: { type: 'number' },
    },
    likes: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BeatCardFigma>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Dark Trap Beat',
    artist: 'Producer Name',
    artistImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    price: 25.99,
    bpm: 140,
    genre: 'Trap',
    likes: 245,
    isPlaying: false,
    isLiked: false,
    onPlay: () => console.log('Play pressed'),
    onPress: () => console.log('Card pressed'),
    onToggleLike: () => console.log('Like toggled'),
  },
};

export const Playing: Story = {
  args: {
    ...Default.args,
    isPlaying: true,
  },
};

export const Liked: Story = {
  args: {
    ...Default.args,
    isLiked: true,
  },
};

export const PlayingAndLiked: Story = {
  args: {
    ...Default.args,
    isPlaying: true,
    isLiked: true,
  },
};

export const HighLikes: Story = {
  args: {
    ...Default.args,
    likes: 12500,
    isLiked: true,
  },
};

export const WithoutArtistImage: Story = {
  args: {
    ...Default.args,
    artistImage: undefined,
  },
};

export const DifferentGenres: Story = {
  render: () => {
    const defaultArgs = Default.args as unknown;
    return (
      <>
        <BeatCardFigma
          {...(defaultArgs as BeatCardFigmaProps)}
          id="1"
          genre="Trap"
          title="Dark Trap Beat"
          bpm={140}
          coverImage={(defaultArgs as BeatCardFigmaProps).coverImage}
          price={(defaultArgs as BeatCardFigmaProps).price}
        />
        <BeatCardFigma
          likes={0}
          id="2"
          genre="Afrobeat"
          title="Afrobeat Fusion"
          bpm={120}
          coverImage={(defaultArgs as BeatCardFigmaProps).coverImage}
          price={(defaultArgs as BeatCardFigmaProps).price}
        />
        <BeatCardFigma
          likes={0}
          id="3"
          genre="Hip-Hop"
          title="Hip-Hop Classic"
          bpm={90}
          coverImage={(defaultArgs as BeatCardFigmaProps).coverImage}
          price={(defaultArgs as BeatCardFigmaProps).price}
        />
      </>
    );
  },
};
