import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { useState } from 'react';
import { PlaylistPlayer } from './PlaylistPlayer';

const meta: Meta<typeof PlaylistPlayer> = {
  title: 'features/playlists/PlaylistPlayer',
  component: PlaylistPlayer,
};

export default meta;
type Story = StoryObj<typeof PlaylistPlayer>;

export const Default: Story = {
  render: () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffled, setIsShuffled] = useState(false);
    const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');

    return (
      <PlaylistPlayer
        currentBeat={{
          id: '1',
          title: 'Midnight Vibes',
          artist: 'DJ Shadow',
          coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200',
        }}
        isPlaying={isPlaying}
        progress={0.35}
        duration="3:24"
        currentTime="1:12"
        isShuffled={isShuffled}
        repeatMode={repeatMode}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => console.log('Next')}
        onPrevious={() => console.log('Previous')}
        onShuffle={() => setIsShuffled(!isShuffled)}
        onRepeat={() => {
          if (repeatMode === 'off') setRepeatMode('all');
          else if (repeatMode === 'all') setRepeatMode('one');
          else setRepeatMode('off');
        }}
      />
    );
  },
};

export const Playing: Story = {
  args: {
    currentBeat: {
      id: '1',
      title: 'Dark Trap Energy',
      artist: 'BeatKing',
    },
    isPlaying: true,
    progress: 0.65,
    duration: '2:45',
    currentTime: '1:48',
    isShuffled: true,
    repeatMode: 'all',
    onPlayPause: () => console.log('Play/Pause'),
    onNext: () => console.log('Next'),
    onPrevious: () => console.log('Previous'),
    onShuffle: () => console.log('Shuffle'),
    onRepeat: () => console.log('Repeat'),
  },
};
