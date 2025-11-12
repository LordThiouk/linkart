import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { PlaylistCard } from './PlaylistCard';
import { View } from 'react-native';
import React from 'react';
import { colors } from '../../theme';

const meta: Meta<typeof PlaylistCard> = {
  title: 'Molecules/PlaylistCard',
  component: PlaylistCard,
  decorators: [
    Story => (
      <View style={{ padding: 20, backgroundColor: colors.background }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    id: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    typebeat: { control: 'text' },
    ambiance: { control: 'text' },
    beatCount: { control: 'number' },
    duration: { control: 'text' },
    coverImage: { control: 'text' },
    isPlaying: { control: 'boolean' },
    onPress: { action: 'pressed' },
    onPlay: { action: 'played' },
  },
  args: {
    id: 'playlist-123',
    title: 'Trap Hits 2025',
    description: "Les meilleurs trap beats de l'année",
    typebeat: 'Trap',
    ambiance: 'Énergique',
    beatCount: 15,
    duration: '45:30',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    isPlaying: false,
  },
};

export default meta;

type Story = StoryObj<typeof PlaylistCard>;

export const Default: Story = {
  args: {},
};

export const Playing: Story = {
  args: {
    isPlaying: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    description: undefined,
  },
};

export const WithoutCoverImage: Story = {
  args: {
    coverImage: undefined,
  },
};

export const WithoutDuration: Story = {
  args: {
    duration: undefined,
  },
};

export const SingleBeat: Story = {
  args: {
    beatCount: 1,
    title: 'Single Beat Playlist',
  },
};

export const ManyBeats: Story = {
  args: {
    beatCount: 50,
    title: 'Massive Beat Collection',
    duration: '2:15:30',
  },
};

export const OnlyTypebeat: Story = {
  args: {
    typebeat: 'Hip-Hop',
    ambiance: undefined,
  },
};

export const OnlyAmbiance: Story = {
  args: {
    typebeat: undefined,
    ambiance: 'Mélancolique',
  },
};

export const WithoutMetadata: Story = {
  args: {
    typebeat: undefined,
    ambiance: undefined,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Very Long Playlist Title That Should Be Truncated After Two Lines',
  },
};

export const LongDescription: Story = {
  args: {
    description:
      'Very long description that should be truncated after two lines to maintain consistent card height and visual consistency across all playlist cards.',
  },
};

export const HipHopPlaylist: Story = {
  args: {
    title: 'Hip-Hop Classics',
    description: "Les classiques du hip-hop qui ont marqué l'histoire",
    typebeat: 'Hip-Hop',
    ambiance: 'Nostalgique',
    beatCount: 20,
    duration: '1:20:45',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop',
  },
};

export const ElectronicPlaylist: Story = {
  args: {
    title: 'Electronic Vibes',
    description: 'Ambiance électronique pour vos sessions créatives',
    typebeat: 'Electronic',
    ambiance: 'Futuriste',
    beatCount: 12,
    duration: '38:15',
    coverImage: 'https://images.unsplash.com/photo-1571266028243-ece68fdb9d2a?w=400&h=300&fit=crop',
  },
};

export const AfrobeatPlaylist: Story = {
  args: {
    title: 'Afrobeat Essentials',
    description: "Les essentiels de l'afrobeat moderne",
    typebeat: 'Afrobeat',
    ambiance: 'Chaleureux',
    beatCount: 18,
    duration: '52:30',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
  },
};

export const RnbPlaylist: Story = {
  args: {
    title: 'R&B Soul',
    description: 'R&B et soul pour vos moments intimes',
    typebeat: 'R&B',
    ambiance: 'Sensuel',
    beatCount: 14,
    duration: '41:20',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
  },
};

export const MultiplePlaylists: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <PlaylistCard
        id="playlist-1"
        title="Trap Hits 2025"
        description="Les meilleurs trap beats de l'année"
        typebeat="Trap"
        ambiance="Énergique"
        beatCount={15}
        duration="45:30"
        coverImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
        isPlaying={false}
        onPress={() => {}}
        onPlay={() => {}}
      />
      <PlaylistCard
        id="playlist-2"
        title="Hip-Hop Classics"
        description="Les classiques du hip-hop"
        typebeat="Hip-Hop"
        ambiance="Nostalgique"
        beatCount={20}
        duration="1:20:45"
        coverImage="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop"
        isPlaying={true}
        onPress={() => {}}
        onPlay={() => {}}
      />
      <PlaylistCard
        id="playlist-3"
        title="Electronic Vibes"
        description="Ambiance électronique"
        typebeat="Electronic"
        ambiance="Futuriste"
        beatCount={12}
        duration="38:15"
        coverImage="https://images.unsplash.com/photo-1571266028243-ece68fdb9d2a?w=400&h=300&fit=crop"
        isPlaying={false}
        onPress={() => {}}
        onPlay={() => {}}
      />
    </View>
  ),
};
